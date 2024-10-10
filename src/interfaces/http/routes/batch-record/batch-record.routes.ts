import * as batchRecordsController from '@interfaces/http/controllers/batch-record/batch-record.controller';
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
  batchRecordsController.getAllBatchRecords
);
router.get(
  '/:_id',
  roleMiddleware.handle([
    new UserRole('Admin'),
    new UserRole('Manager'),
    new UserRole('User'),
  ]),
  batchRecordsController.getBatchRecordById
);
router.post(
  '/',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  batchRecordsController.createBatchRecord
);
router.put(
  '/:_id',
  roleMiddleware.handle([new UserRole('Admin'), new UserRole('Manager')]),
  batchRecordsController.updateBatchRecordById
);
router.delete(
  '/:_id',
  roleMiddleware.handle([new UserRole('Admin')]),
  batchRecordsController.deleteBatchRecordById
);

export default router;
