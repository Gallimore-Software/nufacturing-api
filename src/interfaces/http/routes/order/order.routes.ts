import * as orderController from "@interfaces/http/controllers/sales/order-controller";
import roleMiddleware from "@interfaces/http/middleware/role.middleware";
import express from "express";

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  orderController.getAllOrders,
);
router.get(
  "/:orderId",
  roleMiddleware(["admin", "manager", "user"]),
  orderController.getOrderById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  orderController.createOrder,
);
router.put(
  "/:orderId",
  roleMiddleware(["admin", "manager"]),
  orderController.updateOrder,
);
router.delete(
  "/:orderId",
  roleMiddleware(["admin"]),
  orderController.deleteOrder,
);

export default router;
