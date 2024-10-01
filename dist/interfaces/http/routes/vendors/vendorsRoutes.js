"use strict";
const express = require("express");
const vendorController = require("../../../../controllers/vendorController");
const roleMiddleware = require("../middleware/roleMiddlewaree");
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
module.exports = router;
//# sourceMappingURL=vendorsRoutes.js.map
