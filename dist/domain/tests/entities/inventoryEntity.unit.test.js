"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_1 = require("../../entities/inventory");
describe("Inventory Entity Tests", () => {
  it("should create a valid inventory entity", () => {
    const inventory = new inventory_1.Inventory({
      name: "Brown Rice",
      sku: "BR123",
      quantity: 100,
      price: 25,
    });
    expect(inventory.name).toBe("Brown Rice");
    expect(inventory.quantity).toBe(100);
    expect(inventory.price).toBe(25);
  });
  it("should throw an error when trying to create inventory with negative quantity", () => {
    expect(() => {
      new inventory_1.Inventory({
        name: "Brown Rice",
        sku: "BR123",
        quantity: -10,
        price: 25,
      });
    }).toThrow("Quantity cannot be negative");
  });
  it("should properly update inventory quantities", () => {
    const inventory = new inventory_1.Inventory({
      name: "Brown Rice",
      sku: "BR123",
      quantity: 100,
      price: 25,
    });
    inventory.addQuantity(50);
    expect(inventory.quantity).toBe(150);
    inventory.reduceQuantity(30);
    expect(inventory.quantity).toBe(120);
  });
});
//# sourceMappingURL=inventoryEntity.unit.test.js.map
