import express from "express";
import * as receivingController from "@controllers/receiving/receivingController";
import roleMiddleware from "@interfaces/http/middleware/roleMiddleware";

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

export default router;
