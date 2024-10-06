"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventDispatcher_1 = __importDefault(require("@infrastructure/event-handlers/eventDispatcher"));
const inventoryItemCreatedEvent_1 = __importDefault(require("@domain/events/inventoryItemCreatedEvent"));
const logger_1 = __importDefault(require("@infrastructure/logging/logger"));
class LogInventoryCreationHandler {
    async handle(event) {
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
        }
        catch (err) {
            if (err instanceof Error) {
                logger_1.default.error("Error handling InventoryItemCreatedEvent", {
                    error: err.message,
                    stack: err.stack,
                    event,
                });
            }
            else {
                logger_1.default.error("An unknown error occurred", { event });
            }
        }
    }
}
// Update registerEventHandler to use EventHandler<BaseEvent>
function registerEventHandler(eventName, handlerInstance) {
    eventDispatcher_1.default.register(eventName, handlerInstance);
}
// Instantiate and register the LogInventoryCreationHandler
const logInventoryCreationHandler = new LogInventoryCreationHandler();
registerEventHandler(inventoryItemCreatedEvent_1.default.name, logInventoryCreationHandler);
