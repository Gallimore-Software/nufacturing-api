const express = require('express');
const userController = require('../controllers/userController');
const { verifyEmail } = require('../controllers/authController');


const router = express.Router();

router.get('/all-users', userController.getAllUsers);
router.get('/all-users/:_id', userController.getUserById);
router.post('/create-user', userController.createUser);
router.put('/update-user/:_id', userController.updateUser);
router.delete('/delete-user/:_id', userController.deleteUser);
router.get('/verify/:token', verifyEmail);
router.post('/login', userController.loginUser);


module.exports = router; 