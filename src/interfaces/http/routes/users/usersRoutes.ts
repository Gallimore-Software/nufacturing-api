import * as userController from "@interfaces/http/controllers/user/userController";
import roleMiddleware from "@interfaces/http/middleware/roleMiddleware";
import express from "express";

import { verifyEmail } from "../../controllers/authController";

export default function createRouter() {
  const router = express.Router();

  // Define routes with role-based access control
  router.get(
    "/all-users",
    roleMiddleware(["admin", "manager"]),
    userController.getAllUsers,
  );

  router.get(
    "/all-users/:_id",
    roleMiddleware(["admin", "manager", "user"]),
    userController.getUserById,
  );

  router.post("/create-user", userController.createUser);

  router.put(
    "/update-user/:_id",
    roleMiddleware(["admin", "manager"]),
    userController.updateUser,
  );

  router.delete(
    "/delete-user/:_id",
    roleMiddleware(["admin"]),
    userController.deleteUser,
  );

  router.get("/verify/:token", verifyEmail);

  router.post("/login", userController.loginUser);

  return router;
}
