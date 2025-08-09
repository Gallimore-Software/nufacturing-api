// auth.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '@interfaces/http/controllers/auth/auth.controller';
import {
  validateLogin,
  validateRegister,
} from '@interfaces/http/middleware/validation.middleware';

const router = Router();

// Login route to get tokens (access + refresh)
router.post(
  '/login',
  validateLogin,
  (req: Request, res: Response, next: NextFunction) =>
    AuthController.login(req, res).catch(next)
);

// Register route to create a new user
router.post(
  '/register',
  validateRegister,
  (req: Request, res: Response, next: NextFunction) =>
    AuthController.register(req, res).catch(next)
);

// Route to refresh access token
router.post(
  '/refresh-token',
  (req: Request, res: Response, next: NextFunction) =>
    AuthController.refreshToken(req, res).catch(next)
);

export default router;
