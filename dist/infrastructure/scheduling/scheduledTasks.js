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
const node_cron_1 = __importDefault(require("node-cron"));
const userModel_1 = __importDefault(require("../models/userModel"));
// Schedule the task to run daily
node_cron_1.default.schedule("0 0 * * *", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      // Delete unverified users older than a week
      const result = yield userModel_1.default.deleteMany({
        verified: false,
        createdAt: { $lte: oneWeekAgo },
      });
      console.log(`Deleted ${result.deletedCount} unverified users`);
    } catch (err) {
      console.error("Error deleting unverified users:", err);
    }
  }),
);
//# sourceMappingURL=scheduledTasks.js.map
