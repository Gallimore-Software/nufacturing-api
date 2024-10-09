import * as orderController from "@interfaces/http/controllers/sales/order-controller";
import RoleMiddleware from "@interfaces/http/middleware/role.middleware"; // Import the class, not default instance
import express from "express";
import { container } from "@infrastructure/di/container"; // Assuming you are using a DI container like Inversify
import { UserRole } from "@domain/entities/user/user-role";

const router = express.Router();

// Instantiate the RoleMiddleware class via DI container
const roleMiddleware = container.resolve(RoleMiddleware);

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware.handle([new UserRole("Admin"), new UserRole("Manager")]),
  orderController.getAllOrders,
);
router.get(
  "/:orderId",
  roleMiddleware.handle([new UserRole("Admin"), new UserRole("Manager"), new UserRole("User")]),
  orderController.getOrderById,
);
router.post(
  "/",
  roleMiddleware.handle([new UserRole("Admin"), new UserRole("Manager")]),
  orderController.createOrder,
);
router.put(
  "/:orderId",
  roleMiddleware.handle([new UserRole("Admin"), new UserRole("Manager")]),
  orderController.updateOrder,
);
router.delete(
  "/:orderId",
  roleMiddleware.handle([new UserRole("Admin")]),
  orderController.deleteOrder,
);

export default router;
