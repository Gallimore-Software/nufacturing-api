"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productTypeController_1 = __importDefault(
  require("../../../../controllers/product-development-controller/productTypeController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
// Define routes with role-based access control
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  productTypeController_1.default.getAllProductTypes,
);
router.get(
  "/:typeId",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  productTypeController_1.default.getProductTypeById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin"]),
  productTypeController_1.default.createProductType,
);
router.put(
  "/:typeId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  productTypeController_1.default.updateProductType,
);
router.delete(
  "/:typeId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  productTypeController_1.default.deleteProductType,
);
module.exports = router;
//# sourceMappingURL=productTypesRoutes.js.map
