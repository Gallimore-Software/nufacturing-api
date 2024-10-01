"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseOrderSchema = new mongoose_1.default.Schema({
  poNumber: { type: String, required: true, unique: true },
  vendor: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  items: [
    {
      ingredientName: { type: String, required: true },
      ingredientSKU: { type: String, required: true },
      quantityOrdered: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  orderDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  receivedDate: { type: Date },
  status: {
    type: String,
    enum: ["Unreceived", "Partially Received", "Received"],
    default: "Unreceived",
  },
  createdBy: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const PurchaseOrder = mongoose_1.default.model(
  "PurchaseOrder",
  purchaseOrderSchema,
);
module.exports = PurchaseOrder;
//# sourceMappingURL=purchaseOrderModel.js.map
