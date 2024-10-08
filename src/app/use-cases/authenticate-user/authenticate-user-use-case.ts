// src/application/use-cases/authenticate-user-use-case.ts
import { IJWTService } from '@application/interfaces/jwt-service.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user-repository.interface';
import { UnauthorizedError } from '@domain/errors/unauthorized-error';

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJWTService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.isPasswordValid(password)) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate a JWT token upon successful authentication
    const token = this.jwtService.generateToken({ id: user.id }, process.env.JWT_SECRET as string, '1h');

    return token;
  }
}
