import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define schemas for new entities
const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const supplierSchema = new Schema({
  name: { type: String, required: true },
  contactInformation: { type: String },
});

const warehouseLocationSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  capacity: { type: Number },
});

// Define reference and pricing schemas for inventory details
const referenceSchema = new Schema({
  refId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel',
  },
  onModel: {
    type: String,
    required: true,
    enum: [
      'Formula',
      'ProductSKU',
      'BatchRecords',
      'PurchaseOrder',
      'LabTest',
      'Receiving',
    ],
  },
});

const workInProgressSchema = new Schema({
  wipId: { type: String, required: true }, // Unique WIP ID
  productName: { type: String, required: true }, // Name of the product in production
  batchId: { type: String, required: true }, // Link to the Batch ID
  lotId: { type: String, required: true }, // Link to Lot ID (optional but helpful)
  stageOfProduction: {
    type: String,
    required: true,
    enum: ['Bottling', 'Labeling', 'Packaging', 'Quality Control'],
  }, // Stage in production
  quantityInProgress: { type: Number, required: true }, // Number of units being produced
  costToDate: { type: Number, required: true }, // Accumulated cost for production (materials, labor, etc.)
  estimatedCompletionDate: { type: Date, required: true }, // Projected completion date
  workOrderId: { type: String, required: true }, // Work Order ID related to this WIP batch
  leadTimeRemaining: { type: String }, // Time remaining to complete production
  operator: { type: Schema.Types.ObjectId, ref: 'User' }, // Operator or team responsible for this WIP batch
  status: {
    type: String,
    required: true,
    enum: ['In Progress', 'Delayed', 'Completed'],
  }, // Status of the WIP
});

// Export the schema to ensure it's available
export const WorkInProgress = mongoose.model(
  'WorkInProgress',
  workInProgressSchema
);

const quantityPriceSchema = new Schema({
  minOrderQuantity: { type: Number, required: true },
  pricePerQuantity: { type: Number, required: true },
  dateUpdated: { type: Date, default: Date.now },
  isStale: { type: Boolean, default: false },
});

// Batch Tracking Schema for tracking groups by date
const batchTrackingSchema = new Schema({
  lotCode: { type: String, required: true },
  dateReceived: { type: Date, required: true },
  quantity: { type: Number, required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  warehouseLocation: {
    type: Schema.Types.ObjectId,
    ref: 'WarehouseLocation',
    required: true,
  },
  allocatedQuantity: { type: Number, default: 0 },
  availableQuantity: { type: Number, required: true },
});

// Define the main Inventory Item schema
const inventoryItemSchema = new Schema({
  itemId: { type: String, required: true, unique: true }, // Unique identifier (e.g., UUID)
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  type: {
    type: String,
    required: true,
    enum: ['Raw Materials', 'Components', 'Work in Progress', 'Finished Goods'],
  },
  scientificName: { type: String },
  picture: { type: String }, // URL for image storage
  description: { type: String, required: true },
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' }, // Supplier information
  associatedFormulas: [referenceSchema],
  associatedProductSKUs: [referenceSchema],
  associatedBatchNumbers: [referenceSchema],
  associatedPOs: [referenceSchema],
  associatedLabTests: [referenceSchema],
  associatedReceivements: [referenceSchema],
  warehouseLocation: { type: Schema.Types.ObjectId, ref: 'WarehouseLocation' },
  batchTracking: [batchTrackingSchema], // Tracking individual batches of the same item
  wipTracking: [workInProgressSchema], // Tracking work in progress batches
  certificateOfAuthenticity: { type: String }, // Certificate storage URL
  inventoryCategory: {
    type: String,
    required: true,
    enum: ['Nufacturing', 'Customer Supplied', 'Research Lab', 'Ancillary'],
  },
  unitOfMeasurement: { type: String, required: true }, // E.g., kg, lbs
  pricePerUnit: { type: Number, required: true },
  // New Field: Selling Price
  sellingPrice: { type: Number }, // Selling price for finished goods
  // New Field: Expiration Date
  expirationDate: { type: Date }, // Expiration date for materials and finished goods
  quantities: {
    minRestockQuantity: { type: Number, required: true },
    inStock: { type: Number, required: true },
    availableQuantity: { type: Number },
    onHoldQuantity: { type: Number },
    allocatedQuantity: { type: Number },
    quarantinedQuantity: { type: Number },
    // New Field: Reorder Level
    reorderLevel: { type: Number }, // Reorder threshold for replenishment
    // New Field: Reserved for Order ID
    reservedForOrderId: { type: String }, // Linked to the sales or production order
    // New Field: Order Allocation Details
    orderAllocationDetails: { type: Map, of: Number }, // Detailed order allocation
  },
  // New Field: Status
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Adding hooks for updating timestamps and managing stale pricing
inventoryItemSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

quantityPriceSchema.pre('save', function (next) {
  // Ensure dateUpdated is a Date object
  const currentTime = Date.now();
  const dateUpdatedTime = this.dateUpdated ? this.dateUpdated.getTime() : 0;

  if (currentTime - dateUpdatedTime > 30 * 24 * 60 * 60 * 1000) {
    // Logic for marking price as stale (e.g., flag in UI)
    this.isStale = true;
  }
  next();
});

// Create models for the main inventory and related entities
const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
const Category = mongoose.model('Category', categorySchema);
const Supplier = mongoose.model('Supplier', supplierSchema);
const WarehouseLocation = mongoose.model(
  'WarehouseLocation',
  warehouseLocationSchema
);

export { InventoryItem, Category, Supplier, WarehouseLocation };
