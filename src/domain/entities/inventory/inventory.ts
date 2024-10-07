// COMMENTED THIS, SINCE NO CURRENT REFERENCES FOUND!

// export class Inventory {
//   constructor(
//     public readonly itemId: string,
//     public name: string,
//     public sku: string,
//     public category: string, // This could be represented as a Category value object or ID
//     public type:
//       | "Raw Materials"
//       | "Components"
//       | "Work in Progress"
//       | "Finished Goods",
//     public description: string,
//     public vendor: string, // Reference to Vendor ID
//     public supplier?: string, // Optional reference to Supplier ID
//     public scientificName?: string,
//     public picture?: string, // URL for image storage
//     public warehouseLocation?: string, // Optional reference to WarehouseLocation ID
//     public batchTracking: BatchTracking[] = [],
//     public certificateOfAuthenticity?: string, // URL for certificate storage
//     public inventoryCategory:
//       | "Nufacturing"
//       | "Customer Supplied"
//       | "Research Lab"
//       | "Ancillary",
//     public unitOfMeasurement: string, // E.g., kg, lbs
//     public pricePerUnit: number,
//     public quantities: Quantities,
//     public createdBy: string, // User ID of creator
//     public createdAt: Date = new Date(),
//     public updatedAt: Date = new Date(),
//   ) {}

//   updateDetails(
//     name?: string,
//     description?: string,
//     scientificName?: string,
//     pricePerUnit?: number,
//     updatedBy?: string,
//   ): void {
//     if (name) this.name = name;
//     if (description) this.description = description;
//     if (scientificName) this.scientificName = scientificName;
//     if (pricePerUnit) this.pricePerUnit = pricePerUnit;
//     this.updatedAt = new Date();
//   }

//   addBatchTracking(batch: BatchTracking): void {
//     this.batchTracking.push(batch);
//     this.updatedAt = new Date();
//   }

//   calculateTotalAvailableQuantity(): number {
//     return this.batchTracking.reduce(
//       (total, batch) => total + batch.availableQuantity,
//       this.quantities.availableQuantity || 0,
//     );
//   }

//   // Other business logic methods can be added here
// }

// export class BatchTracking {
//   constructor(
//     public readonly lotCode: string,
//     public dateReceived: Date,
//     public quantity: number,
//     public supplier: string, // Reference to Supplier ID
//     public warehouseLocation: string, // Reference to WarehouseLocation ID
//     public allocatedQuantity: number = 0,
//     public availableQuantity: number,
//   ) {}
// }

// export class Quantities {
//   constructor(
//     public minRestockQuantity: number,
//     public inStock: number,
//     public minOrderQuantities: QuantityPrice[] = [],
//     public availableQuantity?: number,
//     public onHoldQuantity?: number,
//     public allocatedQuantity?: number,
//     public quarantinedQuantity?: number,
//   ) {}
// }

// export class QuantityPrice {
//   constructor(
//     public minOrderQuantity: number,
//     public pricePerQuantity: number,
//     public dateUpdated: Date = new Date(),
//   ) {}

//   markAsStale(): void {
//     const daysSinceUpdate =
//       (new Date().getTime() - this.dateUpdated.getTime()) / (1000 * 3600 * 24);
//     if (daysSinceUpdate > 30) {
//       // Logic for marking price as stale can be implemented here
//     }
//   }
// }
