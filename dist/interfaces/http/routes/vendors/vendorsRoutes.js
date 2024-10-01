"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendorController_1 = __importDefault(
  require("../../../../controllers/vendorController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  vendorController_1.default.getAllVendors,
);
router.get(
  "/:vendorId",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  vendorController_1.default.getVendorById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  vendorController_1.default.createVendor,
);
router.put(
  "/:vendorId",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  vendorController_1.default.updateVendorById,
);
router.delete(
  "/:vendorId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  vendorController_1.default.deleteVendorById,
);
module.exports = router;
//# sourceMappingURL=vendorsRoutes.js.map
