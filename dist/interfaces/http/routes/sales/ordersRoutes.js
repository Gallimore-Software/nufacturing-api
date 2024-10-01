"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = __importDefault(
  require("../../controllers/sales-controller/orderController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
// Define routes with role-based access control
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  orderController_1.default.getAllOrders,
);
router.get(
  "/:orderId",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  orderController_1.default.getOrderById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  orderController_1.default.createOrder,
);
router.put(
  "/:orderId",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  orderController_1.default.updateOrder,
);
router.delete(
  "/:orderId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  orderController_1.default.deleteOrder,
);
module.exports = router;
//# sourceMappingURL=ordersRoutes.js.map
