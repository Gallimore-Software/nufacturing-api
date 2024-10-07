import * as productSkuController from "@interfaces/http/controllers/product-development/product-sku-controller";
import roleMiddleware from "@interfaces/http/middleware/role-middleware";
import express from "express";

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

export default router;
