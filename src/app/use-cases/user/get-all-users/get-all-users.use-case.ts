import { IUserRepository } from "@domain/interfaces/repositories/user-repository.interface";
import { injectable, inject } from "inversify";
import { User } from "@domain/entities/user/user-entity";

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject("IUserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
