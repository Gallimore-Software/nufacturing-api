import { Request, Response } from 'express';
import { container } from '@infrastructure/di/container';
import { CreateUserUseCase } from '@app/commands/user/create-user/create-user.command';
import { UpdateUserUseCase } from '@app/commands/user/update-user/update-user-use-case';
import { DeleteUserUseCase } from '@app/use-cases/user/delete-user/delete-user.use-case';
import { GetUserByIdUseCase } from '@app/use-cases/user/get-user-by-id/get-user-by-id.use-case';
import { GetAllUsersUseCase } from '@app/use-cases/user/get-all-users/get-all-users.use-case';
import { LoginUserUseCase } from '@app/use-cases/user/login-user/login-user.use-case';
import { VerifyEmailUseCase } from '@app/use-cases/user/verify-email/verify-email.use-case';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';
import { UserRole } from '@domain/entities/user/user-role';

// Controller for managing user-related actions
export class UserController {
  // Controller for creating a new user
  static async createUser(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = container.get(CreateUserUseCase);
    try {
      const result = await createUserUseCase.execute(req.body);
      console.log('Create user result', result);
      return res.status(201).json(result);
    } catch (error: unknown) {
      console.log('Create user error', error);
      return handleError(res, error);
    }
  }

  // Controller for getting all users
  static async getAllUsers(res: Response): Promise<Response> {
    // Added req to match middleware
    const getAllUsersUseCase = container.get(GetAllUsersUseCase);
    try {
      const users = await getAllUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  }

  // Controller for getting a user by ID
  static async getUserById(req: Request, res: Response): Promise<Response> {
    const getUserByIdUseCase = container.get(GetUserByIdUseCase);
    try {
      const user = await getUserByIdUseCase.execute(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error: unknown) {
      return handleError(res, error);
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
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  }

  // Controller for deleting a user
  static async deleteUser(req: Request, res: Response): Promise<Response> {
    const deleteUserUseCase = container.get(DeleteUserUseCase);
    try {
      const requestingUser = req.body.user; // Assuming the authenticated user is set in the request body

      const deleted = await deleteUserUseCase.execute(
        new UniqueEntityID(req.params.id), // The ID of the user to be deleted
        {
          id: new UniqueEntityID(requestingUser.id),
          role: new UserRole(requestingUser.role),
        } // The requesting user
      );

      if (!deleted) {
        return res
          .status(404)
          .json({ message: 'User not found or already deleted' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: unknown) {
      return handleError(res, error);
    }
  }

  // Controller for logging in a user
  static async loginUser(req: Request, res: Response): Promise<Response> {
    const loginUserUseCase = container.get(LoginUserUseCase);
    const { email, password } = req.body;
    try {
      // Wrap email and password into a LoginUserDTO object
      const result = await loginUserUseCase.execute({ email, password });
      return res.status(200).json(result);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  }

  // Controller for verifying email
  static async verifyEmail(req: Request, res: Response): Promise<Response> {
    const verifyEmailUseCase = container.get(VerifyEmailUseCase);
    try {
      const result = await verifyEmailUseCase.execute(
        new UniqueEntityID(req.params.token)
      );
      return res.status(200).json({ message: result });
    } catch (error: unknown) {
      return handleError(res, error);
    }
  }
}

// Helper function to handle errors
function handleError(res: Response, error: unknown): Response {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  } else {
    return res.status(400).json({ error: 'An unknown error occurred.' });
  }
}
