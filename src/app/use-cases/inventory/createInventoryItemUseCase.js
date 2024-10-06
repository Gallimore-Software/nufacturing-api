"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventoryModel_1 = require("@models/inventoryModel");
class CreateInventoryItemUseCase {
    static async execute(data) {
        try {
            // Perform validation checks on incoming data
            if (!data.name || !data.sku || !data.category) {
                throw new Error("Missing required fields: name, sku, or category");
            }
            // Check if an inventory item with the same SKU already exists
            const existingItem = await inventoryModel_1.InventoryItem.findOne({ sku: data.sku });
            if (existingItem) {
                throw new Error("Inventory item with this SKU already exists");
            }
            // Create a new inventory item
            const newInventoryItem = new inventoryModel_1.InventoryItem(data);
            // Save to the database
            await newInventoryItem.save();
            // Return the newly created inventory item
            return newInventoryItem;
        }
        catch (err) {
            throw new Error(`Error creating inventory item: ${err.message}`);
        }
    }
}
exports.default = CreateInventoryItemUseCase;
