import * as vendorController from '@interfaces/http/controllers/vendor/vendor.controller';
import RoleMiddleware from '@interfaces/http/middleware/role.middleware'; // Import the class, not default instance
import express from 'express';
import { container } from '@infrastructure/di/container'; // Assuming you are using a DI container like Inversify
import { UserRole } from '@domain/entities/user/user-role';

const router = express.Router();

// Instantiate the RoleMiddleware class via DI container
const roleMiddleware = container.resolve(RoleMiddleware);

router.get(
  '/',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  vendorController.getAllVendors
);
router.get(
  '/:vendorId',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  vendorController.getVendorById
);
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  vendorController.createVendor
);
router.put(
  '/:vendorId',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  vendorController.updateVendorById
);
router.delete(
  '/:vendorId',
  roleMiddleware.handle([new UserRole('Admin')]),
  vendorController.deleteVendorById
);

export default router;
