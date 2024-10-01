import PurchaseOrder from "../../models/receiving-model/purchaseOrderModel";

// Create a new purchase order
exports.createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = new PurchaseOrder(req.body);
    await purchaseOrder.save();
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all purchase orders with optional filtering
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const filters = {};
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
    res.status(200).json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single purchase order by ID
exports.getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate(
      "vendor",
    );
    if (!purchaseOrder)
      return res.status(404).json({ message: "Purchase Order not found" });
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a purchase order by ID
exports.updatePurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!purchaseOrder)
      return res.status(404).json({ message: "Purchase Order not found" });
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a purchase order by ID
exports.deletePurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!purchaseOrder)
      return res.status(404).json({ message: "Purchase Order not found" });
    res.status(200).json({ message: "Purchase Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
