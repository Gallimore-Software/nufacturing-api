"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorModel = exports.VendorEntity = void 0;
// VendorEntity.ts
class VendorEntity {
    static find() {
        throw new Error("Method not implemented.");
    }
    save() {
        throw new Error("Method not implemented.");
    }
    constructor(data) {
        this._id = data._id ?? "";
        this.displayName = data.displayName;
        this.companyName = data.companyName;
        this.companyWebsite = data.companyWebsite;
        this.createdBy = data.createdBy;
    }
    // Example of some business logic method
    validate() {
        if (!this.displayName || !this.companyName) {
            throw new Error("Missing required fields");
        }
        return true;
    }
}
exports.VendorEntity = VendorEntity;
// VendorModel.ts
const mongoose_1 = __importStar(require("mongoose"));
const VendorSchema = new mongoose_1.Schema({
    displayName: { type: String, required: true },
    companyName: { type: String, required: true },
    companyWebsite: { type: String },
    createdBy: { type: String, required: true },
});
exports.VendorModel = mongoose_1.default.model("Vendor", VendorSchema);
