import * as labTestingController from "@controllers/research-and-development/labTestingController";
import roleMiddleware from "@interfaces/http/middleware/roleMiddleware";
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
