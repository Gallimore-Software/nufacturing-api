import request from "supertest";
import mongoose from "mongoose";
import app from "../app"; // Import your Express app

describe("GET /api/inventory", () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI as string, {
      useUnifiedTopology: true,
    });
  });

  // Close the database connection after all tests have run
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return all inventory items", async () => {
    const res = await request(app).get("/api/inventory");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("items");
  });
});
