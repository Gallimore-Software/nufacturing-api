import * as formulaController from '@interfaces/http/controllers/formula/formula.controller';
import RoleMiddleware from '@interfaces/http/middleware/role.middleware'; // Import the class, not default instance
import express from 'express';
import { container } from '@infrastructure/di/container'; // Assuming you are using a DI container like Inversify
import { UserRole } from '@domain/entities/user/user-role';

const router = express.Router();

// Instantiate the RoleMiddleware class via DI container
const roleMiddleware = container.resolve(RoleMiddleware);

router.get(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]), // Call the handle method with the roles array
  formulaController.getAllFormulas
);

router.get(
  '/:entity_id',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  formulaController.getFormulaById
);

router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  formulaController.createFormula
);

router.put(
  '/:entity_id',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  formulaController.updateFormula
);

router.delete(
  '/:entity_id',
  roleMiddleware.handle([new UserRole('Admin')]),
  formulaController.deleteFormula
);

export default router;
