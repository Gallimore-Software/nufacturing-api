import { UserRole } from '@domain/entities/user/user-role';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';

export interface UserProps {
  isDeleted: boolean;
  id: UniqueEntityID;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
  createdAt: Date;
  emailVerified: boolean;
}
