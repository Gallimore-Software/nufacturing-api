"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    customer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    orderNumber: { type: String, required: true },
    status: {
        type: String,
        enum: [
            "PO Received",
            "In Process",
            "Awaiting Shipment",
            "In Transit",
            "Arrived",
        ],
        default: "PO Received",
    },
    orderType: {
        type: String,
        enum: [
            "Capsule",
            "Powders",
            "Stick Packs (Powder)",
            "Stick Packs (Liquid)",
            "Tincture",
            "Gummies",
            "Co Packaging",
        ],
        required: true,
    },
    products: [
        {
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
        },
    ],
    shippingInfo: {
        address: String,
        shippingMethod: String,
        trackingNumber: String,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Overdue"],
        default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
