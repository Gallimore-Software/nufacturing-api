const Receiving = require("../../models/receiving-model/receivingModel");
const PurchaseOrder = require("../../models/receiving-model/purchaseOrderModel");

// Create a new receiving entry
exports.createReceiving = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Get all receiving entries
exports.getAllReceivings = async (req, res) => {
  try {
    const receivings = await Receiving.find()
      .populate("poNumber")
      .populate("vendor")
      .populate("receiver");
    res.status(200).json(receivings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single receiving entry by ID
exports.getReceivingById = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Update a receiving entry by ID
exports.updateReceivingById = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Delete a receiving entry by ID
exports.deleteReceiving = async (req, res) => {
  try {
    const receiving = await Receiving.findByIdAndDelete(req.params.receivingId);
    if (!receiving) {
      return res.status(404).json({ message: "Receiving entry not found" });
    }
    res.status(200).json({ message: "Receiving entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
