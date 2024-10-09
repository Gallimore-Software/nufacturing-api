import * as purchaseOrderController from "@interfaces/http/controllers/receiving/purchase-order-controller";
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
  purchaseOrderController.getAllPurchaseOrders,
);
router.get(
  "/:purchaseOrderId",
  roleMiddleware.handle([new UserRole("Admin"), new UserRole("Manager"), new UserRole("User")]),
  purchaseOrderController.getPurchaseOrderById,
);
router.post(
  "/",
  roleMiddleware.handle([new UserRole("Admin"), new UserRole("Manager")]),
  purchaseOrderController.createPurchaseOrder,
);
router.put(
  "/:purchaseOrderId",
  roleMiddleware.handle([new UserRole("Admin"), new UserRole("Manager")]),
  purchaseOrderController.updatePurchaseOrderById,
);
router.delete(
  "/:purchaseOrderId",
  roleMiddleware.handle([new UserRole("Admin")]),
  purchaseOrderController.deletePurchaseOrderById,
);

export default router;
