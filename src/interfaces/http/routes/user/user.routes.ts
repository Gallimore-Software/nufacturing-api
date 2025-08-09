import { Router } from 'express';
import { UserController } from '@interfaces/http/controllers/user/user.controller';

const router = Router();

// Route to create a user
router.post('/', UserController.createUser);

// Route to get all users
router.get('/', UserController.getAllUsers);

// Route to get a user by ID
router.get('/:id', UserController.getUserById);

// Route to update a user
router.put('/:id', UserController.updateUser);

// Route to delete a user
router.delete('/:id', UserController.deleteUser);

export default router;
