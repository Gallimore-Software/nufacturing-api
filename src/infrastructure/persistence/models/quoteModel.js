"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const quoteSchema = new mongoose_1.default.Schema({
    accountManager: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customerName: { type: String, required: true },
    brandName: { type: String, required: true },
    customerCode: { type: String, required: true },
    productType: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ProductType",
        required: true,
    },
    formula: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Formula",
        required: true,
    },
    customerProvidedLotCode: { type: String },
    customerProvidedSku: { type: String },
    ingredients: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Ingredient" }],
    packaging: {
        capsuleInfo: String,
        bottlingInfo: String,
        closureInfo: String,
        masterCartonInfo: String,
        otherComponentsInfo: String,
        labelInfo: String,
    },
    billOfMaterials: {
        packagingRequirements: String,
        volumePricingTable: String,
        MOQ: String,
        bestGP: String,
    },
    status: { type: String, enum: ["Active", "Expired"], default: "Active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Quote = mongoose_1.default.model("Quote", quoteSchema);
exports.default = Quote;
