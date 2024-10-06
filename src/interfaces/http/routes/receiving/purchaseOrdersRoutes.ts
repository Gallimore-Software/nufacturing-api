import * as purchaseOrderController from "@controllers/receiving/purchaseOrderController";
import roleMiddleware from "@interfaces/http/middleware/roleMiddleware";
import express from "express";

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  purchaseOrderController.getAllPurchaseOrders,
);
router.get(
  "/:purchaseOrderId",
  roleMiddleware(["admin", "manager", "user"]),
  purchaseOrderController.getPurchaseOrderById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  purchaseOrderController.createPurchaseOrder,
);
router.put(
  "/:purchaseOrderId",
  roleMiddleware(["admin", "manager"]),
  purchaseOrderController.updatePurchaseOrderById,
);
router.delete(
  "/:purchaseOrderId",
  roleMiddleware(["admin"]),
  purchaseOrderController.deletePurchaseOrderById,
);

export default router;
