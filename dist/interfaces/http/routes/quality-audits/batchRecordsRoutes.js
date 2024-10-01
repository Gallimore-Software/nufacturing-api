"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const batchRecordsController_1 = __importDefault(
  require("../../controllers/quality-audits/batchRecordsController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
// Define routes with role-based access control
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  batchRecordsController_1.default.getAllBatchRecords,
);
router.get(
  "/:_id",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  batchRecordsController_1.default.getBatchRecordById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  batchRecordsController_1.default.createBatchRecord,
);
router.put(
  "/:_id",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  batchRecordsController_1.default.updateBatchRecordById,
);
router.delete(
  "/:_id",
  (0, roleMiddlewaree_1.default)(["admin"]),
  batchRecordsController_1.default.deleteBatchRecordById,
);
module.exports = router;
//# sourceMappingURL=batchRecordsRoutes.js.map
