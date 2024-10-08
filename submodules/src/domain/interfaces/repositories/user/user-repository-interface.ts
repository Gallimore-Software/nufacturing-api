// src/domain/interfaces/repositories/user-repository.interface.ts
import { User } from '@domain/entities/user';

export interface IUserRepository {
  findById(userId: string): Promise<User | null>;
}
