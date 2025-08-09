import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { IHashService } from '@domain/interfaces/infrastructure/services/hash/hash-service.interface';
import { IJWTService } from '@domain/interfaces/infrastructure/services/jwt/jwt-service.interface';
import { LoginUserDTO } from '@interfaces/dtos/user/login-user.dto';
import { Either, left, right } from '@domain/shared/core/either';
import { Result } from '@domain/shared/core/result';
import {
  AuthenticationError,
  UnexpectedError,
} from '@domain/shared/core/errors/app-error';
import { UseCase } from '@domain/shared/core/use-case';
import { JWTPayload } from '@domain/interfaces/infrastructure/services/jwt/jwt-payload.interface';

// Define the response type for the use case
type Response = Either<UnexpectedError | AuthenticationError, Result<string>>;

export class LoginUserUseCase
  implements UseCase<LoginUserDTO, Promise<Response>>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJWTService
  ) {}

  public async execute(dto: LoginUserDTO): Promise<Response> {
    try {
      // Find the user by their email
      const user = await this.userRepository.findByEmail(dto.email);
      if (!user) {
        return left(new AuthenticationError('Invalid credentials'));
      }

      // Validate the provided password against the hashed password in the repository
      const isPasswordValid = await this.hashService.compare(
        dto.password,
        user.props.password
      );
      if (!isPasswordValid) {
        return left(new AuthenticationError('Invalid credentials'));
      }

      // Create the payload for the JWT token
      const jwtPayload: JWTPayload = {
        id: user.id.toString(),
        role: user.props.role.getValue(), // Assuming the user has a role property
        email: user.props.email,
      };

      // Generate the JWT token
      const token = this.jwtService.sign(jwtPayload);

      // Return the generated token as a result
      return right(Result.ok<string>(token.accessToken));
    } catch (err) {
      // Handle any unexpected errors
      if (err instanceof Error) {
        return left(new UnexpectedError(err));
      }
      return left(new UnexpectedError(new Error('Unknown error occurred')));
    }
  }
}
