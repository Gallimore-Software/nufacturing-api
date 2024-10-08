import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { InventoryItemDTO } from './inventoryItem.ts';

describe('InventoryItem Endpoints', () => {
  it('should create a new inventoryItem', async () => {
    const newDto: InventoryItemDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/inventoryItem').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
