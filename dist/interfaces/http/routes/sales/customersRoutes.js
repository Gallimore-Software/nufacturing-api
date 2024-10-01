"use strict";
const express = require("express");
const customerController = require("../../controllers/sales-controller/customerController");
const roleMiddleware = require("../../middleware/roleMiddlewaree");
const router = express.Router();
// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  customerController.getAllCustomers,
);
router.get(
  "/:labTestId",
  roleMiddleware(["admin", "manager", "user"]),
  customerController.getCustomerById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  customerController.createCustomer,
);
router.put(
  "/:labTestId",
  roleMiddleware(["admin", "manager"]),
  customerController.updateCustomer,
);
router.delete(
  "/:labTestId",
  roleMiddleware(["admin"]),
  customerController.deleteCustomer,
);
module.exports = router;
//# sourceMappingURL=customersRoutes.js.map
