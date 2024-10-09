import * as vendorController from "@interfaces/http/controllers/vendors/vendor-controller";
import roleMiddleware from "@interfaces/http/middleware/role.middleware";
import express from "express";

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
