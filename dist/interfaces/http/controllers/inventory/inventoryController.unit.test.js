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
const inventoryController = require("./inventoryController");
describe("Inventory Controller Unit Tests", () => {
  it("should fetch inventory", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const inventory = [{ id: 1, name: "item1", quantity: 100 }];
      jest
        .spyOn(inventoryController, "getInventory")
        .mockImplementation(() => inventory);
      const res = yield request(app).get("/api/inventory");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(inventory);
    }));
});
//# sourceMappingURL=inventoryController.unit.test.js.map
