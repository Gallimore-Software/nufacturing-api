import express from "express";
import batchRecordsController from "../../controllers/quality-audits/batchRecordsController";
import roleMiddleware from "../../middleware/roleMiddlewaree";

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  batchRecordsController.getAllBatchRecords,
);
router.get(
  "/:_id",
  roleMiddleware(["admin", "manager", "user"]),
  batchRecordsController.getBatchRecordById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  batchRecordsController.createBatchRecord,
);
router.put(
  "/:_id",
  roleMiddleware(["admin", "manager"]),
  batchRecordsController.updateBatchRecordById,
);
router.delete(
  "/:_id",
  roleMiddleware(["admin"]),
  batchRecordsController.deleteBatchRecordById,
);

module.exports = router;
