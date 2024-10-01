"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for Batch Records
const batchRecordsSchema = new mongoose_1.default.Schema({
  batchNumber: { type: String, required: true, unique: true }, // Unique identifier for the batch
  productSKU: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "ProductSKU",
    required: true,
  }, // Reference to Product SKU
  formula: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "Formula",
    required: true,
  }, // Reference to Formula
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
const BatchRecords = mongoose_1.default.model(
  "BatchRecord",
  batchRecordsSchema,
);
module.exports = BatchRecords;
//# sourceMappingURL=batchRecordModel.js.map
