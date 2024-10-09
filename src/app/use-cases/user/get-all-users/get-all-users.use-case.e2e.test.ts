import { GetAllUsersUseCase } from './get-all-users.use-case';
import { UserRepository } from '@infrastructure/persistence/repositories/user/user-repository';

describe('GetAllUsersUseCase E2E Test', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
  });

  it('should retrieve users in a real-world scenario', async () => {
    const users = await getAllUsersUseCase.execute();
    expect(Array.isArray(users)).toBe(true);
  });
});
