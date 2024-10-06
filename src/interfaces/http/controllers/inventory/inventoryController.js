"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryItem = exports.updateInventoryItem = exports.createInventoryItem = exports.getInventoryItemById = exports.getAllInventoryItems = void 0;
const createInventoryItemUseCase_1 = __importDefault(require("@app/use-cases/inventory/createInventoryItemUseCase"));
const inventoryModel_1 = require("@infrastructure/persistence/models/inventoryModel");
// Get all inventory items
const getAllInventoryItems = async (req, res) => {
    try {
        const inventoryItems = await inventoryModel_1.InventoryItem.find()
            .populate("vendor")
            .populate("createdBy")
            .populate("associatedFormulas.refId")
            .populate("associatedProductSKUs.refId")
            .populate("associatedBatchNumbers.refId")
            .populate("associatedPOs.refId")
            .populate("associatedLabTests.refId")
            .populate("associatedReceivements.refId");
        res.status(200).json({ success: true, data: inventoryItems });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching inventory items",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.getAllInventoryItems = getAllInventoryItems;
// Get inventory item by ID
const getInventoryItemById = async (req, res) => {
    try {
        const { inventoryId } = req.params;
        const inventoryItem = await inventoryModel_1.InventoryItem.findById(inventoryId)
            .populate("vendor")
            .populate("createdBy")
            .populate("associatedFormulas.refId")
            .populate("associatedProductSKUs.refId")
            .populate("associatedBatchNumbers.refId")
            .populate("associatedPOs.refId")
            .populate("associatedLabTests.refId")
            .populate("associatedReceivements.refId");
        if (!inventoryItem) {
            res
                .status(404)
                .json({ success: false, message: "Inventory item not found" });
            return; // Explicitly return to make sure the function ends here
        }
        res.status(200).json({ success: true, data: inventoryItem });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching inventory item",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.getInventoryItemById = getInventoryItemById;
// Create a new inventory item
const createInventoryItem = async (req, res) => {
    try {
        const newInventoryItem = await createInventoryItemUseCase_1.default.execute(req.body);
        res.status(201).json({ success: true, data: newInventoryItem });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error creating inventory item",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.createInventoryItem = createInventoryItem;
// Update inventory item
const updateInventoryItem = async (req, res) => {
    try {
        const { inventoryId } = req.params;
        const updatedInventoryItem = await inventoryModel_1.InventoryItem.findByIdAndUpdate(inventoryId, req.body, { new: true, runValidators: true })
            .populate("vendor")
            .populate("createdBy")
            .populate("associatedFormulas.refId")
            .populate("associatedProductSKUs.refId")
            .populate("associatedBatchNumbers.refId")
            .populate("associatedPOs.refId")
            .populate("associatedLabTests.refId")
            .populate("associatedReceivements.refId");
        if (!updatedInventoryItem) {
            res
                .status(404)
                .json({ success: false, message: "Inventory item not found" });
            return; // Explicitly return to make sure the function ends here
        }
        res.status(200).json({ success: true, data: updatedInventoryItem });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating inventory item",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.updateInventoryItem = updateInventoryItem;
// Delete inventory item
const deleteInventoryItem = async (req, res) => {
    try {
        const { inventoryId } = req.params;
        const deletedInventoryItem = await inventoryModel_1.InventoryItem.findByIdAndDelete(inventoryId);
        if (!deletedInventoryItem) {
            res
                .status(404)
                .json({ success: false, message: "Inventory item not found" });
            return; // Explicitly return to make sure the function ends here
        }
        res
            .status(200)
            .json({ success: true, message: "Inventory item deleted successfully" });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting inventory item",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.deleteInventoryItem = deleteInventoryItem;
