import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Lot schema
const lotSchema = new Schema({
  lotCode: { type: String, required: true, unique: true }, // Unique identifier for the lot
  batchRecord: {
    type: Schema.Types.ObjectId,
    ref: 'BatchRecord',
    required: true,
  }, // Reference to the Batch Record
  inventoryItem: {
    type: Schema.Types.ObjectId,
    ref: 'InventoryItem',
    required: true,
  }, // Reference to the Inventory Item (e.g., Raw Materials, Finished Goods)
  productSKU: {
    type: Schema.Types.ObjectId,
    ref: 'ProductSKU',
    required: true,
  }, // Reference to the Product SKU
  formula: { type: Schema.Types.ObjectId, ref: 'Formula', required: true }, // Reference to the Formula used
  productionDate: { type: Date, required: true }, // Date of production
  expirationDate: { type: Date, required: true }, // Expiration date of the lot
  quantityProduced: { type: Number, required: true }, // Quantity produced in the lot
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Quarantined', 'Failed'],
    default: 'In Progress',
  }, // Current status of the lot
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the lot
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware for updating timestamps on save
lotSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create the Lot model
const Lot = mongoose.model('Lot', lotSchema);

export default Lot;
