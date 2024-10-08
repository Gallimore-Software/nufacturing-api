export interface CreateUserDTO {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;

  role?: "user" | "admin" | "manager"; // Optional, defaults to "user"
}

export interface UserDTO {
  username: string;
  email: string;
  role: "user" | "admin" | "manager";
  phoneNumber: string;
}

export type UpdateUserDTO = Partial<UserDTO>;
