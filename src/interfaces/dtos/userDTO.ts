export class CreateUserDTO {
  username: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;

  constructor({ username, email, password, role, phoneNumber }: any) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phoneNumber = phoneNumber;
  }
}
