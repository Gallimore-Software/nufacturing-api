"use strict";
// domain/events/inventoryItemCreatedEvent.ts
Object.defineProperty(exports, "__esModule", { value: true });
// The event class for when an inventory item is created
class InventoryItemCreatedEvent {
    constructor(inventoryItem) {
        this.name = "InventoryItemCreatedEvent"; // Identifier for this event type
        this.inventoryItem = inventoryItem;
        this.createdAt = new Date(); // Set the event creation timestamp
    }
}
exports.default = InventoryItemCreatedEvent;
