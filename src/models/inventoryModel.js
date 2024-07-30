const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Raw Materials', 'Capsules', 'Packaging', 'Labels', 'Finished Products'] },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  supplier: { type: String },
  pricePerUnit: { type: Number },
  reorderLevel: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const InventoryItem = mongoose.model('InventoryItem', inventorySchema);

module.exports = InventoryItem;