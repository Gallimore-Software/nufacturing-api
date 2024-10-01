"use strict";
const express = require("express");
const batchRecordsController = require("../../controllers/quality-audits/batchRecordsController");
const roleMiddleware = require("../../middleware/roleMiddlewaree");
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
//# sourceMappingURL=batchRecordsRoutes.js.map
