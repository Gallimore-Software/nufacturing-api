import * as customerController from '@interfaces/http/controllers/customer/customer.controller';
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
  customerController.getAllCustomers
);
router.get(
  '/:customerId',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  customerController.getCustomerById
);
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  customerController.createCustomer
);
router.put(
  '/:customerId',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  customerController.updateCustomer
);
router.delete(
  '/:customerId',
  roleMiddleware.handle([new UserRole('Admin')]),
  customerController.deleteCustomer
);

export default router;
