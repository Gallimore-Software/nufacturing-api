const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Your Express app

describe("GET /api/inventory", () => {
  // Before all tests, connect to the database
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // After all tests, close the database connection
  afterAll(async () => {
    await mongoose.connection.close();
    app.close(); // If you export the server instance from index.js
  });

  it("should return all inventory items", async () => {
    const res = await request(app).get("/api/inventory");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("items");
  });
});
