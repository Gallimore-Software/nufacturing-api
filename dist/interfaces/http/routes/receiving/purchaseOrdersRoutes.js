"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseOrderController_1 = __importDefault(
  require("../../../../controllers/receiving-controller/purchaseOrderController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
// Define routes with role-based access control
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  purchaseOrderController_1.default.getAllPurchaseOrders,
);
router.get(
  "/:purchaseOrderId",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  purchaseOrderController_1.default.getPurchaseOrderById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  purchaseOrderController_1.default.createPurchaseOrder,
);
router.put(
  "/:purchaseOrderId",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  purchaseOrderController_1.default.updatePurchaseOrderById,
);
router.delete(
  "/:purchaseOrderId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  purchaseOrderController_1.default.deletePurchaseOrderById,
);
module.exports = router;
//# sourceMappingURL=purchaseOrdersRoutes.js.map
