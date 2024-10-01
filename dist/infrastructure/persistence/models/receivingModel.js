"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for Receiving
const receivingSchema = new mongoose_1.default.Schema({
  poNumber: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
    required: true,
  },
  vendor: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  receivedItems: [
    {
      ingredientName: { type: String, required: true },
      ingredientSKU: { type: String, required: true },
      quantityReceived: { type: Number, required: true },
      condition: { type: String, required: true }, // e.g., "Good", "Damaged"
      receivingDate: { type: Date, required: true },
    },
  ],
  receiver: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Receiving = mongoose_1.default.model("Receiving", receivingSchema);
module.exports = Receiving;
//# sourceMappingURL=receivingModel.js.map
