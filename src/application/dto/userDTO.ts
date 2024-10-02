// userDTO.ts

interface UserDTO {
  username: string;
  password: string;
  email: string;
  role?: "user" | "admin" | "manager";
  phoneNumber: string;
  createdAt?: Date;
  emailVerified?: boolean;
}

export default UserDTO;
