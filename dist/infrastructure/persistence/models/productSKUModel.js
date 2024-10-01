"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSKUSchema = new mongoose_1.default.Schema({
  sku: { type: String, required: true, unique: true },
  productType: { type: String, required: true },
  formula: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "Formula",
    required: true,
  },
  packagingInfo: { type: String, required: true },
  customerInfo: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const ProductSKU = mongoose_1.default.model(
  "ProductSKU",
  productSKUSchema,
  "ProductSKU",
);
module.exports = ProductSKU;
//# sourceMappingURL=productSKUModel.js.map
