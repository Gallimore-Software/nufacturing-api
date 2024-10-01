import request from "supertest";
import app from "../../src/index";

describe("Integration Test: Inventory API", () => {
  it("should create a new inventory item and retrieve it", async () => {
    const newItem = {
      name: "Steel Rod",
      sku: "SR123",
      quantity: 50,
      price: 10,
    };
    const createResponse = await request(app)
      .post("/api/inventory")
      .send(newItem);
    expect(createResponse.status).toBe(201);
    const getResponse = await request(app).get(
      `/api/inventory/${createResponse.body._id}`,
    );
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe("Steel Rod");
  });
});
