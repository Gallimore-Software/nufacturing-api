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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = __importDefault(
  require("../../models/sales-model/orderModel"),
);
// Get all orders
exports.getAllOrders = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const orders = yield orderModel_1.default
        .find()
        .populate("customer products.productId");
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: "Error fetching orders", error: err });
    }
  });
// Get order by ID
exports.getOrderById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const order = yield orderModel_1.default
        .findById(req.params.orderId)
        .populate("customer products.productId");
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: "Error fetching order", error: err });
    }
  });
// Create a new order
exports.createOrder = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const newOrder = new orderModel_1.default(req.body);
      yield newOrder.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).json({ message: "Error creating order", error: err });
    }
  });
// Update order
exports.updateOrder = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedOrder = yield orderModel_1.default.findByIdAndUpdate(
        req.params.orderId,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(400).json({ message: "Error updating order", error: err });
    }
  });
// Delete order
exports.deleteOrder = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedOrder = yield orderModel_1.default.findByIdAndDelete(
        req.params.orderId,
      );
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting order", error: err });
    }
  });
//# sourceMappingURL=orderController.js.map
