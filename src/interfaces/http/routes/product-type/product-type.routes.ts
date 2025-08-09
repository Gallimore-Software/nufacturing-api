import * as productTypeController from '@interfaces/http/controllers/product-type/product-type.controller';
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
  productTypeController.getAllProductTypes as unknown as express.RequestHandler
);
router.get(
  '/:typeId',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  productTypeController.getProductTypeById as unknown as express.RequestHandler
);
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin')]),
  productTypeController.createProductType as unknown as express.RequestHandler
);
router.put(
  '/:typeId',
  roleMiddleware.handle([new UserRole('Admin')]),
  productTypeController.updateProductType as unknown as express.RequestHandler
);
router.delete(
  '/:typeId',
  roleMiddleware.handle([new UserRole('Admin')]),
  productTypeController.deleteProductType as unknown as express.RequestHandler
);

export default router;
