interface InventoryItem {
  _id: string;
  sku: string;
  createdAt: Date;
  createdBy: string;
}
class InventoryItemCreatedEvent {
  inventoryItem: InventoryItem;

  constructor(inventoryItem: InventoryItem) {
    this.inventoryItem = inventoryItem;
  }
}

export default InventoryItemCreatedEvent;
