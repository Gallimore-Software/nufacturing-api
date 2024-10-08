// src/application/use-cases/user/verify-email.use-case.ts

import { IUserRepository } from "@domain/interfaces/repositories/user-repository.interface";
import { injectable, inject } from "inversify";
import jwt from "jsonwebtoken";
import { NotFoundError } from "@domain/errors/not-found-error/not-found-custom-error";
import { UnauthorizedError } from "@domain/errors/unauthorized-error/unauthorized-error-custom-error";

@injectable()
export class VerifyEmailUseCase {
  constructor(@inject("IUserRepository") private userRepository: IUserRepository) {}

  async execute(token: string): Promise<boolean> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      const user = await this.userRepository.findById(decoded.id);
      if (!user) {
        throw new NotFoundError("User not found");
      }

      if (user.props.emailVerified) {
        return true; // Email is already verified
      }

      user.props.emailVerified = true;
      await this.userRepository.updateUser(user.props.id, user.props);
      return true;
    } catch (err) {
      throw new UnauthorizedError("Invalid or expired token");
    }
  }
}
