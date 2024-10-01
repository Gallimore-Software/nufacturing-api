class InventoryItemCreatedEvent {
  constructor(inventoryItem) {
    this.inventoryItem = inventoryItem;
  }
}

module.exports = InventoryItemCreatedEvent;
