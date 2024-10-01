const mongoose = require("mongoose");

const productSKUSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  productType: { type: String, required: true },
  formula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Formula",
    required: true,
  },
  packagingInfo: { type: String, required: true },
  customerInfo: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProductSKU = mongoose.model("ProductSKU", productSKUSchema, "ProductSKU");

module.exports = ProductSKU;
