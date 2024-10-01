import mongoose from "mongoose";

const purchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String, required: true, unique: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

module.exports = PurchaseOrder;
