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
const customerModel_1 = __importDefault(
  require("../../models/sales-model/customerModel"),
);
// Get all customers
exports.getAllCustomers = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const customers = yield customerModel_1.default.find();
      res.status(200).json(customers);
    } catch (err) {
      res.status(500).json({ message: "Error fetching customers", error: err });
    }
  });
// Get customer by ID
exports.getCustomerById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const customer = yield customerModel_1.default.findById(
        req.params.customerId,
      );
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json({ message: "Error fetching customer", error: err });
    }
  });
// Create a new customer
exports.createCustomer = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const newCustomer = new customerModel_1.default(req.body);
      yield newCustomer.save();
      res.status(201).json(newCustomer);
    } catch (err) {
      res.status(400).json({ message: "Error creating customer", error: err });
    }
  });
// Update customer
exports.updateCustomer = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedCustomer = yield customerModel_1.default.findByIdAndUpdate(
        req.params.customerId,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(updatedCustomer);
    } catch (err) {
      res.status(400).json({ message: "Error updating customer", error: err });
    }
  });
// Delete customer
exports.deleteCustomer = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedCustomer = yield customerModel_1.default.findByIdAndDelete(
        req.params.customerId,
      );
      if (!deletedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting customer", error: err });
    }
  });
//# sourceMappingURL=customerController.js.map
