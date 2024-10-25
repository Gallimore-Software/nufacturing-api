import mongoose from 'mongoose';
import {
  InventoryItem,
  Category,
  Supplier,
  WarehouseLocation,
} from '../models/inventory/inventory-model'; // No need for .js, TypeScript will resolve .ts automatically
import FinishedGoodsModel from '../models/inventory/finished-goods-model'; // Remove .js
import RawMaterialsModel from '../models/inventory/raw-materials-model'; // Remove .js
import ComponentsModel from '../models/inventory/components-model'; // Remove .js
import WIPModel from '../models/inventory/wip-model'; // Remove .js

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/nufacturing-local-db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Function to generate random inventory data with sub-items
const generateInventoryDataWithSubItems = async () => {
  // Create sample Category
  const category = new Category({
    name: `Category ${Math.floor(Math.random() * 100)}`,
  });
  await category.save();

  // Create sample Supplier
  const supplier = new Supplier({
    name: `Supplier ${Math.floor(Math.random() * 100)}`,
    contactInformation: '123-456-7890',
  });
  await supplier.save();

  // Create sample WarehouseLocation
  const warehouseLocation = new WarehouseLocation({
    name: `Warehouse ${Math.floor(Math.random() * 10)}`,
    address: '123 Warehouse Street',
    capacity: Math.floor(Math.random() * 1000),
  });
  await warehouseLocation.save();

  // Create Inventory Item
  const inventoryItem = new InventoryItem({
    itemId: `ITEM${Math.floor(Math.random() * 10000)}`,
    name: `Inventory Item ${Math.floor(Math.random() * 1000)}`,
    sku: `SKU${Math.floor(Math.random() * 10000)}`,
    category: category._id,
    type: 'Finished Goods',
    scientificName: 'Scientific Example',
    picture: 'http://example.com/item.jpg',
    description: 'A sample finished goods inventory item.',
    vendor: supplier._id,
    supplier: supplier._id,
    warehouseLocation: warehouseLocation._id,
    certificateOfAuthenticity: 'http://example.com/cofa.pdf',
    unitOfMeasurement: 'kg',
    pricePerUnit: Math.random() * 100 + 1,
    sellingPrice: Math.random() * 150 + 20,
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2)
    ),
    quantities: {
      minRestockQuantity: Math.floor(Math.random() * 100),
      inStock: Math.floor(Math.random() * 1000),
      availableQuantity: Math.floor(Math.random() * 800),
      onHoldQuantity: Math.floor(Math.random() * 200),
      allocatedQuantity: Math.floor(Math.random() * 150),
      quarantinedQuantity: Math.floor(Math.random() * 50),
      reorderLevel: Math.floor(Math.random() * 200),
      reservedForOrderId: `Order-${Math.floor(Math.random() * 1000)}`,
      orderAllocationDetails: {
        [`Order-${Math.floor(Math.random() * 1000)}`]: Math.floor(
          Math.random() * 50
        ),
      },
    },
    status: 'In Stock',
    createdBy: new mongoose.Types.ObjectId(), // Assume a valid user ObjectId
  });

  // Add batch tracking details
  inventoryItem.batchTracking.push({
    lotCode: `LOT${Math.floor(Math.random() * 1000)}`,
    batchId: `BATCH${Math.floor(Math.random() * 1000)}`,
    dateReceived: new Date(),
    quantity: Math.floor(Math.random() * 1000),
    supplier: supplier._id,
    warehouseLocation: warehouseLocation._id,
    availableQuantity: Math.floor(Math.random() * 500),
  });

  await inventoryItem.save();

  // Generate Finished Goods
  const finishedGoods = new FinishedGoodsModel({
    productName: `Finished Product ${Math.floor(Math.random() * 100)}`,
    productSKU: `SKU-${Math.floor(Math.random() * 10000)}`,
    productId: `FG${Math.floor(Math.random() * 1000)}`,
    batchId: `BATCH${Math.floor(Math.random() * 10000)}`,
    lotId: `LOT${Math.floor(Math.random() * 10000)}`,
    quantityAvailable: Math.floor(Math.random() * 500),
    unitOfMeasure: 'Bottles',
    costPerUnit: Math.random() * 10 + 1,
    sellingPrice: Math.random() * 15 + 5,
    location: 'Warehouse A',
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2)
    ),
    reorderLevel: 50,
    reservedQuantity: Math.floor(Math.random() * 50),
    supplier: supplier._id,
    status: 'In Stock',
    inventoryItem: inventoryItem._id,
  });
  await finishedGoods.save();

  // Generate Raw Materials
  const rawMaterials = new RawMaterialsModel({
    materialName: `Raw Material ${Math.floor(Math.random() * 100)}`,
    materialId: `RM${Math.floor(Math.random() * 1000)}`,
    quantityAvailable: Math.floor(Math.random() * 1000),
    reorderLevel: 200,
    costPerUnit: Math.random() * 5 + 2,
    location: 'Warehouse B',
    supplier: supplier._id,
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ),
    status: 'Available',
    inventoryItem: inventoryItem._id,
  });
  await rawMaterials.save();

  // Generate Components
  const component = new ComponentsModel({
    componentName: `Component ${Math.floor(Math.random() * 100)}`,
    componentId: `CMP${Math.floor(Math.random() * 1000)}`,
    quantityAvailable: Math.floor(Math.random() * 20000),
    reorderLevel: 5000,
    costPerUnit: Math.random() * 0.5 + 0.1,
    location: 'Warehouse C',
    supplier: supplier._id,
    minOrderQty: 1000,
    status: 'In Stock',
    inventoryItem: inventoryItem._id,
  });
  await component.save();

  // Generate WIP (Work In Progress)
  const wip = new WIPModel({
    wipId: `WIP${Math.floor(Math.random() * 10000)}`,
    productName: `WIP Product ${Math.floor(Math.random() * 100)}`,
    productSKU: `WIPSKU-${Math.floor(Math.random() * 10000)}`,
    batchId: `WIPBATCH${Math.floor(Math.random() * 10000)}`,
    lotId: `WIPLOT${Math.floor(Math.random() * 10000)}`,
    stageOfProduction: 'Mixing',
    quantityInProgress: Math.floor(Math.random() * 2000),
    costToDate: Math.random() * 5000 + 500,
    estimatedCompletionDate: new Date(
      new Date().setMonth(new Date().getMonth() + 3)
    ),
    workOrderId: `WO${Math.floor(Math.random() * 1000)}`,
    location: 'Manufacturing Plant 1',
    leadTimeRemaining: Math.floor(Math.random() * 30),
    reservedForOrderId: `Order-${Math.floor(Math.random() * 10000)}`,
    supplier: supplier._id,
    materialsAllocated: ['Material A', 'Material B', 'Material C'],
    operatorTeam: 'Team Alpha',
    status: 'In Progress',
    inventoryItem: inventoryItem._id,
  });
  await wip.save();

  console.log('Inventory data with expanded sub-items generated successfully.');
};

// Run the generator function
generateInventoryDataWithSubItems()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error('Error generating inventory data:', err);
    mongoose.disconnect();
  });
