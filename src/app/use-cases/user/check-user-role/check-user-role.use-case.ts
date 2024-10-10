import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { UserRole } from '@domain/entities/user/user-role';
import { inject, injectable } from 'inversify';

@injectable()
export class CheckUserRoleUseCase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository
  ) {}

  // Execute the check user role use case
  async execute(userId: string, requiredRole: UserRole): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.role === requiredRole;
  }
}
