const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const roleMiddleware = require('../middleware/roleMiddlewaree');

const router = express.Router();

// Define routes with role-based access control
router.get('/', roleMiddleware(['admin', 'manager', 'user']), inventoryController.getAllInventoryItems);
router.get('/:inventoryId', roleMiddleware(['admin', 'manager', 'user']), inventoryController.getInventoryItemById);
router.post('/', roleMiddleware(['admin', 'manager']), inventoryController.createInventoryItem);
router.put('/:inventoryId', roleMiddleware(['admin', 'manager']), inventoryController.updateInventoryItem);
router.delete('/:inventoryId', roleMiddleware(['admin']), inventoryController.deleteInventoryItem);

module.exports = router;
