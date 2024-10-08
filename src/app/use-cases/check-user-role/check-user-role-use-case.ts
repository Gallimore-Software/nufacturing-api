// src/application/use-cases/check-user-role-use-case.ts
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/di/types';
import { UnauthorizedError } from '@domain/errors/unauthorized-error/unauthorized-error-custom-error';
import { IUserRepository } from '@interfaces/repositories/user/user-repository-interface';

@injectable()
export class CheckUserRoleUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(userId: string, roles: string[]): Promise<any> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    if (!roles.includes(user.role)) {
      throw new UnauthorizedError('Access denied');
    }
    return user;
  }
}
