const request = require("supertest");
const app = require("../../index"); // Your Express app
const inventoryController = require("./inventoryController");

describe("Inventory Controller Unit Tests", () => {
  it("should fetch inventory", async () => {
    const inventory = [{ id: 1, name: "item1", quantity: 100 }];
    jest
      .spyOn(inventoryController, "getInventory")
      .mockImplementation(() => inventory);

    const res = await request(app).get("/api/inventory");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(inventory);
  });
});
