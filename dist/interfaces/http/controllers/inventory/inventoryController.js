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
const InventoryItem = require("../models/inventoryModel");
const mongoose = require("mongoose");
// Get all inventory items
exports.getAllInventoryItems = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const inventoryItems = yield InventoryItem.find()
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
        error: err.message,
      });
    }
  });
// Get inventory item by ID
exports.getInventoryItemById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const inventoryItem = yield InventoryItem.findById(req.params.inventoryId)
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
        error: err.message,
      });
    }
  });
// Create a new inventory item
const CreateInventoryItemUseCase = require("../use-cases/createInventoryItem");
exports.createInventoryItem = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const newInventoryItem = yield CreateInventoryItemUseCase.execute(
        req.body,
      );
      res.status(201).json({ success: true, data: newInventoryItem });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error creating inventory item",
        error: err.message,
      });
    }
  });
// Update inventory item
exports.updateInventoryItem = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedInventoryItem = yield InventoryItem.findByIdAndUpdate(
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
        error: err.message,
      });
    }
  });
// Delete inventory item
exports.deleteInventoryItem = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedInventoryItem = yield InventoryItem.findByIdAndDelete(
        req.params.inventoryId,
      );
      if (!deletedInventoryItem) {
        return res
          .status(404)
          .json({ success: false, message: "Inventory item not found" });
      }
      res
        .status(200)
        .json({
          success: true,
          message: "Inventory item deleted successfully",
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error deleting inventory item",
        error: err.message,
      });
    }
  });
//# sourceMappingURL=inventoryController.js.map
