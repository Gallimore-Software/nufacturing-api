import { GetAllUsersUseCase } from './get-all-users.use-case';
import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { User } from '@domain/entities/user/user-entity';

describe('GetAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    // Mocking all the necessary repository methods
    mockUserRepository = {
      findAll: jest.fn(),
      createUser: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    getAllUsersUseCase = new GetAllUsersUseCase(mockUserRepository);
  });

  it('should return all users', async () => {
    const mockUsers: User[] = [
      User.create({ username: 'JohnDoe', password: 'password', email: 'john@example.com', role: 'user', emailVerified: false }).getValue(),
      User.create({ username: 'JaneDoe', password: 'password', email: 'jane@example.com', role: 'user', emailVerified: true }).getValue(),
    ];
    
    mockUserRepository.findAll.mockResolvedValue(mockUsers);

    const result = await getAllUsersUseCase.execute();
    expect(result).toEqual(mockUsers);
    expect(mockUserRepository.findAll).toHaveBeenCalled();
  });

  it('should throw an error if user retrieval fails', async () => {
    mockUserRepository.findAll.mockRejectedValue(new Error('Database error'));

    await expect(getAllUsersUseCase.execute()).rejects.toThrow('Error retrieving users: Database error');
  });
});
