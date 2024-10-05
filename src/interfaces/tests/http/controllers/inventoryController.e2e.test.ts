// import { spawn } from "child_process";
// import request from "supertest";
// import app from "../../index"; // Your Express app

// describe("Inventory E2E Tests", () => {
//   let server;

//   beforeAll((done) => {
//     server = spawn("npm", ["start"]);
//     server.stdout.on("data", () => {
//       done();
//     });
//   });

//   afterAll(() => {
//     server.kill();
//   });

//   it("should fetch inventory", async () => {
//     const res = await request(app).get("/api/inventory");
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toEqual([{ id: 1, name: "item1", quantity: 100 }]);
//   });
// });
