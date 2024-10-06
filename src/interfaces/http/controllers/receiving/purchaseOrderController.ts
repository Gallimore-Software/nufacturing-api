import PurchaseOrder from "@infrastructure/persistence/models/purchaseOrderModel";
import { Request, Response } from "express";

// Define types for query parameters and request parameters
interface PurchaseOrderRequestParams {
  id: string;
}

interface GetAllPurchaseOrdersQuery {
  dueInDays?: string;
}

// Create a new purchase order
export const createPurchaseOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const purchaseOrder = new PurchaseOrder(req.body);
    await purchaseOrder.save();
    res.status(201).json({ success: true, data: purchaseOrder });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating purchase order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get all purchase orders with optional filtering
export const getAllPurchaseOrders = async (
  req: Request<object, object, object, GetAllPurchaseOrdersQuery>,
  res: Response,
): Promise<void> => {
  try {
    const filters: { [key: string]: unknown } = {};
    const { dueInDays } = req.query;

    // Apply filters if dueInDays is provided
    if (dueInDays) {
      const today = new Date();
      const dueDate = new Date(
        today.setDate(today.getDate() + parseInt(dueInDays)),
      );
      filters.dueDate = { $lte: dueDate };
    }

    const purchaseOrders = await PurchaseOrder.find(filters).populate("vendor");
    res.status(200).json({ success: true, data: purchaseOrders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching purchase orders",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get a single purchase order by ID
export const getPurchaseOrderById = async (
  req: Request<PurchaseOrderRequestParams>,
  res: Response,
): Promise<void> => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate(
      "vendor",
    );
    if (!purchaseOrder) {
      res
        .status(404)
        .json({ success: false, message: "Purchase Order not found" });
      return;
    }
    res.status(200).json({ success: true, data: purchaseOrder });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching purchase order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update a purchase order by ID
export const updatePurchaseOrderById = async (
  req: Request<PurchaseOrderRequestParams>,
  res: Response,
): Promise<void> => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!purchaseOrder) {
      res
        .status(404)
        .json({ success: false, message: "Purchase Order not found" });
      return;
    }
    res.status(200).json({ success: true, data: purchaseOrder });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating purchase order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete a purchase order by ID
export const deletePurchaseOrderById = async (
  req: Request<PurchaseOrderRequestParams>,
  res: Response,
): Promise<void> => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!purchaseOrder) {
      res
        .status(404)
        .json({ success: false, message: "Purchase Order not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Purchase Order deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting purchase order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
