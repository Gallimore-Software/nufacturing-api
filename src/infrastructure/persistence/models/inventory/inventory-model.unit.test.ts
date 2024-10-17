// inventoryItem.test.js
import mongoose from 'mongoose';
import { InventoryItem } from '@models/inventory/inventory-model'; // Adjust the path based on your folder structure

describe('InventoryItem Model Test', () => {
  beforeAll(async () => {
    // Connect to a mock DB (you can use an in-memory MongoDB for real tests)
    await mongoose.connect('mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create an inventory item successfully', async () => {
    const inventoryItem = new InventoryItem({
      itemId: 'FG-1001',
      name: 'Vitamin C 500mg Tablets',
      sku: 'SKU-1234',
      category: new mongoose.Types.ObjectId(), // Assuming category is referenced as an ObjectId
      type: 'Finished Goods',
      scientificName: 'Ascorbic Acid',
      picture: 'https://example.com/images/vitamin-c.jpg',
      description: '500mg Vitamin C tablets',
      vendor: new mongoose.Types.ObjectId(), // Assuming vendor is referenced as an ObjectId
      supplier: new mongoose.Types.ObjectId(), // Assuming supplier is referenced as an ObjectId
      warehouseLocation: new mongoose.Types.ObjectId(), // Assuming warehouseLocation is referenced as an ObjectId
      batchTracking: [
        {
          lotCode: 'LOT-001',
          batchId: 'BATCH-001',
          dateReceived: new Date('2022-01-01'),
          quantity: 1000,
          supplier: new mongoose.Types.ObjectId(),
          warehouseLocation: new mongoose.Types.ObjectId(),
          availableQuantity: 950,
        },
      ],
      unitOfMeasurement: 'Bottles',
      pricePerUnit: 1.5,
      sellingPrice: 9.99,
      expirationDate: new Date('2025-12-31'),
      inventoryCategory: 'Nufacturing', // Add this field to satisfy the validation
      quantities: {
        minRestockQuantity: 100,
        inStock: 500,
        reorderLevel: 200,
      },
      status: 'In Stock',
      createdBy: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedInventoryItem = await inventoryItem.save();
    expect(savedInventoryItem._id).toBeDefined();
    expect(savedInventoryItem.name).toBe('Vitamin C 500mg Tablets');
    expect(savedInventoryItem.sku).toBe('SKU-1234');
    expect(savedInventoryItem.pricePerUnit).toBe(1.5);
  });

  it('should require necessary fields', async () => {
    const inventoryItem = new InventoryItem({
      itemId: 'FG-1001', // Omit necessary fields like `name`, `sku`, `description`
    });

    let err: any;
    try {
      await inventoryItem.save();
    } catch (error) {
      err = error;
      npm;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
    expect(err.errors.sku).toBeDefined();
    expect(err.errors.description).toBeDefined();
  });

  it('should update `updatedAt` field automatically before saving', async () => {
    const inventoryItem = new InventoryItem({
      itemId: 'FG-1002',
      name: 'Vitamin D Tablets',
      sku: 'SKU-5678',
      category: new mongoose.Types.ObjectId(),
      type: 'Finished Goods',
      description: 'Vitamin D 1000 IU tablets',
      vendor: new mongoose.Types.ObjectId(),
      supplier: new mongoose.Types.ObjectId(),
      warehouseLocation: new mongoose.Types.ObjectId(),
      batchTracking: [],
      unitOfMeasurement: 'Bottles',
      pricePerUnit: 2.5,
      inventoryCategory: 'Nufacturing', // Add this field to satisfy the validation
      quantities: {
        minRestockQuantity: 100,
        inStock: 500,
        reorderLevel: 200,
      },
      status: 'In Stock',
      createdBy: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedInventoryItem = await inventoryItem.save();
    const updatedAtBefore = savedInventoryItem.updatedAt;

    // Simulate updating the document
    savedInventoryItem.pricePerUnit = 2.8;
    const updatedInventoryItem = await savedInventoryItem.save();
    const updatedAtAfter = updatedInventoryItem.updatedAt;

    expect(updatedAtBefore).not.toEqual(updatedAtAfter);
  });

  it('should validate batchTracking and quantities structure', async () => {
    const inventoryItem = new InventoryItem({
      itemId: 'FG-1003',
      name: 'Magnesium Tablets',
      sku: 'SKU-9101',
      category: new mongoose.Types.ObjectId(),
      type: 'Finished Goods',
      scientificName: 'Magnesium Oxide',
      picture: 'https://example.com/images/magnesium.jpg',
      description: 'Magnesium tablets for daily use',
      vendor: new mongoose.Types.ObjectId(),
      supplier: new mongoose.Types.ObjectId(),
      warehouseLocation: new mongoose.Types.ObjectId(),
      batchTracking: [
        {
          lotCode: 'LOT-002',
          batchId: 'BATCH-002',
          dateReceived: new Date('2022-06-15'),
          quantity: 2000,
          supplier: new mongoose.Types.ObjectId(),
          warehouseLocation: new mongoose.Types.ObjectId(),
          availableQuantity: 1950,
        },
      ],
      unitOfMeasurement: 'Tablets',
      pricePerUnit: 0.05,
      inventoryCategory: 'Nufacturing', // Add this field to satisfy the validation
      quantities: {
        minRestockQuantity: 100,
        inStock: 2500,
        reorderLevel: 1500,
      },
      status: 'In Stock',
      createdBy: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedInventoryItem: any = await inventoryItem.save();

    // Check batchTracking array
    expect(savedInventoryItem.batchTracking[0].lotCode).toBe('LOT-002');
    expect(savedInventoryItem.batchTracking[0].availableQuantity).toBe(1950);

    // Check quantities structure
    expect(savedInventoryItem.quantities.inStock).toBe(2500);
    expect(savedInventoryItem.quantities.reorderLevel).toBe(1500);
  });
});
