const express = require("express");
const batchRecordsController = require("../../controllers/quality-audits-controller/batchRecordsController");
const roleMiddleware = require("../../middleware/roleMiddlewaree");

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  batchRecordsController.getAllBatchRecords,
);
router.get(
  "/:labTestId",
  roleMiddleware(["admin", "manager", "user"]),
  batchRecordsController.getBatchRecordById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  batchRecordsController.createBatchRecord,
);
router.put(
  "/:labTestId",
  roleMiddleware(["admin", "manager"]),
  batchRecordsController.updateBatchRecordById,
);
router.delete(
  "/:labTestId",
  roleMiddleware(["admin"]),
  batchRecordsController.deleteBatchRecordById,
);

module.exports = router;
