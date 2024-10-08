// src/application/interfaces/check-user-role-use-case.interface.ts
import { User } from '@domain/entities/user';

export interface ICheckUserRoleUseCase {
  execute(userId: string, roles: string[]): Promise<User>;
}
