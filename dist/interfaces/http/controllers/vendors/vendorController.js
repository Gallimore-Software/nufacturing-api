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
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
// Create a new vendor
exports.createVendor = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vendor = new vendorModel_1.default(req.body);
      yield vendor.save();
      res.status(201).json(vendor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// Get all vendors
exports.getAllVendors = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vendors = yield vendorModel_1.default.find();
      res.status(200).json(vendors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Get a single vendor by ID
exports.getVendorById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vendor = yield vendorModel_1.default.findById(req.params.id);
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });
      res.status(200).json(vendor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Update a vendor by ID
exports.updateVendorById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vendor = yield vendorModel_1.default.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
      );
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });
      res.status(200).json(vendor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// Delete a vendor by ID
exports.deleteVendorById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vendor = yield vendorModel_1.default.findByIdAndDelete(
        req.params.id,
      );
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });
      res.status(200).json({ message: "Vendor deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//# sourceMappingURL=vendorController.js.map
