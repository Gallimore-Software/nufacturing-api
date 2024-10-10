import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { User } from '@domain/entities/user/user-entity';
import { UpdateUserDTO } from '@interfaces/dtos/user/user.dto';
import { injectable, inject } from 'inversify';
import { NotFoundError } from '@domain/shared/core/errors/not-found-error';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository
  ) {}

  async execute(userId: string, userDTO: UpdateUserDTO): Promise<User> {
    const uniqueUserId = new UniqueEntityID(userId);
    const user = await this.userRepository.updateUser(uniqueUserId, userDTO);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}
