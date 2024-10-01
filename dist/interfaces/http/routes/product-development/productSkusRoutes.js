"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productSkuController_1 = __importDefault(
  require("../../controllers/product-development-controller/productSkuController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
// Define routes with role-based access control
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  productSkuController_1.default.getAllProductSKUs,
);
router.get(
  "/:skuId",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  productSkuController_1.default.getProductSKUById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  productSkuController_1.default.createProductSKU,
);
router.put(
  "/:skuId",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  productSkuController_1.default.updateProductSKU,
);
router.delete(
  "/:skuId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  productSkuController_1.default.deleteProductSKU,
);
module.exports = router;
//# sourceMappingURL=productSkusRoutes.js.map
