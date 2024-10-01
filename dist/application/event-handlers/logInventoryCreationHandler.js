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
const eventDispatcher_1 = __importDefault(require("../utils/eventDispatcher"));
const inventoryItemCreatedEvent_1 = __importDefault(
  require("../events/inventoryItemCreatedEvent"),
);
const logger_1 = __importDefault(
  require("../../infrastructure/logging/logger"),
);
class LogInventoryCreationHandler {
  handle(event) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!event || !event.inventoryItem) {
          throw new Error("Invalid event: inventoryItem is missing");
        }
        // Log inventory creation with relevant details
        logger_1.default.info("Inventory item created", {
          itemId: event.inventoryItem._id,
          sku: event.inventoryItem.sku,
          createdAt: event.inventoryItem.createdAt,
          createdBy: event.inventoryItem.createdBy,
        });
      } catch (err) {
        logger_1.default.error("Error handling InventoryItemCreatedEvent", {
          error: err.message,
          stack: err.stack,
          event: event,
        });
      }
    });
  }
}
// Register the handler with a reusable function
function registerEventHandler(eventName, handlerInstance) {
  eventDispatcher_1.default.register(eventName, handlerInstance);
}
// Instantiate and register the LogInventoryCreationHandler
const logInventoryCreationHandler = new LogInventoryCreationHandler();
registerEventHandler(
  inventoryItemCreatedEvent_1.default.name,
  logInventoryCreationHandler,
);
//# sourceMappingURL=logInventoryCreationHandler.js.map
