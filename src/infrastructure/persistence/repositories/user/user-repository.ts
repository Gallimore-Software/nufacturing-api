import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { User } from '@domain/entities/user/user-entity';
import UserModel from '@infrastructure/persistence/models/user/user-model';
import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {
  // Find all users in the database
  async findAll(): Promise<User[]> {
    const users = await UserModel.find(); // Fetch all users from the database
    return users.map(this.toDomain); // Map each user model to domain entity
  }

  // Create a new user in the database
  async createUser(user: User): Promise<User> {
    const userModel = new UserModel({
      username: user.props.username,
      password: user.props.password,
      email: user.props.email,
      role: user.props.role,
      emailVerified: user.props.emailVerified,
      createdAt: user.props.createdAt ?? new Date(),
    });

    const savedUser = await userModel.save();
    return this.toDomain(savedUser);
  }

  // Find a user by their ID
  async findById(id: string): Promise<User | null> {
    const userModel = await UserModel.findById(id);
    if (!userModel) return null;
    return this.toDomain(userModel);
  }

  // Find a user by their email
  async findByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ email });
    if (!userModel) return null;
    return this.toDomain(userModel);
  }

  // Update a user's details by ID
  async updateUser(
    id: string,
    updatedUser: Partial<User>
  ): Promise<User | null> {
    const updatedUserModel = await UserModel.findByIdAndUpdate(
      id,
      updatedUser,
      { new: true }
    );
    if (!updatedUserModel) return null;
    return this.toDomain(updatedUserModel);
  }

  // Delete a user by ID
  async deleteUser(id: string): Promise<boolean> {
    const deleted = await UserModel.findByIdAndDelete(id);
    return !!deleted;
  }

  // Convert persistence model to domain entity
  private toDomain(userModel: any): User {
    return User.create({
      username: userModel.username,
      password: userModel.password,
      email: userModel.email,
      role: userModel.role,
      emailVerified: userModel.emailVerified,
      createdAt: userModel.createdAt,
    }).getValue(); // Assuming Result<T> is used
  }
}
