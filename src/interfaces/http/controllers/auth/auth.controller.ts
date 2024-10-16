import { Request, Response } from 'express';
import { container } from '@infrastructure/di/container';
import { TYPES } from '@infrastructure/di/types'; // Import TYPES
import { AuthService } from '@app/auth/auth.service';

export class AuthController {
  // Login endpoint to issue a token
  static async login(req: Request, res: Response): Promise<Response> {
    // Fetch AuthService using TYPES.AuthService
    const authService = container.get<AuthService>(TYPES.AuthService);
    const { email, password } = req.body;

    console.log('Login request received:', { email, password });

    try {
      const token = await authService.authenticate(email, password);
      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json({ token });
    } catch (error) {
      console.error(error); // Add error logging
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Refresh token endpoint to issue a new access token
  static async refreshToken(req: Request, res: Response): Promise<Response> {
    // Fetch AuthService using TYPES.AuthService
    const authService = container.get<AuthService>(TYPES.AuthService);
    const { refreshToken } = req.body;

    try {
      const newToken = await authService.refreshToken(refreshToken);
      if (!newToken) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      return res.status(200).json({ token: newToken });
    } catch (error) {
      console.error(error); // Add error logging
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
