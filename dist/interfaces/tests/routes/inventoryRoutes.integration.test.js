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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app")); // Import your Express app
describe("GET /api/inventory", () => {
  // Connect to the database before running any tests
  beforeAll(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield mongoose_1.default.connect(process.env.DB_URI, {
        useUnifiedTopology: true,
      });
    }),
  );
  // Close the database connection after all tests have run
  afterAll(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield mongoose_1.default.connection.close();
    }),
  );
  it("should return all inventory items", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const res = yield (0, supertest_1.default)(app_1.default).get(
        "/api/inventory",
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("items");
    }));
});
//# sourceMappingURL=inventoryRoutes.integration.test.js.map
