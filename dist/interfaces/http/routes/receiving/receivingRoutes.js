"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const receivingController_1 = __importDefault(
  require("../../../../controllers/receiving-controller/receivingController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
// Define routes with role-based access control
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  receivingController_1.default.getAllReceivings,
);
router.get(
  "/:receivingId",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  receivingController_1.default.getReceivingById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  receivingController_1.default.createReceiving,
);
router.put(
  "/:receivingId",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  receivingController_1.default.updateReceivingById,
);
router.delete(
  "/:receivingId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  receivingController_1.default.deleteReceiving,
);
module.exports = router;
//# sourceMappingURL=receivingRoutes.js.map
