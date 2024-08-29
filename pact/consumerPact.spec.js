const { Pact } = require("@pact-foundation/pact");
const path = require("path");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

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

  before(() => provider.setup());
  after(() => provider.finalize());

  describe("when a request for a resource is made", () => {
    before(() =>
      provider.addInteraction({
        uponReceiving: "a request for a resource",
        withRequest: {
          method: "GET",
          path: "/resource",
        },
        willRespondWith: {
          status: 200,
          body: { data: "Hello World" },
        },
      }),
    );

    it("should receive the correct response", async () => {
      const res = await request(app).get("/resource");
      expect(res.status).to.eql(200);
      expect(res.body).to.eql({ data: "Hello World" });
    });

    afterEach(() => provider.verify());
  });
});
