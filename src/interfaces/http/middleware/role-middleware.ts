import { JWTService } from '@app/services/jwt-service/jwt-service-service';
import { CheckUserRoleUseCase } from '@use-cases/user/check-user-role/check-user-role-use-case';
import { TYPES } from '@infrastructure/di/types';
import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

// Extend Request interface locally for this file
interface CustomRequest extends Request {
  user?: any;  // Define the `user` property with any type or a more specific type
}

@injectable()
export class RoleMiddleware {
  constructor(
    @inject(TYPES.JWTService) private jwtService: JWTService,
    @inject(TYPES.CheckUserRoleUseCase) private checkUserRoleUseCase: CheckUserRoleUseCase
  ) {}

  public handle(roles: string[]) {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
          return res.status(401).json({ message: 'Token not found' });
        }

        const decoded = this.jwtService.verifyToken(token, process.env.JWT_SECRET as string);
        const user = await this.checkUserRoleUseCase.execute(decoded.id, roles);

        req.user = user;
        next();
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(401).json({ message: 'Unauthorized', error: error.message });
        } else {
          res.status(401).json({ message: 'Unauthorized', error: 'Unknown error' });
        }
      }
    };
  }
}
