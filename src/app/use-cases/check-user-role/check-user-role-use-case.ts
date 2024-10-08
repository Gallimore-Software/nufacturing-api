// src/application/use-cases/check-user-role-use-case.ts
import { IUserRepository } from '@domain/interfaces/repositories/user-repository.interface';
import { User } from '@domain/entities/user';
import { ForbiddenError } from '@domain/errors/forbidden-error';

export class CheckUserRoleUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, roles: string[]): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenError('Access denied');
    }

    return user;
  }
}
