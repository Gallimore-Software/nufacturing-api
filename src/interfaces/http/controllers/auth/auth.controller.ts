// auth.controller.ts
import { Request, Response } from 'express';
import { container } from '@infrastructure/di/container';
import { TYPES } from '@infrastructure/di/types';
import { AuthService } from '@app/auth/auth.service';

export class AuthController {
  // Login method
  static async login(req: Request, res: Response): Promise<Response> {
    const authService = container.get<AuthService>(TYPES.AuthService);
    const { email, password } = req.body;

    try {
      const token = await authService.authenticate(email, password);
      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json(token);
    } catch (error) {
      console.error('Error during login:', error); // Log the error
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Register method
  static async register(req: Request, res: Response): Promise<Response> {
    const authService = container.get<AuthService>(TYPES.AuthService);
    const { username, email, password, phoneNumber } = req.body;

    try {
      const token = await authService.registerUser({
        username,
        email,
        password,
        phoneNumber,
      });
      return res.status(201).json({ token });
    } catch (error) {
      console.error('Error during registration:', error); // Log the error
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Refresh token method
  static async refreshToken(req: Request, res: Response): Promise<Response> {
    const authService = container.get<AuthService>(TYPES.AuthService);
    const { refreshToken } = req.body;

    try {
      const newToken = await authService.refreshToken(refreshToken);
      if (!newToken) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      return res.status(200).json({ token: newToken });
    } catch (error) {
      console.error('Error during token refresh:', error); // Log the error
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
