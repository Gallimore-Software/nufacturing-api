const express = require("express");
const productSkuController = require("../../controllers/product-development-controller/productSkuController");
const roleMiddleware = require("../../middleware/roleMiddlewaree");

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  productSkuController.getAllProductSKUs,
);
router.get(
  "/:skuId",
  roleMiddleware(["admin", "manager", "user"]),
  productSkuController.getProductSKUById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  productSkuController.createProductSKU,
);
router.put(
  "/:skuId",
  roleMiddleware(["admin", "manager"]),
  productSkuController.updateProductSKU,
);
router.delete(
  "/:skuId",
  roleMiddleware(["admin"]),
  productSkuController.deleteProductSKU,
);

module.exports = router;
