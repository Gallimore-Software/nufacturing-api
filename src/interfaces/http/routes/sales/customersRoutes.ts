import express from "express";
import customerController from "../../controllers/sales-controller/customerController";
import roleMiddleware from "../../middleware/roleMiddlewaree";

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
