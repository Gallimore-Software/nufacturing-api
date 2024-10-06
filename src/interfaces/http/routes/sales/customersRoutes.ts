import * as customerController from "@controllers/sales/customerController";
import roleMiddleware from "@interfaces/http/middleware/roleMiddleware";
import express from "express";

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

export default router;
