// AuthService class
import { User } from '@domain/entities/user/user-entity';
import { IUserProps } from '@domain/entities/user/user-props';
import UserRole from '@domain/entities/user/user-role';
import { IHashService } from '@domain/interfaces/infrastructure/services/hash/hash-service.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { JWTService } from '@infrastructure/auth/jwt/jwt-service';
import { TYPES } from '@infrastructure/di/types';
import { injectable, inject } from 'inversify';

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
  ): Promise<{
    token: string;
    refreshToken: string;
    user: { id: string; email: string; role: string };
  } | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return null;

    const passwordValid = await this.hashService.compare(
      password,
      user.props.password
    );
    if (!passwordValid) return null;

    // Generate tokens
    const token = this.jwtService.sign({
      id: user.id.toString(),
      role: user.props.role.getValue(),
    });
    const refreshToken = this.jwtService.signRefreshToken({
      id: user.id.toString(),
    });

    // Return token, refreshToken, and user info
    return {
      token,
      refreshToken,
      user: {
        id: user.id.toString(), // Convert UniqueEntityID to string
        email: user.props.email,
        role: user.props.role.getValue(),
      },
    };
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
  }): Promise<{
    token: string;
    refreshToken: string;
    user: { id: string; email: string; role: string };
  }> {
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
      id: user.id.toString(), // Convert UniqueEntityID to string
      role: user.props.role.getValue(),
    });
    const refreshToken = this.jwtService.signRefreshToken({
      id: user.id.toString(),
    }); // Convert UniqueEntityID to string

    // Return token, refreshToken, and user info
    return {
      token,
      refreshToken,
      user: {
        id: user.id.toString(), // Convert UniqueEntityID to string
        email: user.props.email,
        role: user.props.role.getValue(),
      },
    };
  }

  // Refresh token method in AuthService
  async refreshToken(refreshToken: string): Promise<{
    token: string;
    refreshToken: string;
    user: { id: string; email: string; role: string };
  } | null> {
    try {
      // Verify the refresh token
      const payload = this.jwtService.verifyRefreshToken(refreshToken);

      // Check if payload is null (invalid or expired token)
      if (!payload) {
        console.error('Invalid or expired refresh token');
        return null;
      }

      // Fetch user based on the ID in the refresh token payload
      const user = await this.userRepository.findById(payload.id);

      if (!user) {
        return null;
      }

      // Generate a new access token and refresh token
      const newToken = this.jwtService.sign({
        id: user.id.value.toString(), // Convert UniqueEntityID to string
        role: user.props.role.getValue(),
      });
      const newRefreshToken = this.jwtService.signRefreshToken({
        id: user.id.value.toString(),
      }); // Convert UniqueEntityID to string

      // Return the new tokens and user info
      return {
        token: newToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id.value.toString(), // Convert UniqueEntityID to string
          email: user.props.email,
          role: user.props.role.getValue(),
        },
      };
    } catch (error) {
      console.error('Error during token refresh:', error);
      return null; // Invalid or expired refresh token
    }
  }
}
