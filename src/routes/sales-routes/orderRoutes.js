const express = require('express');
const orderController = require('../../controllers/sales-controller/orderController');
const roleMiddleware = require('../../middleware/roleMiddlewaree');

const router = express.Router();

// Define routes with role-based access control
router.get('/', roleMiddleware(['admin', 'manager']), orderController.getAllOrders);
router.get('/:orderId', roleMiddleware(['admin', 'manager', 'user']), orderController.getOrderById);
router.post('/', roleMiddleware(['admin', 'manager']), orderController.createOrder);
router.put('/:orderId', roleMiddleware(['admin', 'manager']), orderController.updateOrder);
router.delete('/:orderId', roleMiddleware(['admin']), orderController.deleteOrder);

module.exports = router;