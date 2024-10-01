const Formula = require("../../models/product-development-model/formulasModel");

// Get all formulas
exports.getAllFormulas = async (req, res) => {
  try {
    const formulas = await Formula.find();
    res.status(200).json(formulas);
  } catch (err) {
    res.status(500).json({ message: "Error fetching formulas", error: err });
  }
};

// Get a formula by ID
exports.getFormulaById = async (req, res) => {
  try {
    const formula = await Formula.findById(req.params.entity_id);
    if (!formula) {
      return res.status(404).json({ message: "Formula not found" });
    }
    res.status(200).json(formula);
  } catch (err) {
    res.status(500).json({ message: "Error fetching formula", error: err });
  }
};

// Create a new formula
exports.createFormula = async (req, res) => {
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

    const formula = new Formula({
      ...req.body,
      code,
      unitOfMeasurement,
    });

    await formula.save();
    res.status(201).json(formula);
  } catch (err) {
    res.status(400).json({ message: "Error creating formula", error: err });
  }
};

// Update a formula by ID
exports.updateFormula = async (req, res) => {
  try {
    const formula = await Formula.findByIdAndUpdate(
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
};

// Delete a formula by ID
exports.deleteFormula = async (req, res) => {
  try {
    const formula = await Formula.findByIdAndDelete(req.params.entity_id);
    if (!formula) {
      return res.status(404).json({ message: "Formula not found" });
    }
    res.status(200).json({ message: "Formula deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting formula", error: err });
  }
};
