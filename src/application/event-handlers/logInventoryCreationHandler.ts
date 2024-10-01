import EventDispatcher from "../utils/eventDispatcher";
import InventoryItemCreatedEvent from "../events/inventoryItemCreatedEvent";
import logger from "../../infrastructure/logging/logger";

class LogInventoryCreationHandler {
  async handle(event) {
    try {
      if (!event || !event.inventoryItem) {
        throw new Error("Invalid event: inventoryItem is missing");
      }

      // Log inventory creation with relevant details
      logger.info("Inventory item created", {
        itemId: event.inventoryItem._id,
        sku: event.inventoryItem.sku,
        createdAt: event.inventoryItem.createdAt,
        createdBy: event.inventoryItem.createdBy,
      });
    } catch (err) {
      logger.error("Error handling InventoryItemCreatedEvent", {
        error: err.message,
        stack: err.stack,
        event: event,
      });
    }
  }
}

// Register the handler with a reusable function
function registerEventHandler(eventName, handlerInstance) {
  EventDispatcher.register(eventName, handlerInstance);
}

// Instantiate and register the LogInventoryCreationHandler
const logInventoryCreationHandler = new LogInventoryCreationHandler();
registerEventHandler(
  InventoryItemCreatedEvent.name,
  logInventoryCreationHandler,
);
