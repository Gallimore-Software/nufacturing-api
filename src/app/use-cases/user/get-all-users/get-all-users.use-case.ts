import { IUserRepository } from "@domain/interfaces/repositories/user.repository.interface";
import { injectable, inject } from "inversify";
import { Error } from "mongoose";

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject("IUserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<any> {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error: any) {
      throw new Error('Error retrieving users: ' + error.message);
    }
  }
}
