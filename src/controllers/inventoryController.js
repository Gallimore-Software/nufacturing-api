const InventoryItem = require('../models/inventoryModel');

// Get all inventory items
exports.getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.status(200).json(inventoryItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory items', error: err });
  }
};

// Get inventory item by ID
exports.getInventoryItemById = async (req, res) => {
  try {
    const inventoryItem = await InventoryItem.findById(req.params.inventoryId);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json(inventoryItem);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory item', error: err });
  }
};

// Create a new inventory item
exports.createInventoryItem = async (req, res) => {
  try {
    const newInventoryItem = new InventoryItem(req.body);
    await newInventoryItem.save();
    res.status(201).json(newInventoryItem);
  } catch (err) {
    res.status(400).json({ message: 'Error creating inventory item', error: err });
  }
};

// Update inventory item
exports.updateInventoryItem = async (req, res) => {
  try {
    const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(req.params.inventoryId, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedInventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json(updatedInventoryItem);
  } catch (err) {
    res.status(400).json({ message: 'Error updating inventory item', error: err });
  }
};

// Delete inventory item
exports.deleteInventoryItem = async (req, res) => {
  try {
    const deletedInventoryItem = await InventoryItem.findByIdAndDelete(req.params.inventoryId);
    if (!deletedInventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inventory item', error: err });
  }
};
