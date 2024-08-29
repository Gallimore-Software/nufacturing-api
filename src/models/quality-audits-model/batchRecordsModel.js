const mongoose = require("mongoose");

// Define the schema for Batch Records
const batchRecordsSchema = new mongoose.Schema({
  batchNumber: { type: String, required: true, unique: true }, // Unique identifier for the batch
  productSKU: { type: String, required: true }, // Associated Product SKU
  formulaCode: { type: String, required: true }, // Associated Formula Code
  productionDate: { type: Date, required: true }, // Date of Production
  expirationDate: { type: Date, required: true }, // Expiration Date of the Batch
  productionLine: { type: String, required: true }, // Production Line or Machine used
  shift: { type: String, required: true }, // Shift during which the batch was produced
  quantityProduced: { type: Number, required: true }, // Quantity produced in this batch
  status: {
    type: String,
    enum: ["In Progress", "Completed", "Quarantined", "Failed"],
    default: "In Progress",
  },
  operator: { type: String, required: true },
  qualityChecks: [
    {
      checkName: { type: String, required: true },
      result: { type: String, required: true },
      checkedBy: { type: String, required: true },
      checkedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const BatchRecords = mongoose.model("BatchRecords", batchRecordsSchema);

module.exports = BatchRecords;
