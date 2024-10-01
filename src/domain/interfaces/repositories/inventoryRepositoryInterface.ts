// src/domain/interfaces/repositories/inventoryRepositoryInterface.ts

export interface InventoryRepositoryInterface {
  // Create a new inventory item
  create(data: {
    name: string;
    sku: string;
    quantity: number;
    price: number;
    expirationDate?: Date;
    supplierId?: string;
    lotId?: string;
    customerSupplied?: boolean;
  }): Promise<any>;

  // Find an inventory item by ID
  findById(id: string): Promise<any | null>;

  // Get all inventory items with optional filters (e.g., name, status, supplier)
  findAll(filterParams?: {
    name?: string;
    sku?: string;
    status?: "raw" | "wip" | "finished";
    supplierId?: string;
    dateRange?: { startDate: Date; endDate: Date };
  }): Promise<any[]>;

  // Update an inventory item by its ID
  updateById(
    id: string,
    updateData: {
      name?: string;
      quantity?: number;
      price?: number;
      expirationDate?: Date;
      status?: "raw" | "wip" | "finished";
    },
  ): Promise<any | null>;

  // Delete an inventory item by its ID
  deleteById(id: string): Promise<void>;

  // Find an item by name or SKU
  findByNameOrSKU(name: string, sku: string): Promise<any | null>;

  // Find unfinished inventory items (those still in processing)
  findUnfinishedProducts(): Promise<any[]>;

  // Find customer-supplied inventory items
  findCustomerSuppliedProducts(customerId?: string): Promise<any[]>;

  // Track inventory changes over a specified time range (e.g., historical inventory)
  trackInventoryOverTime(startDate: Date, endDate: Date): Promise<any[]>;

  // Live update inventory quantity (increment or decrement)
  liveUpdateQuantity(itemId: string, quantityChange: number): Promise<any>;

  // Track inventory by production stage (raw materials, work-in-progress, finished goods)
  trackByStage(stage: "raw" | "wip" | "finished"): Promise<any[]>;

  // Generate audit logs for a specific inventory item
  generateAuditLogs(itemId: string): Promise<any[]>;

  // Generate alerts for items with prices older than 30 days
  generateStalePriceAlerts(): Promise<any[]>;

  // Assign a portion of existing inventory (FIFO or custom) to a new lot
  assignInventoryToLot(
    items: Array<{ itemId: string; quantity: number }>,
    lotId: string,
  ): Promise<any>;

  // Get inventory items grouped by receipt dates (for FIFO purposes)
  getInventoryGroupedByDate(itemName: string): Promise<any[]>;

  // Partition inventory into lots based on group details
  partitionInventoryForLot(
    lotId: string,
    partitionDetails: Array<{ date: Date; quantity: number }>,
  ): Promise<any>;

  // Mix inventory from different date groups into a single lot
  mixInventoryFromMultipleDates(
    lotId: string,
    items: Array<{ itemId: string; quantity: number }>,
  ): Promise<any>;

  // Mark items as in-progress (used during production/processing)
  markAsInProgress(
    itemId: string,
    progressDetails: { stage: string; startDate: Date },
  ): Promise<any>;

  // Mark items that have yet to be processed
  markAsPendingProcessing(itemId: string): Promise<any>;

  // Create a quick entry for a new inventory item (minimal required data)
  quickCreateInventoryEntry(data: {
    name: string;
    quantity: number;
    sku: string;
  }): Promise<any>;

  // Get the oldest available inventory items for a specific material (for FIFO usage)
  getOldestAvailableItems(materialName: string, limit?: number): Promise<any[]>;

  // Combine multiple date-grouped inventories into one for processing
  combineDateGroupedInventory(
    materialName: string,
    groupDetails: {
      combinedLotId: string;
      items: Array<{ date: Date; quantity: number }>;
    },
  ): Promise<any>;

  // Find inventory items with stale price data (> 30 days old) and mark them for update
  findAndHighlightStalePrices(): Promise<any[]>;

  // Reserve inventory for a production run or customer order
  reserveInventory(
    itemId: string,
    quantity: number,
    reservedFor: "production" | "order",
    reservedUntil?: Date,
  ): Promise<any>;

  // Get inventory items with low stock, given a custom threshold
  findLowStockItems(threshold: number): Promise<any[]>;

  // Release reserved inventory back to available stock
  releaseReservedInventory(itemId: string, quantity: number): Promise<any>;

  // Generate reports on current inventory levels, including grouping and batch details
  generateInventoryReports(filterParams?: {
    stage?: "raw" | "wip" | "finished";
    supplierId?: string;
    lotId?: string;
    dateRange?: { startDate: Date; endDate: Date };
  }): Promise<any[]>;

  // Calculate the total value of inventory currently in stock
  calculateInventoryValue(): Promise<number>;

  // Get live status updates for work-in-progress inventory
  getLiveWIPStatus(): Promise<any[]>;

  // Track customer-supplied inventory specifically
  trackCustomerSuppliedInventory(customerId: string): Promise<any[]>;

  // Remove obsolete or redundant inventory from the system
  removeObsoleteInventory(
    items: Array<{ itemId: string; quantity: number }>,
  ): Promise<void>;

  // Update inventory price and mark as updated for audit purposes
  updatePrice(itemId: string, newPrice: number): Promise<any>;

  // Track inventory by specific warehouse locations
  trackInventoryByLocation(locationId: string): Promise<any[]>;

  // Get historical inventory data to analyze trends and changes
  getHistoricalInventoryData(filterParams: {
    itemId?: string;
    name?: string;
    dateRange: { startDate: Date; endDate: Date };
  }): Promise<any[]>;

  // Allocate inventory across different locations or warehouses
  allocateInventoryAcrossLocations(
    itemId: string,
    allocationDetails: Array<{ locationId: string; quantity: number }>,
  ): Promise<any>;
}
