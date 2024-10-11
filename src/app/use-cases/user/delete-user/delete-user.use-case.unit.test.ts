// import { DeleteUserUseCase } from './delete-user.use-case';
// import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
// import { User } from '@domain/entities/user/user-entity';

// describe('DeleteUserUseCase', () => {
//   let deleteUserUseCase: DeleteUserUseCase;
//   let mockUserRepository: jest.Mocked<IUserRepository>;

//   beforeEach(() => {
//     mockUserRepository = {
//       delete: jest.fn(),
//       findById: jest.fn(),
//     } as any;

//     deleteUserUseCase = new DeleteUserUseCase(mockUserRepository);
//   });

//   it('should delete a user if the user exists and the requesting user is admin', async () => {
//     // Arrange
//     const userId = '12345';
//     const mockUser: User = {
//       id: userId,
//       username: 'testuser',
//       email: 'test@example.com',
//       password: 'password123',
//       role: 'User',
//       emailVerified: false,
//     } as any;

//     const adminUser = { id: 'admin', role: 'Admin' }; // Requesting user (admin)

//     mockUserRepository.findById.mockResolvedValue(mockUser); // Simulate the user exists

//     // Act
//     const result = await deleteUserUseCase.execute(userId, adminUser);

//     // Assert
//     expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
//     expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId);
//     expect(result).toBe(true);
//   });

//   it('should return false if the user does not exist', async () => {
//     // Arrange
//     const userId = 'non-existent-user';
//     const adminUser = { id: 'admin', role: 'Admin' };

//     mockUserRepository.findById.mockResolvedValue(null); // Simulate user not found

//     // Act
//     const result = await deleteUserUseCase.execute(
//       new UniqueEntityId(userId),
//       adminUser
//     );

//     // Assert
//     expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
//     expect(mockUserRepository.deleteUser).not.toHaveBeenCalled(); // Ensure delete isn't called
//     expect(result).toBe(false);
//   });

//   it('should throw an error if user deletion fails', async () => {
//     // Arrange
//     const userId = '12345';
//     const mockUser: User = {
//       id: userId,
//       username: 'testuser',
//       email: 'test@example.com',
//       password: 'password123',
//       role: 'User',
//       emailVerified: false,
//     } as any;

//     const adminUser = { id: 'admin', role: 'Admin' };

//     mockUserRepository.findById.mockResolvedValue(mockUser); // Simulate the user exists
//     mockUserRepository.deleteUser.mockRejectedValue(
//       new Error('Error deleting user')
//     ); // Simulate deletion error

//     // Act & Assert
//     await expect(
//       deleteUserUseCase.execute(new userId(), adminUser)
//     ).rejects.toThrow('Error deleting user: Error deleting user');

//     expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
//     expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId);
//   });

//   it('should throw an error if the requesting user is not an admin', async () => {
//     // Arrange
//     const userId = '12345';
//     const mockUser: User = {
//       id: userId,
//       username: 'testuser',
//       email: 'test@example.com',
//       password: 'password123',
//       role: 'User',
//       emailVerified: false,
//     } as any;

//     const nonAdminUser = { id: 'user', role: 'User' }; // Requesting user (non-admin)

//     mockUserRepository.findById.mockResolvedValue(mockUser);

//     // Act & Assert
//     await expect(
//       deleteUserUseCase.execute(userId, nonAdminUser)
//     ).rejects.toThrow('Unauthorized user');
//     expect(mockUserRepository.deleteUser).not.toHaveBeenCalled(); // delete should not be called
//   });

//   it('should throw an error if no user ID is provided', async () => {
//     // Arrange
//     const userId = undefined;
//     const adminUser = { id: 'admin', role: 'Admin' };

//     // Act & Assert
//     await expect(deleteUserUseCase.execute(userId, adminUser)).rejects.toThrow(
//       'User ID is required'
//     );
//     expect(mockUserRepository.findById).not.toHaveBeenCalled();
//     expect(mockUserRepository.deleteUser).not.toHaveBeenCalled();
//   });

//   it('should return false if the user is already marked as deleted', async () => {
//     // Arrange
//     const userId = '12345';
//     const adminUser = { id: 'admin', role: 'Admin' };
//     const mockUser: User = {
//       id: userId,
//       username: 'testuser',
//       email: 'test@example.com',
//       password: 'password123',
//       role: 'User',
//       emailVerified: false,
//       isDeleted: true, // Assume isDeleted marks a user as "soft deleted"
//     } as any;

//     mockUserRepository.findById.mockResolvedValue(mockUser);

//     // Act
//     const result = await deleteUserUseCase.execute(userId, adminUser);

//     // Assert
//     expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
//     expect(mockUserRepository.deleteUser).not.toHaveBeenCalled(); // delete should not be called
//     expect(result).toBe(false);
//   });
// });
