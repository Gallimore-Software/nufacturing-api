import { IUserRepository } from "@domain/interfaces/repositories/user-repository.interface";
import { injectable, inject } from "inversify";
import { UnauthorizedError } from "@domain/errors/unauthorized-error/unauthorized-error-custom-error";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

@injectable()
export class LoginUserUseCase {
  constructor(@inject("IUserRepository") private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.props.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.props.id, role: user.props.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    return token;
  }
}
