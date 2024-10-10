export interface InventoryItemDTO {
  itemId: string;
  name: string;
  sku: string;
  category: string; // Reference to Category ID
  type: 'Raw Materials' | 'Components' | 'Work in Progress' | 'Finished Goods';
  scientificName?: string;
  picture?: string; // URL for image storage
  description: string;
  vendor: string; // Reference to Vendor ID
  supplier?: string; // Reference to Supplier ID
  associatedFormulas?: ReferenceDTO[];
  associatedProductSKUs?: ReferenceDTO[];
  associatedBatchNumbers?: ReferenceDTO[];
  associatedPOs?: ReferenceDTO[];
  associatedLabTests?: ReferenceDTO[];
  associatedReceivements?: ReferenceDTO[];
  warehouseLocation?: string; // Reference to WarehouseLocation ID
  batchTracking?: BatchTrackingDTO[];
  certificateOfAuthenticity?: string; // URL for certificate storage
  inventoryCategory:
    | 'Nufacturing'
    | 'Customer Supplied'
    | 'Research Lab'
    | 'Ancillary';
  unitOfMeasurement: string; // E.g., kg, lbs
  pricePerUnit: number;
  quantities: QuantitiesDTO;
  createdBy: string; // Reference to User ID
  createdAt?: Date;
  updatedAt?: Date;
}

// CategoryDTO.ts
export interface CategoryDTO {
  id: string;
  name: string;
}

// SupplierDTO.ts
export interface SupplierDTO {
  id: string;
  name: string;
  contactInformation?: string;
}

// WarehouseLocationDTO.ts
export interface WarehouseLocationDTO {
  id: string;
  name: string;
  address?: string;
  capacity?: number;
}

// ReferenceDTO.ts
export interface ReferenceDTO {
  refId: string; // Reference to related entity ID
  onModel:
    | 'Formula'
    | 'ProductSKU'
    | 'BatchRecords'
    | 'PurchaseOrder'
    | 'LabTest'
    | 'Receiving';
}

// QuantityPriceDTO.ts
export interface QuantityPriceDTO {
  minOrderQuantity: number;
  pricePerQuantity: number;
  dateUpdated: Date;
}

// BatchTrackingDTO.ts
export interface BatchTrackingDTO {
  lotCode: string;
  dateReceived: Date;
  quantity: number;
  supplier: string; // Reference to Supplier ID
  warehouseLocation: string; // Reference to WarehouseLocation ID
  allocatedQuantity?: number;
  availableQuantity: number;
}

// QuantitiesDTO.ts
export interface QuantitiesDTO {
  minRestockQuantity: number;
  inStock: number;
  minOrderQuantities: QuantityPriceDTO[];
  availableQuantity?: number;
  onHoldQuantity?: number;
  allocatedQuantity?: number;
  quarantinedQuantity?: number;
}
