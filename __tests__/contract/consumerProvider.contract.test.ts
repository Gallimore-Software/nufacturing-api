import path from "path";

import { Pact } from "@pact-foundation/pact";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import request from "supertest";

import app from "../src/app"; // Adjust this import to point to your Express app

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Pact", () => {
  const provider = new Pact({
    consumer: "ConsumerService",
    provider: "ProviderService",
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "INFO",
    spec: 2,
  });

  before(async () => {
    await provider.setup();
  });

  after(async () => {
    await provider.finalize();
  });

  describe("when a request for a resource is made", () => {
    before(async () => {
      await provider.addInteraction({
        uponReceiving: "a request for a resource",
        withRequest: {
          method: "GET",
          path: "/resource",
        },
        willRespondWith: {
          status: 200,
          body: { data: "Hello World" },
        },
      });
    });

    it("should receive the correct response", async () => {
      const res = await request(app).get("/resource");
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ data: "Hello World" });
    });

    afterEach(async () => {
      await provider.verify();
    });
  });
});
