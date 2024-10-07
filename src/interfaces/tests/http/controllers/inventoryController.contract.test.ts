// import { Pact } from "@pact-foundation/pact";
// import path from "path";
// import request from "supertest";
// import app from "@app"; // Your Express app

// const provider = new Pact({
//   consumer: "FrontendConsumer",
//   provider: "BackendProvider",
//   port: 1234,
//   log: path.resolve(process.cwd(), "logs", "pact.log"),
//   dir: path.resolve(process.cwd(), "pacts"),
//   logLevel: "info",
//   spec: 2,
// });

// describe("Pact with FrontendConsumer", () => {
//   beforeAll(() => provider.setup());

//   afterAll(() => provider.finalize());

//   describe("when a call to /api/inventory is made", () => {
//     beforeEach(() => {
//       const interaction = {
//         state: "inventory exists",
//         uponReceiving: "a request for inventory",
//         withRequest: {
//           method: "GET",
//           path: "/api/inventory",
//         },
//         willRespondWith: {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//           body: [{ id: 1, name: "item1", quantity: 100 }],
//         },
//       };
//       return provider.addInteraction(interaction);
//     });

//     it("will receive the inventory", () => {
//       return request(app)
//         .get("/api/inventory")
//         .expect(200)
//         .expect("Content-Type", /json/)
//         .then((res) => {
//           expect(res.body).toEqual([{ id: 1, name: "item1", quantity: 100 }]);
//         });
//     });

//     afterEach(() => provider.verify());
//   });
// });
