import express from "express";
import * as inventoryController from "@controllers/inventory/inventoryController";
import roleMiddleware from "@middleware/roleMiddleware";
import validateInventoryItem from "@middleware/validationMiddleware";

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager", "user"]),
  inventoryController.getAllInventoryItems,
);
router.get(
  "/:inventoryId",
  roleMiddleware(["admin", "manager", "user"]),
  inventoryController.getInventoryItemById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  validateInventoryItem,
  inventoryController.createInventoryItem,
);
router.put(
  "/:inventoryId",
  roleMiddleware(["admin", "manager"]),
  inventoryController.updateInventoryItem,
);
router.delete(
  "/:inventoryId",
  roleMiddleware(["admin"]),
  inventoryController.deleteInventoryItem,
);

export default router;
