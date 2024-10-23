import { JWTPayload } from '@domain/interfaces/infrastructure/services/jwt/jwt-payload.interface';
import { JWTService } from '@infrastructure/auth/jwt/jwt-service';
import { TYPES } from '@infrastructure/di/types';
import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@domain/entities/user/user-role';

@injectable()
export class RoleMiddleware {
  constructor(@inject(TYPES.JWTService) private jwtService: JWTService) {}

  public handle(requiredRoles: UserRole[] | UserRole) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      try {
        // Extract authorization header
        const authHeader = req.headers.authorization;

        // Validate authorization header presence and format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res
            .status(401)
            .json({ message: 'Authorization token missing or malformed' });
        }

        // Extract token from 'Bearer <token>' format
        const token = authHeader.split(' ')[1];

        // Verify token using JWT service
        const decoded: JWTPayload | null = await this.jwtService.verify(token);

        // If token verification fails, respond with unauthorized
        if (!decoded) {
          return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Create UserRole instance from decoded token role
        const userRole = new UserRole(decoded.role);

        // Check if the user has at least one of the required roles
        const hasRequiredRole = Array.isArray(requiredRoles)
          ? requiredRoles.some((role) => userRole.equals(role))
          : userRole.equals(requiredRoles);

        // If the user doesn't have the necessary role, return forbidden
        if (!hasRequiredRole) {
          return res.status(403).json({
            message: 'Access denied. Insufficient permissions.',
          });
        }

        // Attach the user role to the request body for downstream use
        req.body.userRole = userRole;

        // Proceed to the next middleware or controller
        next();
      } catch (error) {
        // Handle any unexpected errors that might occur during token verification
        console.error('Error during token verification:', error);
        return res.status(500).json({
          message: 'An error occurred while verifying authorization',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };
  }
}

export default RoleMiddleware;
