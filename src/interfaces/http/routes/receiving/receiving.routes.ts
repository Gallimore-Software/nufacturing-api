import * as receivingController from '@interfaces/http/controllers/receiving/receiving.controller';
import RoleMiddleware from '@interfaces/http/middleware/role.middleware';
import express from 'express';
import { container } from '@infrastructure/di/container';
import { UserRole } from '@domain/entities/user/user-role';

// Define the router
const router = express.Router();

// Instantiate the RoleMiddleware class via DI container
const roleMiddleware = container.resolve(RoleMiddleware);

// Define routes with role-based access control

// GET all receiving records
router.get(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  receivingController.getAllReceivements
);

// GET a receiving record by ID
router.get(
  '/:receivingId',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  receivingController.getReceivingById
);

// POST a new receiving record
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  receivingController.createReceiving
);

// PUT (update) a receiving record by ID
router.put(
  '/:receivingId',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  receivingController.updateReceivingById
);

// DELETE a receiving record by ID
router.delete(
  '/:receivingId',
  roleMiddleware.handle([new UserRole('Admin')]),
  receivingController.deleteReceiving
);

export default router;
