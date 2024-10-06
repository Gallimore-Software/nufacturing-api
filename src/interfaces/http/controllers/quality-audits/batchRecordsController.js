"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBatchRecordById = exports.updateBatchRecordById = exports.getBatchRecordById = exports.getAllBatchRecords = exports.createBatchRecord = void 0;
const batchRecordModel_1 = __importDefault(require("@infrastructure/persistence/models/batchRecordModel"));
// Create a new batch record
const createBatchRecord = async (req, res) => {
    try {
        const batchRecord = new batchRecordModel_1.default(req.body);
        await batchRecord.save();
        res.status(201).json({ success: true, data: batchRecord });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creating batch record",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createBatchRecord = createBatchRecord;
// Get all batch records
const getAllBatchRecords = async (req, res) => {
    try {
        const batchRecords = await batchRecordModel_1.default.find();
        res.status(200).json({ success: true, data: batchRecords });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching batch records",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllBatchRecords = getAllBatchRecords;
// Get a single batch record by ID
const getBatchRecordById = async (req, res) => {
    try {
        const batchRecord = await batchRecordModel_1.default.findById(req.params._id);
        if (!batchRecord) {
            res
                .status(404)
                .json({ success: false, message: "Batch record not found" });
            return;
        }
        res.status(200).json({ success: true, data: batchRecord });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching batch record",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getBatchRecordById = getBatchRecordById;
// Update a batch record by ID
const updateBatchRecordById = async (req, res) => {
    try {
        const batchRecord = await batchRecordModel_1.default.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!batchRecord) {
            res
                .status(404)
                .json({ success: false, message: "Batch record not found" });
            return;
        }
        res.status(200).json({ success: true, data: batchRecord });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error updating batch record",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.updateBatchRecordById = updateBatchRecordById;
// Delete a batch record by ID
const deleteBatchRecordById = async (req, res) => {
    try {
        const batchRecord = await batchRecordModel_1.default.findByIdAndDelete(req.params._id);
        if (!batchRecord) {
            res
                .status(404)
                .json({ success: false, message: "Batch record not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Batch record deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting batch record",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteBatchRecordById = deleteBatchRecordById;
