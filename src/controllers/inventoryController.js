const Inventory = require('../models/inventoryModel');
const Joi = require('joi');

// Joi validation schema
const inventorySchema = Joi.object({
  type: Joi.string().valid('Nufacturing', 'Customer Supplied', 'R&D/Lab', 'Ancillary').required(),
  category: Joi.string().valid('Raw Materials', 'Capsules', 'Packaging', 'Labels', 'Finished Products').required(),
  subCategory: Joi.string().optional(),
  items: Joi.array().items(Joi.object({
    ingredientName: Joi.string().required(),
    pricePerKg: Joi.number().required(),
    stockQuantity: Joi.number().required()
  })).required()
});

// Get all inventory items
exports.getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json(inventoryItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory items', error: err });
  }
};

// Get inventory item by ID
exports.getInventoryItemById = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.inventoryId);
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
    // Validate request body
    const { error } = inventorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation error', error: error.details });
    }

    const { type, category, subCategory, items } = req.body;

    // Create a new inventory entry
    const newInventory = new Inventory({
      type,
      category,
      subCategory,
      items,
      createdBy: req.user._id
    });

    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (err) {
    res.status(400).json({ message: 'Error creating inventory item', error: err });
  }
};

// Update inventory item
exports.updateInventoryItem = async (req, res) => {
  try {
    // Validate request body
    const { error } = inventorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation error', error: error.details });
    }

    const { type, category, subCategory, items } = req.body;

    const updatedInventoryItem = await Inventory.findByIdAndUpdate(
      req.params.inventoryId,
      {
        type,
        category,
        subCategory,
        items
      },
      {
        new: true,
        runValidators: true
      }
    );

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
    const deletedInventoryItem = await Inventory.findByIdAndDelete(req.params.inventoryId);
    if (!deletedInventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inventory item', error: err });
  }
};
