import inventoryController from '@interfaces/http/controllers/inventory/inventory-controller';
import { roleMiddleware } from '@interfaces/http/middleware/role.middleware';
import validateInventoryItem from '@interfaces/http/middleware/validation.middleware';
import express from 'express';

const router = express.Router();

// Define routes with role-based access control
router.get(
  '/',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  inventoryController.getAllInventoryItems
);
router.get(
  '/:inventoryId',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  inventoryController.getInventoryItemById
);
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  validateInventoryItem,
  inventoryController.createInventoryItem
);
router.put(
  '/:inventoryId',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  inventoryController.updateInventoryItem
);
router.delete(
  '/:inventoryId',
  roleMiddleware.handle([new UserRole('Admin')]),
  inventoryController.deleteInventoryItem
);

export default router;
