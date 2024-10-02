import { Inventory } from "@entity/inventory";

describe("Inventory Entity Tests", () => {
  it("should create a valid inventory entity", () => {
    const inventory = new Inventory({
      _id: "1",
      vendorName: "Rice Supplier",
      sku: "BR123",
      ingredientName: "Brown Rice",
      pricePerKg: 25,
      stockQuantity: 100,
      category: "Grains",
      lotCode: "LC001",
    });

    expect(inventory.name).toBe("Brown Rice");
    expect(inventory.quantity).toBe(100);
    expect(inventory.price).toBe(25);
  });

  it("should throw an error when trying to create inventory with negative quantity", () => {
    expect(() => {
      new Inventory({
        name: "Brown Rice",
        sku: "BR123",
        quantity: -10,
        price: 25,
      });
    }).toThrow("Quantity cannot be negative");
  });

  it("should properly update inventory quantities", () => {
    const inventory = new Inventory({
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
