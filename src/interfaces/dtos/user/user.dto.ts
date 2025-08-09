import { User } from '@domain/entities/user/user-entity';
import { UserRole } from '@domain/entities/user/user-role';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';

export interface CreateUserDTO {
  id: UniqueEntityID;
  username: string;
  password: string;
  email: string;
  isDeleted: false;
  phoneNumber: string;
  role?: UserRole;
  createdAt: Date;
  emailVerified: boolean;
}

export interface UserDTO {
  username: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
}

export type UpdateUserDTO = Partial<User>;
