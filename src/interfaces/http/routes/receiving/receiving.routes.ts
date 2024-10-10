import * as receivingController from '@interfaces/http/controllers/receiving/receiving.controller';
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
  receivingController.getAllReceivements
);
router.get(
  '/:receivingId',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  receivingController.getReceivingById
);
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  receivingController.createReceiving
);
router.put(
  '/:receivingId',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  receivingController.updateReceivingById
);
router.delete(
  '/:receivingId',
  roleMiddleware.handle([new UserRole('Admin')]),
  receivingController.deleteReceiving
);

export default router;
