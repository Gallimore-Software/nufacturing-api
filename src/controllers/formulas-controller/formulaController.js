const Formula = require('../../models/sales-model/formulaModel');

// Get all formulas
exports.getAllFormulas = async (req, res) => {
  try {
    const formulas = await Formula.find();
    res.status(200).json(formulas);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching formulas', error: err });
  }
};

// Get formula by ID
exports.getFormulaById = async (req, res) => {
  try {
    const formula = await Formula.findById(req.params.formulaId);
    if (!formula) {
      return res.status(404).json({ message: 'Formula not found' });
    }
    res.status(200).json(formula);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching formula', error: err });
  }
};

// Create a new formula
exports.createFormula = async (req, res) => {
  try {
    const newFormula = new Formula(req.body);
    await newFormula.save();
    res.status(201).json(newFormula);
  } catch (err) {
    res.status(400).json({ message: 'Error creating formula', error: err });
  }
};

// Update formula
exports.updateFormula = async (req, res) => {
  try {
    const updatedFormula = await Formula.findByIdAndUpdate(req.params.formulaId, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedFormula) {
      return res.status(404).json({ message: 'Formula not found' });
    }
    res.status(200).json(updatedFormula);
  } catch (err) {
    res.status(400).json({ message: 'Error updating formula', error: err });
  }
};

// Delete formula
exports.deleteFormula = async (req, res) => {
  try {
    const deletedFormula = await Formula.findByIdAndDelete(req.params.formulaId);
    if (!deletedFormula) {
      return res.status(404).json({ message: 'Formula not found' });
    }
    res.status(200).json({ message: 'Formula deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting formula', error: err });
  }
};
