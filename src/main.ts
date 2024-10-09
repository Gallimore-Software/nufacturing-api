import "reflect-metadata"; // Necessary for InversifyJS to work
import express from "express";
import { container } from "./infrastructure/di/container";
import { TYPES } from "./infrastructure/di/types";
import { RoleMiddleware } from "./interfaces/http/middleware/role.middleware";

const app = express();

// Example usage of middleware with DI
app.use(
  "/protected-route",
  new RoleMiddleware(
    container.get(TYPES.JWTService),
    container.get(TYPES.CheckUserRoleUseCase),
  ).handle(["admin"]), // Call the `handle` method
);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
