export interface CreateUserDTO {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;

  role?: "user" | "admin" | "manager"; // Optional, defaults to "user"
}

export interface UpdateUserDTO {
  email?: string;
  phoneNumber?: string;
  password?: string;
  role?: "user" | "admin" | "manager";
}
