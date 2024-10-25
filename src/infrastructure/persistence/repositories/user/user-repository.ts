import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { User } from '@domain/entities/user/user-entity';
import UserModel, {
  IUserModel,
} from '@infrastructure/persistence/models/user/user-model'; // Import the Mongoose model and its types
import { injectable } from 'inversify';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';
import UserRole from '@domain/entities/user/user-role';

@injectable()
export class UserRepository implements IUserRepository {
  // Find all users in the database
  async findAll(): Promise<User[]> {
    const users = await UserModel.find(); // Fetch all users from the database
    return users.map((user) => this.toDomain(user)); // Map each user model to domain entity
  }

  // Create a new user in the database
  async createUser(user: User): Promise<User> {
    const userModel = new UserModel({
      username: user.props.username,
      password: user.props.password,
      email: user.props.email,
      role: user.props.role.getValue(), // Ensure role is stored as a string
      emailVerified: user.props.emailVerified,
      createdAt: user.props.createdAt
        ? new Date(user.props.createdAt)
        : new Date(), // Convert to Date object
      phoneNumber: user.props.phoneNumber,
    });

    const savedUser = await userModel.save();
    return this.toDomain(savedUser); // Convert the saved MongoDB model to domain entity
  }

  // Find a user by their ID
  async findById(id: UniqueEntityID): Promise<User | null> {
    const userModel = await UserModel.findById(id);
    if (!userModel) return null;
    return this.toDomain(userModel); // Convert MongoDB model to domain entity
  }

  // Find a user by their email
  async findByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ email });
    if (!userModel) return null;
    return this.toDomain(userModel); // Convert MongoDB model to domain entity
  }

  // Update a user's details by ID
  async updateUser(
    id: UniqueEntityID,
    updatedUser: Partial<User>
  ): Promise<User | null> {
    // Convert the domain entity to persistence layer's format
    const updateData = this.toPersistence(updatedUser);

    const updatedUserModel = await UserModel.findByIdAndUpdate(
      id,
      updateData, // Apply partial updates here
      { new: true } // Return the updated document
    );

    if (!updatedUserModel) return null;
    return this.toDomain(updatedUserModel); // Convert MongoDB model to domain entity
  }

  // Delete a user by ID
  async deleteUser(id: UniqueEntityID): Promise<boolean> {
    const deleted = await UserModel.findByIdAndDelete(id);
    return !!deleted;
  }

  // Convert persistence model to domain entity
  private toDomain(userModel: IUserModel): User {
    return User.create(
      {
        username: userModel.username,
        password: userModel.password,
        email: userModel.email,
        role: new UserRole(userModel.role), // Create UserRole from string
        emailVerified: userModel.emailVerified,
        createdAt: new Date(userModel.createdAt), // Ensure this is a Date object
        isDeleted: userModel.isDeleted,
        phoneNumber: userModel.phoneNumber,
      },
      new UniqueEntityID(userModel.id)
    ).getValue(); // Convert MongoDB _id to UniqueEntityID
  }

  // Convert domain entity to persistence format (for updates)
  private toPersistence(user: Partial<User>): Partial<IUserModel> {
    return {
      username: user?.props?.username,
      password: user?.props?.password,
      email: user?.props?.email,
      role: user?.props?.role,
      emailVerified: user?.props?.emailVerified,
      createdAt: user?.props?.createdAt,
      phoneNumber: user?.props?.phoneNumber,
    };
  }
}
