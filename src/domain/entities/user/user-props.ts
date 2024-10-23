import UserRole from '@domain/entities/user/user-role';

export interface IUserProps {
  isDeleted: boolean;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
  createdAt: Date; // Ensure this is a Date type
  emailVerified: boolean;
}
