import InventoryItem from "../models/inventoryModel";

class MongooseInventoryRepository {
  // Find inventory item by name or SKU (used for checking duplicates)
  static async findByNameOrSKU(name, sku) {
    return await InventoryItem.findOne({ $or: [{ name }, { sku }] });
  }

  // Create a new inventory item
  static async create(data) {
    const newInventoryItem = new InventoryItem(data);
    return await newInventoryItem.save();
  }

  // Find inventory item by ID
  static async findById(id) {
    return await InventoryItem.findById(id);
  }

  // Find all inventory items (with optional filtering)
  static async findAll(filter = {}) {
    return await InventoryItem.find(filter);
  }

  // Update inventory item by ID
  static async updateById(id, updateData) {
    return await InventoryItem.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Delete inventory item by ID
  static async deleteById(id) {
    return await InventoryItem.findByIdAndDelete(id);
  }

  // Find inventory items by date range (for tracking inventory over time)
  static async findByDateRange(startDate, endDate) {
    return await InventoryItem.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  }

  // Combine inventory items by a given attribute (e.g., date for batch processing)
  static async combineByAttribute(attribute) {
    return await InventoryItem.aggregate([
      {
        $group: {
          _id: `$${attribute}`,
          items: { $push: "$$ROOT" },
        },
      },
    ]);
  }

  // Handle unfinished or customer-supplied products
  static async findUnfinishedOrCustomerSupplied() {
    return await InventoryItem.find({
      $or: [{ status: "unfinished" }, { customerSupplied: true }],
    });
  }

  // Live updates (fetch inventory item with real-time locking, if necessary)
  static async findAndLock(id) {
    return await InventoryItem.findById(id).session(); // Requires transaction support for locking
  }

  // Generate stale price alerts (find inventory items with outdated prices)
  static async findStalePrices(lastUpdatedThreshold) {
    return await InventoryItem.find({
      priceLastUpdated: { $lt: lastUpdatedThreshold },
    });
  }

  // Update inventory stock quantity
  static async updateStockQuantity(id, quantityChange) {
    return await InventoryItem.findByIdAndUpdate(
      id,
      { $inc: { stockQuantity: quantityChange } },
      { new: true },
    );
  }

  // Update price information
  static async updatePrice(id, newPrice) {
    return await InventoryItem.findByIdAndUpdate(
      id,
      { price: newPrice, priceLastUpdated: new Date() },
      { new: true },
    );
  }

  // Mark inventory as processed (e.g., for batch completion)
  static async markAsProcessed(id) {
    return await InventoryItem.findByIdAndUpdate(
      id,
      { status: "processed" },
      { new: true },
    );
  }
}

module.exports = MongooseInventoryRepository;
