// import { User } from '@domain/entities/user/user-entity';
// import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
// import Logger from '@infrastructure/logging/logger';
// import { injectable, inject } from 'inversify';

// @injectable()
// export class GetAllUsersUseCase {
//   constructor(
//     @inject('IUserRepository') private userRepository: IUserRepository
//   ) {}

//   async execute(): Promise<User[]> {
//     try {
//       const users = await this.userRepository.findAll();
//       return users;
//     } catch (error: unknown) {
//       Logger.error(error);
//       return [];
//     }
//   }
// }
test.skip('should return success', () => {
  // Empty or not yet implemented
});

test.skip('should handle error', () => {
  // Empty or not yet implemented
});
