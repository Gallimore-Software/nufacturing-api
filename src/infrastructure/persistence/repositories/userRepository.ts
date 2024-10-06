import { IUserRepository } from "@domain/interfaces/repositories/userRepositoryInterface";
import User from "@infrastructure/persistence/models/userModel";
import { CreateUserDTO } from "@interfaces/dtos/userDTO";

export class UserRepository implements IUserRepository {
  async createUser(userDetails: CreateUserDTO): Promise<User> {
    const user = new User(userDetails);
    return user.save();
  }

  async findById(userId: string): Promise<User | null> {
    return User.findById(userId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ email });
  }

  async updateUser(userId: string, updateData: any): Promise<User | null> {
    return User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async deleteUser(userId: string): Promise<User | null> {
    return User.findByIdAndDelete(userId);
  }
}
