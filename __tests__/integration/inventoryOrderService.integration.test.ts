import { InventoryService } from "@@src/application/inventory/inventoryService";
import { OrderService } from "@@src/application/orders/orderService";

describe("Integration Test: Inventory and Order Services", () => {
  it("should reduce inventory quantity when an order is placed", async () => {
    const inventoryService = new InventoryService();
    const orderService = new OrderService();

    const inventoryItem = await inventoryService.createItem({
      name: "Steel Rod",
      sku: "SR123",
      quantity: 100,
      price: 10,
    });
    await orderService.placeOrder({ itemId: inventoryItem.id, quantity: 10 });

    const updatedInventory = await inventoryService.getItemById(
      inventoryItem.id,
    );
    expect(updatedInventory.quantity).toBe(90);
  });
});
