import EventDispatcher from "@events/eventDispatcher";
import InventoryItemCreatedEvent from "../../domain/events/inventoryItemCreatedEvent";
import logger from "@logging/logger";

interface EventHandler {
  handle(event: InventoryItemCreatedEvent): Promise<void> | void;
}

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
      // Checks if "err" is instance of 'Error' before accessing :)
      if (err instanceof Error) {
        logger.error("Error handling InventoryItemCreatedEvent", {
          error: err.message,
          stack: err.stack,
          event: event,
        });
      } else {
        logger.error("An unknown error occurred", { event: event });
      }
    }
  }
}
// Register the handler with a reusable function
function registerEventHandler(
  eventName: string,
  handlerInstance: EventHandler,
): void {
  EventDispatcher.register(eventName, handlerInstance);
}

// Instantiate and register the LogInventoryCreationHandler
const logInventoryCreationHandler = new LogInventoryCreationHandler();
registerEventHandler(
  InventoryItemCreatedEvent.name,
  logInventoryCreationHandler,
);
