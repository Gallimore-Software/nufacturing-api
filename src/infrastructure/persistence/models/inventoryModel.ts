import mongoose from "mongoose";
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
    refPath: "onModel",
  },
  onModel: {
    type: String,
    required: true,
    enum: [
      "Formula",
      "ProductSKU",
      "BatchRecords",
      "PurchaseOrder",
      "LabTest",
      "Receiving",
    ],
  },
});

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
  supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  warehouseLocation: {
    type: Schema.Types.ObjectId,
    ref: "WarehouseLocation",
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
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  type: {
    type: String,
    required: true,
    enum: ["Raw Materials", "Components", "Work in Progress", "Finished Goods"],
  },
  scientificName: { type: String },
  picture: { type: String }, // URL for image storage
  description: { type: String, required: true },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  supplier: { type: Schema.Types.ObjectId, ref: "Supplier" }, // Supplier information
  associatedFormulas: [referenceSchema],
  associatedProductSKUs: [referenceSchema],
  associatedBatchNumbers: [referenceSchema],
  associatedPOs: [referenceSchema],
  associatedLabTests: [referenceSchema],
  associatedReceivements: [referenceSchema],
  warehouseLocation: { type: Schema.Types.ObjectId, ref: "WarehouseLocation" },
  batchTracking: [batchTrackingSchema], // Tracking individual batches of the same item
  certificateOfAuthenticity: { type: String }, // Certificate storage URL
  inventoryCategory: {
    type: String,
    required: true,
    enum: ["Nufacturing", "Customer Supplied", "Research Lab", "Ancillary"],
  },
  unitOfMeasurement: { type: String, required: true }, // E.g., kg, lbs
  pricePerUnit: { type: Number, required: true },
  quantities: {
    minRestockQuantity: { type: Number, required: true },
    inStock: { type: Number, required: true },
    minOrderQuantities: [quantityPriceSchema],
    availableQuantity: { type: Number },
    onHoldQuantity: { type: Number },
    allocatedQuantity: { type: Number },
    quarantinedQuantity: { type: Number },
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Adding hooks for updating timestamps and managing stale pricing
inventoryItemSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

quantityPriceSchema.pre("save", function (next) {
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
const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);
const Category = mongoose.model("Category", categorySchema);
const Supplier = mongoose.model("Supplier", supplierSchema);
const WarehouseLocation = mongoose.model(
  "WarehouseLocation",
  warehouseLocationSchema,
);

export { InventoryItem, Category, Supplier, WarehouseLocation };
