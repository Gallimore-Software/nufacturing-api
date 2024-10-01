"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const request = require("supertest");
const app = require("../../index"); // Your Express app
const db = require("../../models"); // Your DB models
describe("Inventory Integration Tests", () => {
  beforeAll(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield db.sequelize.sync({ force: true }); // Sync DB for testing
    }),
  );
  it("should fetch inventory from DB", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield db.Inventory.create({ id: 1, name: "item1", quantity: 100 });
      const res = yield request(app).get("/api/inventory");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([{ id: 1, name: "item1", quantity: 100 }]);
    }));
});
//# sourceMappingURL=inventoryController.integration.test.js.map
