"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerController_1 = __importDefault(
  require("../../controllers/sales-controller/customerController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
// Define routes with role-based access control
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  customerController_1.default.getAllCustomers,
);
router.get(
  "/:labTestId",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  customerController_1.default.getCustomerById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  customerController_1.default.createCustomer,
);
router.put(
  "/:labTestId",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  customerController_1.default.updateCustomer,
);
router.delete(
  "/:labTestId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  customerController_1.default.deleteCustomer,
);
module.exports = router;
//# sourceMappingURL=customersRoutes.js.map
