import { DeleteUserUseCase } from './delete-user.use-case';
import { UserRepository } from '@infrastructure/persistence/repositories/user/user-repository';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { User } from '@domain/entities/user/user-entity';
import { UserRole } from '@domain/entities/user/user-role';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';

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
      username: 'testUser',
      email: 'test@example.com',
      password: 'password123',
      phoneNumber: '555-555-5555',
      role: new UserRole('User'),
      emailVerified: false,
      createdAt: new Date(),
      isDeleted: false,
    }).getValue();

    const savedUser = await userRepository.createUser(user);

    // Prepare the requesting user (assuming an Admin is performing the deletion)
    const requestingUser = {
      id: new UniqueEntityID(), // This can be the same or different depending on your scenario
      role: new UserRole('Admin'), // Adjust the role based on your logic
    };

    // Act: Delete the user
    const result = await deleteUserUseCase.execute(
      savedUser.id,
      requestingUser
    );

    // Assert: Verify that the user was deleted
    expect(result).toBe(true);

    const foundUser = await userRepository.findById(
      new UniqueEntityID(savedUser.id.toString())
    );
    expect(foundUser).toBeNull();
  });

  it('should return false if the user does not exist', async () => {
    // Prepare the requesting user (e.g., Admin)
    const requestingUser = {
      id: new UniqueEntityID(),
      role: new UserRole('Admin'),
    };

    // Act: Try to delete a non-existent user
    const result = await deleteUserUseCase.execute(
      new UniqueEntityID('nonexistent-id'),
      requestingUser
    );

    // Assert: Should return false
    expect(result).toBe(false);
  });
});
