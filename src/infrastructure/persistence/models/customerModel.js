"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    companyName: { type: String, required: true },
    displayName: { type: String, required: true },
    primaryContact: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
    },
    complianceContact: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
    },
    accountingContact: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
    },
    website: String,
    businessAddress: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        zip: String,
    },
    fulfillmentAddress: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        zip: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Customer = mongoose_1.default.model("Customer", customerSchema);
exports.default = Customer;
