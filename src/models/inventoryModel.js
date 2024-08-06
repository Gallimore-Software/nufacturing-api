const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  ingredientName: { type: String },
  pricePerKg: { type: Number },
  stockQuantity: { type: Number },
});

const inventorySchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['Nufacturing', 'Customer Supplied', 'R&D/Lab', 'Ancillary'] 
  },
  category: { 
    type: String, 
    required: true, 
    enum: ['Raw Materials', 'Capsules', 'Packaging', 'Labels', 'Finished Products'] 
  },
  subCategory: { 
    type: String 
  },  // To store information like Customer 1 in Customer Supplied Inventory
  items: [inventoryItemSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
