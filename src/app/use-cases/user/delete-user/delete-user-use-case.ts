// src/application/use-cases/user/delete-user.use-case.ts

import { IUserRepository } from "@domain/interfaces/repositories/user-repository.interface";
import { injectable, inject } from "inversify";
import { NotFoundError } from "@domain/errors/not-found-error/not-found-custom-error";

@injectable()
export class DeleteUserUseCase {
  constructor(@inject("IUserRepository") private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<boolean> {
    const userDeleted = await this.userRepository.deleteUser(userId);
    if (!userDeleted) {
      throw new NotFoundError("User not found");
    }
    return userDeleted;
  }
}
