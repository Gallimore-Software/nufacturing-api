import { InventoryItem } from "@models/inventoryModel";

interface InventoryItemData {
  name: string;
  sku: string;
  category: string;
}

class CreateInventoryItemUseCase {
  static async execute(data: InventoryItemData) {
    try {
      // Perform validation checks on incoming data
      if (!data.name || !data.sku || !data.category) {
        throw new Error("Missing required fields: name, sku, or category");
      }

      // Check if an inventory item with the same SKU already exists
      const existingItem = await InventoryItem.findOne({ sku: data.sku });
      if (existingItem) {
        throw new Error("Inventory item with this SKU already exists");
      }

      // Create a new inventory item
      const newInventoryItem = new InventoryItem(data);

      // Save to the database
      await newInventoryItem.save();

      // Return the newly created inventory item
      return newInventoryItem;
    } catch (err) {
      throw new Error(
        `Error creating inventory item: ${(err as Error).message}`,
      );
    }
  }
}

export default CreateInventoryItemUseCase;
