import * as productSkuController from '@interfaces/http/controllers/product-development/product-sku-controller';
import RoleMiddleware from '@interfaces/http/middleware/role.middleware'; // Import the class, not default instance
import express from 'express';
import { container } from '@infrastructure/di/container'; // Assuming you are using a DI container like Inversify
import { UserRole } from '@domain/entities/user/user-role';

const router = express.Router();

// Instantiate the RoleMiddleware class via DI container
const roleMiddleware = container.resolve(RoleMiddleware);

// Define routes with role-based access control
router.get(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  productSkuController.getAllProductSKUs
);
router.get(
  '/:skuId',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  productSkuController.getProductSKUById
);
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  productSkuController.createProductSKU
);
router.put(
  '/:skuId',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  productSkuController.updateProductSKU
);
router.delete(
  '/:skuId',
  roleMiddleware.handle([new UserRole('Admin')]),
  productSkuController.deleteProductSKU
);

export default router;
