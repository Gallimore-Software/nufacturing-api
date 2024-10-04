import { InventoryItem } from "@models/inventoryModel";
import CreateInventoryItemUseCase from "@app-inventory/createInventoryItemUseCase";

// Get all inventory items
export const getAllInventoryItems = async (req, res) => {
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
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching inventory items",
      error: err,
    });
  }
};

// Get inventory item by ID
export const getInventoryItemById = async (req, res) => {
  try {
    const inventoryItem = await InventoryItem.findById(req.params.inventoryId)
      .populate("vendor")
      .populate("createdBy")
      .populate("associatedFormulas.refId")
      .populate("associatedProductSKUs.refId")
      .populate("associatedBatchNumbers.refId")
      .populate("associatedPOs.refId")
      .populate("associatedLabTests.refId")
      .populate("associatedReceivements.refId");
    if (!inventoryItem) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory item not found" });
    }
    res.status(200).json({ success: true, data: inventoryItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching inventory item",
      error: err,
    });
  }
};

// Create a new inventory item
export const createInventoryItem = async (req, res) => {
  try {
    const newInventoryItem = await CreateInventoryItemUseCase.execute(req.body);
    res.status(201).json({ success: true, data: newInventoryItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error creating inventory item",
      error: err,
    });
  }
};

// Update inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(
      req.params.inventoryId,
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
      return res
        .status(404)
        .json({ success: false, message: "Inventory item not found" });
    }
    res.status(200).json({ success: true, data: updatedInventoryItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error updating inventory item",
      error: err,
    });
  }
};

// Delete inventory item
export const deleteInventoryItem = async (req, res) => {
  try {
    const deletedInventoryItem = await InventoryItem.findByIdAndDelete(
      req.params.inventoryId,
    );
    if (!deletedInventoryItem) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory item not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Inventory item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error deleting inventory item",
      error: err,
    });
  }
};
