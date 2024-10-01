import express from "express";
import * as productTypeController from "@controllers/product-development/productTypeController";
import roleMiddleware from "@middleware/roleMiddleware";

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

module.exports = router;
