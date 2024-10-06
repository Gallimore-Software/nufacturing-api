"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductType = exports.updateProductType = exports.createProductType = exports.getProductTypeById = exports.getAllProductTypes = void 0;
const productTypeModel_1 = __importDefault(require("@infra/persistence/models/productTypeModel"));
// Get all product types
const getAllProductTypes = async (req, res) => {
    try {
        const productTypes = await productTypeModel_1.default.find();
        res.status(200).json({ success: true, data: productTypes });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching product types",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.getAllProductTypes = getAllProductTypes;
// Get product type by ID
const getProductTypeById = async (req, res) => {
    try {
        const productType = await productTypeModel_1.default.findById(req.params.typeId);
        if (!productType) {
            res
                .status(404)
                .json({ success: false, message: "Product type not found" });
            return;
        }
        res.status(200).json({ success: true, data: productType });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching product type",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.getProductTypeById = getProductTypeById;
// Create a new product type
const createProductType = async (req, res) => {
    try {
        const newProductType = new productTypeModel_1.default(req.body);
        await newProductType.save();
        res.status(201).json({ success: true, data: newProductType });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Error creating product type",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.createProductType = createProductType;
// Update product type
const updateProductType = async (req, res) => {
    try {
        const updatedProductType = await productTypeModel_1.default.findByIdAndUpdate(req.params.typeId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedProductType) {
            res
                .status(404)
                .json({ success: false, message: "Product type not found" });
            return;
        }
        res.status(200).json({ success: true, data: updatedProductType });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Error updating product type",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.updateProductType = updateProductType;
// Delete product type
const deleteProductType = async (req, res) => {
    try {
        const deletedProductType = await productTypeModel_1.default.findByIdAndDelete(req.params.typeId);
        if (!deletedProductType) {
            res
                .status(404)
                .json({ success: false, message: "Product type not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Product type deleted successfully" });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting product type",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.deleteProductType = deleteProductType;
