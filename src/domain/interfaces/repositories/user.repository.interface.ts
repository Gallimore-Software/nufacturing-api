import { User } from '@domain/entities/user/user-entity';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  createUser(user: User): Promise<User>;
  findById(id: UniqueEntityID): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateUser(
    id: UniqueEntityID,
    updatedUser: Partial<User>
  ): Promise<User | null>;
  deleteUser(id: UniqueEntityID): Promise<boolean>;
}
