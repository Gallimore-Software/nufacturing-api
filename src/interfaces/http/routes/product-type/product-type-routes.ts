import * as productTypeController from "@interfaces/http/controllers/product-development/product-type-controller";
import roleMiddleware from "@interfaces/http/middleware/role-middleware";
import express from "express";

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  productTypeController.getAllProductTypes,
);
router.get(
  "/:typeId",
  roleMiddleware(["admin", "manager", "user"]),
  productTypeController.getProductTypeById,
);
router.post(
  "/",
  roleMiddleware(["admin"]),
  productTypeController.createProductType,
);
router.put(
  "/:typeId",
  roleMiddleware(["admin"]),
  productTypeController.updateProductType,
);
router.delete(
  "/:typeId",
  roleMiddleware(["admin"]),
  productTypeController.deleteProductType,
);

export default router;
