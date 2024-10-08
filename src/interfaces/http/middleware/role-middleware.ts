// src/interfaces/http/middleware/role-middleware.ts
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { JWTService } from '@application/services/jwt-service';
import { CheckUserRoleUseCase } from '@application/use-cases/check-user-role-use-case';
import { TYPES } from '@infrastructure/di/types';

export const roleMiddleware = (
  roles: string[],
  @inject(TYPES.JWTService) jwtService: JWTService,
  @inject(TYPES.CheckUserRoleUseCase) checkUserRoleUseCase: CheckUserRoleUseCase
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }

      const decoded = jwtService.verifyToken(token, process.env.JWT_SECRET as string);
      const user = await checkUserRoleUseCase.execute(decoded.id, roles);

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
  };
};
