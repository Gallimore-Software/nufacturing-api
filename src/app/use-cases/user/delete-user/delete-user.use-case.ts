import { UserRole } from '@domain/entities/user/user-role';
import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    userId: UniqueEntityID,
    requestingUser: { id: UniqueEntityID; role: UserRole }
  ): Promise<boolean> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Check if the requesting user is an admin
    if (!requestingUser.role.isAdmin()) {
      throw new Error('Unauthorized user');
    }

    // Find the user by ID
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return false; // User not found
    }

    // Check if the user is already deleted
    if (user.isDeleted()) {
      return false; // User already deleted
    }

    // Delete the user
    const result = await this.userRepository.deleteUser(userId);
    return result;
  }
}
