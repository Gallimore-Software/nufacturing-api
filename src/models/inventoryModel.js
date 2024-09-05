const mongoose = require("mongoose");

// Define the sub-schemas for references and associated entities
const referenceSchema = new mongoose.Schema({
  refId: {
    type: mongoose.Schema.Types.ObjectId,
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

const quantityPriceSchema = new mongoose.Schema({
  minOrderQuantity: { type: Number, required: true },
  pricePerQuantity: { type: Number, required: true },
});

// Define the main Inventory Item schema
const inventoryItemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  scientificName: { type: String },
  picture: { type: String }, // Assuming Cloudinary URL or another storage path
  description: { type: String, required: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  associatedFormulas: [referenceSchema],
  associatedProductSKUs: [referenceSchema],
  associatedBatchNumbers: [referenceSchema],
  associatedPOs: [referenceSchema],
  associatedLabTests: [referenceSchema],
  associatedReceivements: [referenceSchema],
  certificateOfAuthenticity: { type: String }, // Assuming Cloudinary URL or another storage path
  inventoryCategory: {
    type: String,
    required: true,
    enum: ["Nufacturing", "Customer Supplied", "Research Lab", "Ancillary"],
  },
  type: {
    type: String,
    required: true,
    enum: ["Raw Materials", "Components", "Work in Progress", "Finished Goods"],
  },
  lotCode: { type: String, required: true },
  unitOfMeasurement: { type: String, required: true }, // e.g., kg, lbs
  pricePerUnit: { type: Number, required: true },
  quantities: {
    minRestockQuantity: { type: Number, required: true },
    inStock: { type: Number, required: true },
    minOrderQuantities: [quantityPriceSchema],
    availableQuantity: { type: Number },
    onHoldQuantity: { type: Number },
    onHoldChance: { type: Number },
    allocatedQuantity: { type: Number },
    quarantinedQuantity: { type: Number },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
