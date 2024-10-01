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
const ProductSKU = require("../../models/product-development-model/productSkuModel");
// Get all product SKUs
exports.getAllProductSKUs = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const productSKUs = yield ProductSKU.find().populate("formula");
      res.status(200).json(productSKUs);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching product SKUs", error: err });
    }
  });
// Get product SKU by ID
exports.getProductSKUById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const productSKU = yield ProductSKU.findById(req.params.skuId).populate(
        "formula",
      );
      if (!productSKU) {
        return res.status(404).json({ message: "Product SKU not found" });
      }
      res.status(200).json(productSKU);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching product SKU", error: err });
    }
  });
// Create a new product SKU
exports.createProductSKU = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const newProductSKU = new ProductSKU(req.body);
      yield newProductSKU.save();
      res.status(201).json(newProductSKU);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error creating product SKU", error: err });
    }
  });
// Update product SKU
exports.updateProductSKU = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedProductSKU = yield ProductSKU.findByIdAndUpdate(
        req.params.skuId,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!updatedProductSKU) {
        return res.status(404).json({ message: "Product SKU not found" });
      }
      res.status(200).json(updatedProductSKU);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error updating product SKU", error: err });
    }
  });
// Delete product SKU
exports.deleteProductSKU = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedProductSKU = yield ProductSKU.findByIdAndDelete(
        req.params.skuId,
      );
      if (!deletedProductSKU) {
        return res.status(404).json({ message: "Product SKU not found" });
      }
      res.status(200).json({ message: "Product SKU deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting product SKU", error: err });
    }
  });
//# sourceMappingURL=productSkuController.js.map
