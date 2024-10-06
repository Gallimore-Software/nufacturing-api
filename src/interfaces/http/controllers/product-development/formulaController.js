"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFormula = exports.updateFormula = exports.createFormula = exports.getFormulaById = exports.getAllFormulas = void 0;
const formulaModel_1 = __importDefault(require("@infra/persistence/models/formulaModel"));
// Get all formulas
const getAllFormulas = async (req, res) => {
    try {
        const formulas = await formulaModel_1.default.find();
        res.status(200).json({ success: true, data: formulas });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching formulas",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.getAllFormulas = getAllFormulas;
// Get a formula by ID
const getFormulaById = async (req, res) => {
    try {
        const formula = await formulaModel_1.default.findById(req.params.entity_id);
        if (!formula) {
            res.status(404).json({ success: false, message: "Formula not found" });
            return;
        }
        res.status(200).json({ success: true, data: formula });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching formula",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.getFormulaById = getFormulaById;
// Create a new formula
const createFormula = async (req, res) => {
    try {
        const { productType } = req.body;
        // Auto-generate formula code
        const code = `F-${Date.now()}`;
        // Determine unit of measurement based on product type
        let unitOfMeasurement;
        switch (productType) {
            case "Capsules":
            case "Powder":
            case "Powder Stickpacks":
                unitOfMeasurement = "mcg/mg/g/kg";
                break;
            case "Gummies":
            case "Tinctures":
            case "Pouches":
                unitOfMeasurement = "mcg/mg/g/kg/ml/liter/gallons/ounces";
                break;
            case "Liquid Stickpacks":
                unitOfMeasurement = "ml/liter/gallons/ounces";
                break;
            default:
                unitOfMeasurement = "unknown";
        }
        const formula = new formulaModel_1.default({
            ...req.body,
            code,
            unitOfMeasurement,
        });
        await formula.save();
        res.status(201).json({ success: true, data: formula });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Error creating formula",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.createFormula = createFormula;
// Update a formula by ID
const updateFormula = async (req, res) => {
    try {
        const formula = await formulaModel_1.default.findByIdAndUpdate(req.params.entity_id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!formula) {
            res.status(404).json({ success: false, message: "Formula not found" });
            return;
        }
        res.status(200).json({ success: true, data: formula });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Error updating formula",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.updateFormula = updateFormula;
// Delete a formula by ID
const deleteFormula = async (req, res) => {
    try {
        const formula = await formulaModel_1.default.findByIdAndDelete(req.params.entity_id);
        if (!formula) {
            res.status(404).json({ success: false, message: "Formula not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Formula deleted successfully" });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting formula",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.deleteFormula = deleteFormula;
