"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurchaseOrderById = exports.updatePurchaseOrderById = exports.getPurchaseOrderById = exports.getAllPurchaseOrders = exports.createPurchaseOrder = void 0;
const purchaseOrderModel_1 = __importDefault(require("@infra/persistence/models/purchaseOrderModel"));
// Create a new purchase order
const createPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = new purchaseOrderModel_1.default(req.body);
        await purchaseOrder.save();
        res.status(201).json({ success: true, data: purchaseOrder });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creating purchase order",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createPurchaseOrder = createPurchaseOrder;
// Get all purchase orders with optional filtering
const getAllPurchaseOrders = async (req, res) => {
    try {
        const filters = {};
        const { dueInDays } = req.query;
        // Apply filters if dueInDays is provided
        if (dueInDays) {
            const today = new Date();
            const dueDate = new Date(today.setDate(today.getDate() + parseInt(dueInDays)));
            filters.dueDate = { $lte: dueDate };
        }
        const purchaseOrders = await purchaseOrderModel_1.default.find(filters).populate("vendor");
        res.status(200).json({ success: true, data: purchaseOrders });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching purchase orders",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllPurchaseOrders = getAllPurchaseOrders;
// Get a single purchase order by ID
const getPurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await purchaseOrderModel_1.default.findById(req.params.id).populate("vendor");
        if (!purchaseOrder) {
            res
                .status(404)
                .json({ success: false, message: "Purchase Order not found" });
            return;
        }
        res.status(200).json({ success: true, data: purchaseOrder });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching purchase order",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getPurchaseOrderById = getPurchaseOrderById;
// Update a purchase order by ID
const updatePurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await purchaseOrderModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!purchaseOrder) {
            res
                .status(404)
                .json({ success: false, message: "Purchase Order not found" });
            return;
        }
        res.status(200).json({ success: true, data: purchaseOrder });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error updating purchase order",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.updatePurchaseOrderById = updatePurchaseOrderById;
// Delete a purchase order by ID
const deletePurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await purchaseOrderModel_1.default.findByIdAndDelete(req.params.id);
        if (!purchaseOrder) {
            res
                .status(404)
                .json({ success: false, message: "Purchase Order not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Purchase Order deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting purchase order",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deletePurchaseOrderById = deletePurchaseOrderById;
