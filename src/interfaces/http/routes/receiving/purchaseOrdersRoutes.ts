import express from "express";
import purchaseOrderController from "../../../../controllers/receiving-controller/purchaseOrderController";
import roleMiddleware from "../../middleware/roleMiddlewaree";

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

module.exports = router;
