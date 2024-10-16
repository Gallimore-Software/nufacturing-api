import { JWTPayload } from '@domain/interfaces/infrastructure/services/jwt/jwt-payload.interface';
import { JWTService } from '@infrastructure/auth/jwt/jwt-service';
import { TYPES } from '@infrastructure/di/types';
import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@domain/entities/user/user-role';

@injectable()
export class RoleMiddleware {
  constructor(@inject(TYPES.JWTService) private jwtService: JWTService) {}

  public handle(roles: UserRole[] | UserRole) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          console.log('Authorization header missing or malformed');
          res
            .status(401)
            .json({ message: 'Authorization token missing or malformed' });
          return;
        }

        const token = authHeader.split(' ')[1];

        // Verify token and get decoded user information
        const decoded: JWTPayload | null = await this.jwtService.verify(token);
        console.log('Decoded payload:', decoded);

        if (!decoded) {
          res.status(401).json({ message: 'Invalid or expired token' });
          return;
        }

        // Now that 'decoded' is typed, we can safely access 'role'
        const userRole = new UserRole(decoded.role);
        console.log('User role:', userRole);

        if (Array.isArray(roles)) {
          const hasValidRole = roles.some((role) => userRole.equals(role));
          if (!hasValidRole) {
            res.status(403).json({
              message: 'Access denied. You do not have the required role.',
            });
            return;
          }
        } else {
          if (!userRole.equals(roles)) {
            res.status(403).json({
              message: 'Access denied. You do not have the required role.',
            });
            return;
          }
        }

        req.body.userRole = userRole;
        next();
      } catch (error) {
        console.log('Error during token verification:', error);
        res.status(500).json({
          message: 'An error occurred while verifying authorization',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };
  }
}

export default RoleMiddleware;
