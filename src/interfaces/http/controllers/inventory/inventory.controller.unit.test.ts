import request from "supertest";
import app from "@@index";
import * as inventoryController from "@interfaces/http/controllers/inventory/inventory.controller";

describe("Inventory Controller Unit Tests", () => {
  it("should fetch inventory", async () => {
    const inventory = [{ id: 1, name: "item1", quantity: 100 }];
    jest
      .spyOn(inventoryController, "getAllInventoryItems")
      .mockImplementation(() => inventory);

    const res = await request(app).get("/api/inventory");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(inventory);
  });
});
