// user-props.ts
export interface UserProps {
  username: string;
  email: string;
  role: 'user' | 'admin' | 'manager';
  password: string;
  createdAt?: Date;
  emailVerified?: boolean;
}