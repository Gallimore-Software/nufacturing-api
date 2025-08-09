import * as labTestingController from '@interfaces/http/controllers/lab-test/lab-test.controller';
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
  labTestingController.getAllLabTests
);
router.get(
  '/:labTestId',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  labTestingController.getLabTestById
);
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  labTestingController.createLabTest
);
router.put(
  '/:labTestId',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  labTestingController.updateLabTest
);
router.delete(
  '/:labTestId',
  roleMiddleware.handle([new UserRole('Admin')]),
  labTestingController.deleteLabTest
);

export default router;
