"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const Formula = require("../../models/product-development-model/formulasModel");
// Get all formulas
exports.getAllFormulas = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const formulas = yield Formula.find();
      res.status(200).json(formulas);
    } catch (err) {
      res.status(500).json({ message: "Error fetching formulas", error: err });
    }
  });
// Get a formula by ID
exports.getFormulaById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const formula = yield Formula.findById(req.params.entity_id);
      if (!formula) {
        return res.status(404).json({ message: "Formula not found" });
      }
      res.status(200).json(formula);
    } catch (err) {
      res.status(500).json({ message: "Error fetching formula", error: err });
    }
  });
// Create a new formula
exports.createFormula = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
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
      const formula = new Formula(
        Object.assign(Object.assign({}, req.body), { code, unitOfMeasurement }),
      );
      yield formula.save();
      res.status(201).json(formula);
    } catch (err) {
      res.status(400).json({ message: "Error creating formula", error: err });
    }
  });
// Update a formula by ID
exports.updateFormula = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const formula = yield Formula.findByIdAndUpdate(
        req.params.entity_id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!formula) {
        return res.status(404).json({ message: "Formula not found" });
      }
      res.status(200).json(formula);
    } catch (err) {
      res.status(400).json({ message: "Error updating formula", error: err });
    }
  });
// Delete a formula by ID
exports.deleteFormula = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const formula = yield Formula.findByIdAndDelete(req.params.entity_id);
      if (!formula) {
        return res.status(404).json({ message: "Formula not found" });
      }
      res.status(200).json({ message: "Formula deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting formula", error: err });
    }
  });
//# sourceMappingURL=formulaController.js.map
