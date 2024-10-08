// src/interfaces/http/middleware/role-middleware.ts
import { Request, Response, NextFunction } from 'express';
import { JWTService } from '@application/services/jwt-service';
import { CheckUserRoleUseCase } from '@application/use-cases/check-user-role-use-case';
import { IUserRepository } from '@domain/interfaces/repositories/user-repository.interface';
import { UnauthorizedError } from '@domain/errors/unauthorized-error';
import { Logger } from '@infrastructure/logger/logger';

export const roleMiddleware = (
  roles: string[],
  userRepository: IUserRepository,
  jwtService: JWTService
) => {
  const checkUserRoleUseCase = new CheckUserRoleUseCase(userRepository);

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedError('Token not found');
      }

      const decoded = jwtService.verifyToken(token, process.env.JWT_SECRET as string);

      const user = await checkUserRoleUseCase.execute(decoded.id, roles);

      req.user = user; // Assuming request is extended to allow `user`
      next();
    } catch (error) {
      Logger.error('Role middleware failed', error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  };
};
