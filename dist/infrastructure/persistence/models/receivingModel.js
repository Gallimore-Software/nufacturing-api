"use strict";
const mongoose = require("mongoose");
// Define the schema for Receiving
const receivingSchema = new mongoose.Schema({
  poNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: mongoose.Schema.Types.ObjectId,
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
const Receiving = mongoose.model("Receiving", receivingSchema);
module.exports = Receiving;
//# sourceMappingURL=receivingModel.js.map
