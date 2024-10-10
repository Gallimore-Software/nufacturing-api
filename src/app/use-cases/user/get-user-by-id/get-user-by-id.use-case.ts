import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';
import { Result } from '@domain/common/result';
import { User } from '@domain/entities/user/user-entity';
import { NotFoundError } from '@domain/shared/core/errors/not-found-error';
import { UserRepository } from '@infrastructure/persistence/repositories/user/user-repository';

export class GetUserByIdUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  // Execute method that takes the User ID and performs the use case logic
  async execute(userId: string): Promise<Result<User>> {
    try {
      // Create UniqueEntityID instance from the string ID
      const id = new UniqueEntityID(userId);

      // Fetch the user from the repository
      const user = await this.userRepository.findById(id);

      // Check if the user exists
      if (!user) {
        return Result.fail<User>(new NotFoundError('User not found').message);
      }

      // Return the user as a success result
      return Result.ok<User>(user);
    } catch (error) {
      // Handle unexpected errors
      return Result.fail<User>(error.message);
    }
  }
}
