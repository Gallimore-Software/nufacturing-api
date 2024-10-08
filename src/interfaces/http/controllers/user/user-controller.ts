// src/interfaces/http/controllers/user-controller.ts

import { Request, Response } from "express";
import { container } from "@infrastructure/di/container";
import { CreateUserUseCase } from "@app/use-cases/user/create-user-use-case";
import { GetAllUsersUseCase } from "@use-cases/user/get-all-users-use-case";
import { GetUserByIdUseCase } from "@use-cases/user/get-user-by-id-use-case";
import { UpdateUserUseCase } from "@use-cases/user/update-user-use-case";
import { DeleteUserUseCase } from "@use-cases/user/delete-user-use-case";
import { LoginUserUseCase } from "@use-cases/user/login-user-use-case";
import { VerifyEmailUseCase } from "@use-cases/user/verify-email-use-case";

// Controller for creating a new user
export class UserController {
  static async createUser(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = container.get(CreateUserUseCase);
    try {
      const result = await createUserUseCase.execute(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Controller for getting all users
  static async getAllUsers(req: Request, res: Response): Promise<Response> {
    const getAllUsersUseCase = container.get(GetAllUsersUseCase);
    try {
      const users = await getAllUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Controller for getting a user by ID
  static async getUserById(req: Request, res: Response): Promise<Response> {
    const getUserByIdUseCase = container.get(GetUserByIdUseCase);
    try {
      const user = await getUserByIdUseCase.execute(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Controller for updating a user
  static async updateUser(req: Request, res: Response): Promise<Response> {
    const updateUserUseCase = container.get(UpdateUserUseCase);
    try {
      const updatedUser = await updateUserUseCase.execute(
        req.params.id,
        req.body
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Controller for deleting a user
  static async deleteUser(req: Request, res: Response): Promise<Response> {
    const deleteUserUseCase = container.get(DeleteUserUseCase);
    try {
      const deleted = await deleteUserUseCase.execute(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Controller for logging in a user
  static async loginUser(req: Request, res: Response): Promise<Response> {
    const loginUserUseCase = container.get(LoginUserUseCase);
    try {
      const result = await loginUserUseCase.execute(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  // Controller for verifying email
  static async verifyEmail(req: Request, res: Response): Promise<Response> {
    const verifyEmailUseCase = container.get(VerifyEmailUseCase);
    try {
      const result = await verifyEmailUseCase.execute(req.params.token);
      return res.status(200).json({ message: result });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
