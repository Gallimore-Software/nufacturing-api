const request = require("supertest");
const app = require("../index"); // Your Express app

describe("GET /api/inventory", () => {
  it("should return all inventory items", async () => {
    const res = await request(app).get("/api/inventory");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("items");
  });
});
