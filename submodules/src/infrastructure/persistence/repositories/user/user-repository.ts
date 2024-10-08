// src/infrastructure/persistence/repositories/user-repository.ts
import { IUserRepository } from '@domain/interfaces/repositories/user-repository.interface';
import { User } from '@domain/entities/user';

export class UserRepository implements IUserRepository {
  async findById(userId: string): Promise<User | null> {
    const userDocument = await UserModel.findById(userId); // Assuming Mongoose here
    if (!userDocument) return null;

    return new User(userDocument.id, userDocument.role);
  }
}