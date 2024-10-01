const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  units: [{ type: String }], // List of applicable units of measurement
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProductType = mongoose.model("ProductType", productTypeSchema);

module.exports = ProductType;
