import { Request, Response } from "express";
import Formula from "@infra/persistence/models/formulaModel";

// Define the type for entity_id in req.params
interface EntityRequestParams {
  entity_id: string;
}

// Get all formulas
export const getAllFormulas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const formulas = await Formula.find();
    res.status(200).json({ success: true, data: formulas });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching formulas",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Get a formula by ID
export const getFormulaById = async (
  req: Request<EntityRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const formula = await Formula.findById(req.params.entity_id);
    if (!formula) {
      res.status(404).json({ success: false, message: "Formula not found" });
      return;
    }
    res.status(200).json({ success: true, data: formula });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching formula",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Create a new formula
export const createFormula = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res.status(201).json({ success: true, data: formula });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error creating formula",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Update a formula by ID
export const updateFormula = async (
  req: Request<EntityRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const formula = await Formula.findByIdAndUpdate(
      req.params.entity_id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!formula) {
      res.status(404).json({ success: false, message: "Formula not found" });
      return;
    }
    res.status(200).json({ success: true, data: formula });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error updating formula",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Delete a formula by ID
export const deleteFormula = async (
  req: Request<EntityRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const formula = await Formula.findByIdAndDelete(req.params.entity_id);
    if (!formula) {
      res.status(404).json({ success: false, message: "Formula not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Formula deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting formula",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
