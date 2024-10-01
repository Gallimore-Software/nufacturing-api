import Receiving from "@models/receivingModel";
import PurchaseOrder from "@models/purchaseOrderModel";

// Create a new receiving entry
export const createReceiving = async (req, res) => {
  try {
    const { poNumber, vendor, receivedItems, receiver, comments } = req.body;

    // Check if the Purchase Order exists
    const poExists = await PurchaseOrder.findById(poNumber);
    if (!poExists) {
      return res.status(404).json({ message: "Purchase Order not found" });
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
    res.status(201).json(receiving);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Get all receiving entries
export const getAllReceivings = async (req, res) => {
  try {
    const receivings = await Receiving.find()
      .populate("poNumber")
      .populate("vendor")
      .populate("receiver");
    res.status(200).json(receivings);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Get a single receiving entry by ID
export const getReceivingById = async (req, res) => {
  try {
    const receiving = await Receiving.findById(req.params.receivingId)
      .populate("poNumber")
      .populate("vendor")
      .populate("receiver");
    if (!receiving) {
      return res.status(404).json({ message: "Receiving entry not found" });
    }
    res.status(200).json(receiving);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Update a receiving entry by ID
export const updateReceivingById = async (req, res) => {
  try {
    const { receivingId } = req.params;
    const updatedData = req.body;

    const receiving = await Receiving.findByIdAndUpdate(
      receivingId,
      updatedData,
      { new: true },
    );

    if (!receiving) {
      return res.status(404).json({ message: "Receiving record not found" });
    }

    res.status(200).json(receiving);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete a receiving entry by ID
export const deleteReceiving = async (req, res) => {
  try {
    const receiving = await Receiving.findByIdAndDelete(req.params.receivingId);
    if (!receiving) {
      return res.status(404).json({ message: "Receiving entry not found" });
    }
    res.status(200).json({ message: "Receiving entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
