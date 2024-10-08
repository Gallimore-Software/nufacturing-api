// src/domain/interfaces/repositories/user-repository.interface.ts

import { User } from "@domain/entities/user/user-entity";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateUser(id: string, updatedUser: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
