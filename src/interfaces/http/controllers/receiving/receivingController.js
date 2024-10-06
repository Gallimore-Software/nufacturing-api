"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReceiving = exports.updateReceivingById = exports.getReceivingById = exports.getAllReceivings = exports.createReceiving = void 0;
const purchaseOrderModel_1 = __importDefault(require("@infrastructure/persistence/models/purchaseOrderModel"));
const receivingModel_1 = __importDefault(require("@infrastructure/persistence/models/receivingModel"));
// Create a new receiving entry
const createReceiving = async (req, res) => {
    try {
        const { poNumber, vendor, receivedItems, receiver, comments } = req.body;
        // Check if the Purchase Order exists
        const poExists = await purchaseOrderModel_1.default.findById(poNumber);
        if (!poExists) {
            res
                .status(404)
                .json({ success: false, message: "Purchase Order not found" });
            return;
        }
        // Create the receiving entry
        const receiving = new receivingModel_1.default({
            poNumber,
            vendor,
            receivedItems,
            receiver,
            comments,
        });
        await receiving.save();
        res.status(201).json({ success: true, data: receiving });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating receiving entry",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createReceiving = createReceiving;
// Get all receiving entries
const getAllReceivings = async (req, res) => {
    try {
        const receivings = await receivingModel_1.default.find()
            .populate("poNumber")
            .populate("vendor")
            .populate("receiver");
        res.status(200).json({ success: true, data: receivings });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching receiving entries",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllReceivings = getAllReceivings;
// Get a single receiving entry by ID
const getReceivingById = async (req, res) => {
    try {
        const receiving = await receivingModel_1.default.findById(req.params.receivingId)
            .populate("poNumber")
            .populate("vendor")
            .populate("receiver");
        if (!receiving) {
            res
                .status(404)
                .json({ success: false, message: "Receiving entry not found" });
            return;
        }
        res.status(200).json({ success: true, data: receiving });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching receiving entry",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getReceivingById = getReceivingById;
// Update a receiving entry by ID
const updateReceivingById = async (req, res) => {
    try {
        const { receivingId } = req.params;
        const updatedData = req.body;
        const receiving = await receivingModel_1.default.findByIdAndUpdate(receivingId, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!receiving) {
            res
                .status(404)
                .json({ success: false, message: "Receiving record not found" });
            return;
        }
        res.status(200).json({ success: true, data: receiving });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating receiving entry",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.updateReceivingById = updateReceivingById;
// Delete a receiving entry by ID
const deleteReceiving = async (req, res) => {
    try {
        const receiving = await receivingModel_1.default.findByIdAndDelete(req.params.receivingId);
        if (!receiving) {
            res
                .status(404)
                .json({ success: false, message: "Receiving entry not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Receiving entry deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting receiving entry",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteReceiving = deleteReceiving;
