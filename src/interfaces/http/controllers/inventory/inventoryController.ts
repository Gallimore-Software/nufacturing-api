import { Request, Response } from "express";
import CreateInventoryItemUseCase from "@app/use-cases/inventory/createInventoryItemUseCase";
import { InventoryItem } from "@infrastructure/persistence/models/inventoryModel";

// Get all inventory items
export const getAllInventoryItems = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const inventoryItems = await InventoryItem.find()
      .populate("vendor")
      .populate("createdBy")
      .populate("associatedFormulas.refId")
      .populate("associatedProductSKUs.refId")
      .populate("associatedBatchNumbers.refId")
      .populate("associatedPOs.refId")
      .populate("associatedLabTests.refId")
      .populate("associatedReceivements.refId");

    res.status(200).json({ success: true, data: inventoryItems });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching inventory items",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Get inventory item by ID
export const getInventoryItemById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { inventoryId } = req.params;
    const inventoryItem = await InventoryItem.findById(inventoryId)
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching inventory item",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Create a new inventory item
export const createInventoryItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newInventoryItem = await CreateInventoryItemUseCase.execute(req.body);
    res.status(201).json({ success: true, data: newInventoryItem });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating inventory item",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Update inventory item
export const updateInventoryItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { inventoryId } = req.params;
    const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(
      inventoryId,
      req.body,
      { new: true, runValidators: true },
    )
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating inventory item",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Delete inventory item
export const deleteInventoryItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { inventoryId } = req.params;
    const deletedInventoryItem =
      await InventoryItem.findByIdAndDelete(inventoryId);

    if (!deletedInventoryItem) {
      res
        .status(404)
        .json({ success: false, message: "Inventory item not found" });
      return; // Explicitly return to make sure the function ends here
    }

    res
      .status(200)
      .json({ success: true, message: "Inventory item deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting inventory item",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
