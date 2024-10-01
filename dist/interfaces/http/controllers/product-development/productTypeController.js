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
const productTypeModel_1 = __importDefault(
  require("../../models/product-development-model/productTypeModel"),
);
// Get all product types
exports.getAllProductTypes = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const productTypes = yield productTypeModel_1.default.find();
      res.status(200).json(productTypes);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching product types", error: err });
    }
  });
// Get product type by ID
exports.getProductTypeById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const productType = yield productTypeModel_1.default.findById(
        req.params.typeId,
      );
      if (!productType) {
        return res.status(404).json({ message: "Product type not found" });
      }
      res.status(200).json(productType);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching product type", error: err });
    }
  });
// Create a new product type
exports.createProductType = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const newProductType = new productTypeModel_1.default(req.body);
      yield newProductType.save();
      res.status(201).json(newProductType);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error creating product type", error: err });
    }
  });
// Update product type
exports.updateProductType = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedProductType =
        yield productTypeModel_1.default.findByIdAndUpdate(
          req.params.typeId,
          req.body,
          {
            new: true,
            runValidators: true,
          },
        );
      if (!updatedProductType) {
        return res.status(404).json({ message: "Product type not found" });
      }
      res.status(200).json(updatedProductType);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error updating product type", error: err });
    }
  });
// Delete product type
exports.deleteProductType = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedProductType =
        yield productTypeModel_1.default.findByIdAndDelete(req.params.typeId);
      if (!deletedProductType) {
        return res.status(404).json({ message: "Product type not found" });
      }
      res.status(200).json({ message: "Product type deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting product type", error: err });
    }
  });
//# sourceMappingURL=productTypeController.js.map
