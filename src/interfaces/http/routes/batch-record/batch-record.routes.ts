import * as batchRecordsController from "@interfaces/http/controllers/batch-record/batch-record.controller";
import roleMiddleware from "@interfaces/http/middleware/role.middleware";
import express from "express";

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

export default router;
