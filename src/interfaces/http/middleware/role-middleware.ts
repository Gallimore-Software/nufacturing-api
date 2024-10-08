import { JWTService } from "@app/services/jwt-service/jwt-service-service";
import { CheckUserRoleUseCase } from "@use-cases/user/check-user-role/check-user-role-use-case";
import { TYPES } from "@infrastructure/di/types";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";

// Extend Request interface locally for this file
interface CustomRequest extends Request {
  user?: any; // Define the `user` property with any type or a more specific type
}

@injectable()
export class RoleMiddleware {
  constructor(
    @inject(TYPES.JWTService) private jwtService: JWTService,
    @inject(TYPES.CheckUserRoleUseCase)
    private checkUserRoleUseCase: CheckUserRoleUseCase,
  ) {}

  public handle(roles: string[]) {
    return async (
      req: CustomRequest,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          res.status(401).json({ message: "Token not found" });
          return;
        }

        const decoded = this.jwtService.verifyToken(
          token,
          process.env.JWT_SECRET as string,
        );
        if (!decoded) {
          res.status(401).json({ message: "Invalid token" });
          return;
        }

        const user = await this.checkUserRoleUseCase.execute(decoded.id, roles);
        if (!user) {
          res.status(403).json({ message: "Access denied" });
          return;
        }

        req.user = user;
        next(); // No need to return after calling next()
      } catch (error: unknown) {
        if (error instanceof Error) {
          res
            .status(401)
            .json({ message: "Unauthorized", error: error.message });
        } else {
          res
            .status(401)
            .json({ message: "Unauthorized", error: "Unknown error" });
        }
      }
    };
  }
}
