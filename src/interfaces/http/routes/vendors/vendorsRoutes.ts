import express from "express";
import * as vendorController from "@controllers/vendors/vendorController";
import roleMiddleware from "@middleware/roleMiddleware";

const router = express.Router();

router.get(
  "/",
  roleMiddleware(["admin", "manager", "user"]),
  vendorController.getAllVendors,
);
router.get(
  "/:vendorId",
  roleMiddleware(["admin", "manager", "user"]),
  vendorController.getVendorById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  vendorController.createVendor,
);
router.put(
  "/:vendorId",
  roleMiddleware(["admin", "manager"]),
  vendorController.updateVendorById,
);
router.delete(
  "/:vendorId",
  roleMiddleware(["admin"]),
  vendorController.deleteVendorById,
);

export default router;
