import { UserProps } from '@domain/entities/user/user-props';
import { UserRole } from '@domain/entities/user/user-role';

export interface CreateUserDTO {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  role?: UserRole;
}

export interface UserDTO {
  username: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
}

export type UpdateUserDTO = Partial<UserProps>;
