import { IUserRepository } from "@domain/interfaces/repositories/user-repository.interface";
import { injectable, inject } from "inversify";
import { User } from "@domain/entities/user/user-entity";
import { NotFoundError } from "@domain/errors/not-found-error/not-found-custom-error";

@injectable()
export class GetUserByEmailUseCase {
  constructor(@inject("IUserRepository") private userRepository: IUserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}
