"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const PurchaseOrder = require("../../models/receiving-model/purchaseOrderModel");
// Create a new purchase order
exports.createPurchaseOrder = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const purchaseOrder = new PurchaseOrder(req.body);
      yield purchaseOrder.save();
      res.status(201).json(purchaseOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// Get all purchase orders with optional filtering
exports.getAllPurchaseOrders = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
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
      const purchaseOrders =
        yield PurchaseOrder.find(filters).populate("vendor");
      res.status(200).json(purchaseOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Get a single purchase order by ID
exports.getPurchaseOrderById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const purchaseOrder = yield PurchaseOrder.findById(
        req.params.id,
      ).populate("vendor");
      if (!purchaseOrder)
        return res.status(404).json({ message: "Purchase Order not found" });
      res.status(200).json(purchaseOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Update a purchase order by ID
exports.updatePurchaseOrderById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const purchaseOrder = yield PurchaseOrder.findByIdAndUpdate(
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
  });
// Delete a purchase order by ID
exports.deletePurchaseOrderById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const purchaseOrder = yield PurchaseOrder.findByIdAndDelete(
        req.params.id,
      );
      if (!purchaseOrder)
        return res.status(404).json({ message: "Purchase Order not found" });
      res.status(200).json({ message: "Purchase Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//# sourceMappingURL=purchaseOrderController.js.map
