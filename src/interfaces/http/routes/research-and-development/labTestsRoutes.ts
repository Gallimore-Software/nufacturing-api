const express = require("express");
const labTestingController = require("../../controllers/research-and-development/labTestingController");
const roleMiddleware = require("../../middleware/roleMiddlewaree");

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

module.exports = router;
