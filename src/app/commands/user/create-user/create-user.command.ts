import { EmailService } from '@app/services/email-service/email-service';
import { User } from '@domain/entities/user/user-entity';
import { IUserProps } from '@domain/entities/user/user-props';
import { UserRole } from '@domain/entities/user/user-role';
import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { CreateUserDTO } from '@interfaces/dtos/user/user.dto';
import { injectable, inject } from 'inversify';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('EmailService') private emailService: EmailService
  ) {}

  async execute(userDTO: CreateUserDTO): Promise<User> {
    // Set a default role if none is provided
    const role = userDTO.role ?? new UserRole('User'); // Default to 'User' role if undefined

    const userProps: IUserProps = {
      ...userDTO,
      role, // Now role is guaranteed to be present
    };

    const user = User.create(userProps).getValue();
    const savedUser = await this.userRepository.createUser(user);

    // Optionally, send an email notification
    await this.emailService.sendWelcomeEmail();

    return savedUser;
  }
}
