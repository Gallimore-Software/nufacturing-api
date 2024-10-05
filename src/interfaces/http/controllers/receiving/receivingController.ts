import PurchaseOrder from "@infra/persistence/models/purchaseOrderModel";
import Receiving from "@infra/persistence/models/receivingModel";
import { Request, Response } from "express";

// Define types for request parameters
interface ReceivingRequestParams {
  receivingId: string;
}

// Define type for request body when creating/updating receiving entry
interface ReceivingRequestBody {
  poNumber: string;
  vendor: string;
  receivedItems: object[];
  receiver: string;
  comments?: string;
}

// Create a new receiving entry
export const createReceiving = async (
  req: Request<object, object, ReceivingRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { poNumber, vendor, receivedItems, receiver, comments } = req.body;

    // Check if the Purchase Order exists
    const poExists = await PurchaseOrder.findById(poNumber);
    if (!poExists) {
      res
        .status(404)
        .json({ success: false, message: "Purchase Order not found" });
      return;
    }

    // Create the receiving entry
    const receiving = new Receiving({
      poNumber,
      vendor,
      receivedItems,
      receiver,
      comments,
    });

    await receiving.save();
    res.status(201).json({ success: true, data: receiving });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating receiving entry",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get all receiving entries
export const getAllReceivings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const receivings = await Receiving.find()
      .populate("poNumber")
      .populate("vendor")
      .populate("receiver");
    res.status(200).json({ success: true, data: receivings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching receiving entries",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get a single receiving entry by ID
export const getReceivingById = async (
  req: Request<ReceivingRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const receiving = await Receiving.findById(req.params.receivingId)
      .populate("poNumber")
      .populate("vendor")
      .populate("receiver");

    if (!receiving) {
      res
        .status(404)
        .json({ success: false, message: "Receiving entry not found" });
      return;
    }

    res.status(200).json({ success: true, data: receiving });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching receiving entry",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update a receiving entry by ID
export const updateReceivingById = async (
  req: Request<ReceivingRequestParams, object, ReceivingRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { receivingId } = req.params;
    const updatedData = req.body;

    const receiving = await Receiving.findByIdAndUpdate(
      receivingId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!receiving) {
      res
        .status(404)
        .json({ success: false, message: "Receiving record not found" });
      return;
    }

    res.status(200).json({ success: true, data: receiving });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating receiving entry",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete a receiving entry by ID
export const deleteReceiving = async (
  req: Request<ReceivingRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const receiving = await Receiving.findByIdAndDelete(req.params.receivingId);
    if (!receiving) {
      res
        .status(404)
        .json({ success: false, message: "Receiving entry not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Receiving entry deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting receiving entry",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
