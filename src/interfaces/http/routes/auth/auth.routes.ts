// auth.routes.ts
import { Router } from 'express';
import { AuthController } from '@interfaces/http/controllers/auth/auth.controller';

const router = Router();

// Login route to get tokens (access + refresh)
router.post('/login', AuthController.login);

// Route to refresh access token
router.post('/refresh-token', AuthController.refreshToken);

export default router;
