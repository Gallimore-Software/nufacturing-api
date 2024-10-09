import { JWTService } from "@app/services/jwt-service/jwt-service-service";
import { CheckUserRoleUseCase } from "@use-cases/user/check-user-role/check-user-role.use-case";
import { TYPES } from "@infrastructure/di/types";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "@domain/entities/user/user-role";

@injectable()
export class RoleMiddleware {
  constructor(
    @inject(TYPES.JWTService) private jwtService: JWTService,
    @inject(TYPES.CheckUserRoleUseCase)
    private checkUserRoleUseCase: CheckUserRoleUseCase,
  ) {}

  public handle(roles: UserRole[] | UserRole) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        // Check for Authorization header and extract token
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          res.status(401).json({ message: "Authorization token missing or malformed" });
          return;
        }

        const token = authHeader.split(" ")[1];

        // Verify token and get decoded user information
        const decoded = this.jwtService.verifyToken(token, process.env.JWT_SECRET as string);
        if (!decoded) {
          res.status(401).json({ message: "Invalid or expired token" });
          return;
        }

        // Check if the user has one of the required roles
        const user = await this.checkUserRoleUseCase.execute(decoded.id, roles);
        if (!user) {
          res.status(403).json({ message: "Access denied. You do not have the required role." });
          return;
        }

        // Pass user to the request body for later use in the pipeline
        req.body.user = user;
        next();
      } catch (error) {
        // Error handling
        res.status(500).json({
          message: "An error occurred while verifying authorization",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    };
  }
}

export default RoleMiddleware;
