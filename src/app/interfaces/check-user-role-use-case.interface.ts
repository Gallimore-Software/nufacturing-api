import User from '@domain/entities/user/user-entity';

export interface ICheckUserRoleUseCase {
  execute(userId: string, roles: string[]): Promise<User>;
}
