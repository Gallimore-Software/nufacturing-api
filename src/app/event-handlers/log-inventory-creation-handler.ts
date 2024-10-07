import InventoryItemCreatedEvent from "@domain/events/inventory-item-created-event";
import EventDispatcher from "@infrastructure/event-handlers/event-dispatcher";
import logger from "@infrastructure/logging/logger";

// Define a base event type
interface BaseEvent {
  name: string;
}

// Define a generic EventHandler interface for events that extend BaseEvent
interface EventHandler<T extends BaseEvent> {
  handle(event: T): Promise<void> | void;
}

class LogInventoryCreationHandler
  implements EventHandler<InventoryItemCreatedEvent>
{
  async handle(event: InventoryItemCreatedEvent): Promise<void> {
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
      if (err instanceof Error) {
        logger.error("Error handling InventoryItemCreatedEvent", {
          error: err.message,
          stack: err.stack,
          event,
        });
      } else {
        logger.error("An unknown error occurred", { event });
      }
    }
  }
}

// Update registerEventHandler to use EventHandler<BaseEvent>
function registerEventHandler<T extends BaseEvent>(
  eventName: string,
  handlerInstance: EventHandler<T>,
): void {
  EventDispatcher.register(eventName, handlerInstance);
}

// Instantiate and register the LogInventoryCreationHandler
const logInventoryCreationHandler = new LogInventoryCreationHandler();
registerEventHandler(
  InventoryItemCreatedEvent.name,
  logInventoryCreationHandler,
);
