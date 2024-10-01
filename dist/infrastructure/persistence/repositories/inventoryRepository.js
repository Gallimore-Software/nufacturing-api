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
const inventoryModel_1 = __importDefault(require("../models/inventoryModel"));
class MongooseInventoryRepository {
  // Find inventory item by name or SKU (used for checking duplicates)
  static findByNameOrSKU(name, sku) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.findOne({
        $or: [{ name }, { sku }],
      });
    });
  }
  // Create a new inventory item
  static create(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const newInventoryItem = new inventoryModel_1.default(data);
      return yield newInventoryItem.save();
    });
  }
  // Find inventory item by ID
  static findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.findById(id);
    });
  }
  // Find all inventory items (with optional filtering)
  static findAll() {
    return __awaiter(this, arguments, void 0, function* (filter = {}) {
      return yield inventoryModel_1.default.find(filter);
    });
  }
  // Update inventory item by ID
  static updateById(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    });
  }
  // Delete inventory item by ID
  static deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.findByIdAndDelete(id);
    });
  }
  // Find inventory items by date range (for tracking inventory over time)
  static findByDateRange(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });
    });
  }
  // Combine inventory items by a given attribute (e.g., date for batch processing)
  static combineByAttribute(attribute) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.aggregate([
        {
          $group: {
            _id: `$${attribute}`,
            items: { $push: "$$ROOT" },
          },
        },
      ]);
    });
  }
  // Handle unfinished or customer-supplied products
  static findUnfinishedOrCustomerSupplied() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.find({
        $or: [{ status: "unfinished" }, { customerSupplied: true }],
      });
    });
  }
  // Live updates (fetch inventory item with real-time locking, if necessary)
  static findAndLock(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.findById(id).session(); // Requires transaction support for locking
    });
  }
  // Generate stale price alerts (find inventory items with outdated prices)
  static findStalePrices(lastUpdatedThreshold) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.find({
        priceLastUpdated: { $lt: lastUpdatedThreshold },
      });
    });
  }
  // Update inventory stock quantity
  static updateStockQuantity(id, quantityChange) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.findByIdAndUpdate(
        id,
        { $inc: { stockQuantity: quantityChange } },
        { new: true },
      );
    });
  }
  // Update price information
  static updatePrice(id, newPrice) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.findByIdAndUpdate(
        id,
        { price: newPrice, priceLastUpdated: new Date() },
        { new: true },
      );
    });
  }
  // Mark inventory as processed (e.g., for batch completion)
  static markAsProcessed(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield inventoryModel_1.default.findByIdAndUpdate(
        id,
        { status: "processed" },
        { new: true },
      );
    });
  }
}
module.exports = MongooseInventoryRepository;
//# sourceMappingURL=inventoryRepository.js.map
