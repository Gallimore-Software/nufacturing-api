// auth-service.ts
import { inject, injectable } from 'inversify';
import { JWTService } from '@infrastructure/auth/jwt/jwt-service';
import { IHashService } from '@domain/interfaces/infrastructure/services/hash/hash-service.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';

@injectable()
export class AuthService {
  constructor(
    @inject('JWTService') private jwtService: JWTService,
    @inject('HashService') private hashService: IHashService,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

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

  async refreshToken(token: string): Promise<string | null> {
    try {
      const payload = this.jwtService.verifyRefreshToken(token);

      // Generate new access token
      const newToken = this.jwtService.sign({
        id: payload.id,
        role: payload.role,
      });

      return newToken;
    } catch (error) {
      return null; // Invalid or expired refresh token
    }
  }
}
