import * as quoteController from '@interfaces/http/controllers/quote/quote.controller';
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
  quoteController.getAllQuotes
);
router.get(
  '/:quoteId',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  quoteController.getQuoteById
);
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  quoteController.createQuote
);
router.put(
  '/:quoteId',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  quoteController.updateQuote
);
router.delete(
  '/:quoteId',
  roleMiddleware.handle([new UserRole('Admin')]),
  quoteController.deleteQuote
);

export default router;
