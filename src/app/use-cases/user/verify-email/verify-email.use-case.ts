import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';
import { inject, injectable } from 'inversify';

@injectable()
export class VerifyEmailUseCase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository
  ) {}

  // Execute the verify email use case
  async execute(userId: UniqueEntityID): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.verifyEmail();
    await this.userRepository.updateUser(user.id, user);

    return true;
  }
}
