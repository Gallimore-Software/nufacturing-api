import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class VerifyEmailUseCase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  // Execute the verify email use case
  async execute(userId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.emailVerified = true;
    await this.userRepository.updateUser(user.id, { emailVerified: true });

    return true;
  }
}
