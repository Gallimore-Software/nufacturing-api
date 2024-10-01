"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const labTestingController_1 = __importDefault(
  require("../../controllers/research-and-development/labTestingController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
// Define routes with role-based access control
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  labTestingController_1.default.getAllLabTests,
);
router.get(
  "/:labTestId",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  labTestingController_1.default.getLabTestById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  labTestingController_1.default.createLabTest,
);
router.put(
  "/:labTestId",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  labTestingController_1.default.updateLabTest,
);
router.delete(
  "/:labTestId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  labTestingController_1.default.deleteLabTest,
);
module.exports = router;
//# sourceMappingURL=labTestsRoutes.js.map
