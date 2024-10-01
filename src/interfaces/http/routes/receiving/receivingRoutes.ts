import express from "express";
import receivingController from "../../../../controllers/receiving-controller/receivingController";
import roleMiddleware from "../../middleware/roleMiddlewaree";

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  receivingController.getAllReceivings,
);
router.get(
  "/:receivingId",
  roleMiddleware(["admin", "manager", "user"]),
  receivingController.getReceivingById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  receivingController.createReceiving,
);
router.put(
  "/:receivingId",
  roleMiddleware(["admin", "manager"]),
  receivingController.updateReceivingById,
);
router.delete(
  "/:receivingId",
  roleMiddleware(["admin"]),
  receivingController.deleteReceiving,
);

module.exports = router;
