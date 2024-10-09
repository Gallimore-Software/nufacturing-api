import { DeleteUserUseCase } from './delete-user.use-case';
import { UserRepository } from '@infrastructure/persistence/repositories/user/user-repository';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { User } from '@domain/entities/user/user-entity';
import { UserRole } from '@domain/entities/user/user-role';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id';

describe('DeleteUserUseCase Integration Test', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepository: UserRepository;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    userRepository = new UserRepository();
    deleteUserUseCase = new DeleteUserUseCase(userRepository);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should delete a user from the database', async () => {
    // Arrange: Create a user and save it to the database
    const user = User.create({
      id: new UniqueEntityID(),
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      phoneNumber: '555-555-5555',
      role: new UserRole('User'),
      emailVerified: false,
      createdAt: new Date(),
    }).getValue();

    const savedUser = await userRepository.createUser(user);

    // Act: Delete the user
    const result = await deleteUserUseCase.execute(savedUser.id.toString());

    // Assert: Verify that the user was deleted
    expect(result).toBe(true);

    const foundUser = await userRepository.findById(savedUser.id.toString());
    expect(foundUser).toBeNull();
  });

  it('should return false if the user does not exist', async () => {
    // Act: Try to delete a non-existent user
    const result = await deleteUserUseCase.execute('nonexistent-id');

    // Assert: Should return false
    expect(result).toBe(false);
  });
});
