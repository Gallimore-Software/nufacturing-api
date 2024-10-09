import * as labTestingController from "@interfaces/http/controllers/research-and-development/lab-test-controller";
import roleMiddleware from "@interfaces/http/middleware/role.middleware";
import express from "express";

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  labTestingController.getAllLabTests,
);
router.get(
  "/:labTestId",
  roleMiddleware(["admin", "manager", "user"]),
  labTestingController.getLabTestById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  labTestingController.createLabTest,
);
router.put(
  "/:labTestId",
  roleMiddleware(["admin", "manager"]),
  labTestingController.updateLabTest,
);
router.delete(
  "/:labTestId",
  roleMiddleware(["admin"]),
  labTestingController.deleteLabTest,
);

export default router;
