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
const Receiving = require("../../models/receiving-model/receivingModel");
const PurchaseOrder = require("../../models/receiving-model/purchaseOrderModel");
// Create a new receiving entry
exports.createReceiving = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { poNumber, vendor, receivedItems, receiver, comments } = req.body;
      // Check if the Purchase Order exists
      const poExists = yield PurchaseOrder.findById(poNumber);
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
      yield receiving.save();
      res.status(201).json(receiving);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Get all receiving entries
exports.getAllReceivings = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const receivings = yield Receiving.find()
        .populate("poNumber")
        .populate("vendor")
        .populate("receiver");
      res.status(200).json(receivings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Get a single receiving entry by ID
exports.getReceivingById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const receiving = yield Receiving.findById(req.params.receivingId)
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
  });
// Update a receiving entry by ID
exports.updateReceivingById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { receivingId } = req.params;
      const updatedData = req.body;
      const receiving = yield Receiving.findByIdAndUpdate(
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
  });
// Delete a receiving entry by ID
exports.deleteReceiving = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const receiving = yield Receiving.findByIdAndDelete(
        req.params.receivingId,
      );
      if (!receiving) {
        return res.status(404).json({ message: "Receiving entry not found" });
      }
      res.status(200).json({ message: "Receiving entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//# sourceMappingURL=receivingController.js.map
