"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productTypeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    units: [{ type: String }], // List of applicable units of measurement
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const ProductType = mongoose_1.default.model("ProductType", productTypeSchema);
exports.default = ProductType;
