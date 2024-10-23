// auth.service.ts
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/di/types'; // Assuming the path to your TYPES file
import { JWTService } from '@infrastructure/auth/jwt/jwt-service';
import { IHashService } from '@domain/interfaces/infrastructure/services/hash/hash-service.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { User } from '@domain/entities/user/user-entity';
import { IUserProps } from '@domain/entities/user/user-props';
import { UserRole } from '@domain/entities/user/user-role';

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.JWTService) private jwtService: JWTService,
    @inject(TYPES.HashService) private hashService: IHashService,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  // Login method
  async authenticate(
    email: string,
    password: string
  ): Promise<{ token: string; refreshToken: string } | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return null;

    const passwordValid = await this.hashService.compare(
      password,
      user.props.password
    );
    if (!passwordValid) return null;

    // Generate tokens
    const token = this.jwtService.sign({ id: user.id, role: user.role });
    const refreshToken = this.jwtService.signRefreshToken({ id: user.id });

    return { token, refreshToken };
  }

  // Refresh token method
  async refreshToken(token: string): Promise<string | boolean | null> {
    try {
      const payload = this.jwtService.verifyRefreshToken(token);

      // Generate new access token
      const newToken = this.jwtService.sign({
        id: payload.id,
        role: payload.role,
      });

      return newToken;
    } catch (error) {
      console.log(error);
      return false; // Invalid or expired refresh token
    }
  }

  // Register method in AuthService
  async registerUser({
    username,
    email,
    password,
    phoneNumber,
  }: {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
  }): Promise<{ token: string; refreshToken: string }> {
    // Check if user already exists by email or username
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Continue registration logic
    const hashedPassword = await this.hashService.hash(password);
    const userProps: IUserProps = {
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      isDeleted: false,
      createdAt: new Date(),
      emailVerified: false,
      role: new UserRole(UserRole.USER),
    };

    const user = User.create(userProps).getValue();
    await this.userRepository.createUser(user);

    const token = this.jwtService.sign({
      id: user.id,
      role: user.props.role.getValue(),
    });
    const refreshToken = this.jwtService.signRefreshToken({ id: user.id });

    return { token, refreshToken };
  }
}
