// src/application/use-cases/user/create-user.use-case.ts

import { IUserRepository } from "@domain/interfaces/repositories/user-repository.interface";
import { User } from "@domain/entities/user/user-entity";
import { CreateUserDTO } from "@interfaces/dtos/user/user-dto";
import { injectable, inject } from "inversify";
import { EmailService } from "@application/services/email-service";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUserRepository") private userRepository: IUserRepository,
    @inject("EmailService") private emailService: EmailService
  ) {}

  async execute(userDTO: CreateUserDTO): Promise<User> {
    const user = User.create(userDTO).getValue();

    const savedUser = await this.userRepository.createUser(user);

    // Optionally, send an email notification
    await this.emailService.sendWelcomeEmail(savedUser);

    return savedUser;
  }
}
