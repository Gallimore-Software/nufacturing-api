const request = require("supertest");
const app = require("../app");

describe("GET /api/inventory", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/api/inventory");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});
