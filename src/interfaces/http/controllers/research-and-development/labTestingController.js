"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLabTest = exports.updateLabTest = exports.createLabTest = exports.getLabTestById = exports.getAllLabTests = void 0;
const labTestModel_1 = __importDefault(require("@infrastructure/persistence/models/labTestModel"));
// Get all lab tests
const getAllLabTests = async (req, res) => {
    try {
        const labTests = await labTestModel_1.default.find().populate("relatedInventoryItem");
        res.status(200).json({ success: true, data: labTests });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching lab tests",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllLabTests = getAllLabTests;
// Get a lab test by ID
const getLabTestById = async (req, res) => {
    try {
        const labTest = await labTestModel_1.default.findById(req.params.id).populate("relatedInventoryItem");
        if (!labTest) {
            res.status(404).json({ success: false, message: "Lab test not found" });
            return;
        }
        res.status(200).json({ success: true, data: labTest });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching lab test",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getLabTestById = getLabTestById;
// Create a new lab test
const createLabTest = async (req, res) => {
    try {
        const { testName, testDate, result, comments, testedBy, relatedInventoryItem, attachments, } = req.body;
        const newLabTest = new labTestModel_1.default({
            testName,
            testDate,
            result,
            comments,
            testedBy,
            relatedInventoryItem,
            attachments,
        });
        await newLabTest.save();
        res.status(201).json({ success: true, data: newLabTest });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creating lab test",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createLabTest = createLabTest;
// Update a lab test
const updateLabTest = async (req, res) => {
    try {
        const { testName, testDate, result, comments, testedBy, relatedInventoryItem, attachments, } = req.body;
        const updatedLabTest = await labTestModel_1.default.findByIdAndUpdate(req.params.id, {
            testName,
            testDate,
            result,
            comments,
            testedBy,
            relatedInventoryItem,
            attachments,
        }, { new: true, runValidators: true }).populate("relatedInventoryItem");
        if (!updatedLabTest) {
            res.status(404).json({ success: false, message: "Lab test not found" });
            return;
        }
        res.status(200).json({ success: true, data: updatedLabTest });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error updating lab test",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.updateLabTest = updateLabTest;
// Delete a lab test
const deleteLabTest = async (req, res) => {
    try {
        const deletedLabTest = await labTestModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedLabTest) {
            res.status(404).json({ success: false, message: "Lab test not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Lab test deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting lab test",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteLabTest = deleteLabTest;
