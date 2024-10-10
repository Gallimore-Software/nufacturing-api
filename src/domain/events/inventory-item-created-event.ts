// Define a base event interface for consistency across all events
interface BaseEvent {
  name: string; // Common property to identify the event type
  createdAt: Date;
}

// Define the InventoryItem interface to represent the item details
interface InventoryItem {
  _id: string;
  sku: string;
  createdAt: Date;
  createdBy: string;
}

// The event class for when an inventory item is created
class InventoryItemCreatedEvent implements BaseEvent {
  name: string;
  inventoryItem: InventoryItem;
  createdAt: Date;

  constructor(inventoryItem: InventoryItem) {
    this.name = 'InventoryItemCreatedEvent'; // Identifier for this event type
    this.inventoryItem = inventoryItem;
    this.createdAt = new Date(); // Set the event creation timestamp
  }
}

export default InventoryItemCreatedEvent;
