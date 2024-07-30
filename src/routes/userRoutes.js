const express = require('express');
const userController = require('../controllers/userController');
const { verifyEmail } = require('../controllers/authController');
const roleMiddleware = require('../middleware/roleMiddlewaree');

const router = express.Router();

// Define routes with role-based access control
router.get('/all-users', roleMiddleware(['admin', 'manager']), userController.getAllUsers);
router.get('/all-users/:_id', roleMiddleware(['admin', 'manager', 'user']), userController.getUserById);
router.post('/create-user', roleMiddleware(['admin']), userController.createUser);
router.put('/update-user/:_id', roleMiddleware(['admin', 'manager']), userController.updateUser);
router.delete('/delete-user/:_id', roleMiddleware(['admin']), userController.deleteUser);
router.get('/verify/:token', verifyEmail);
router.post('/login', userController.loginUser);

module.exports = router;
