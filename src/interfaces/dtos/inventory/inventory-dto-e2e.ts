import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { InventoryDTO } from './inventory.ts';

describe('Inventory Endpoints', () => {
  it('should create a new inventory', async () => {
    const newDto: InventoryDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/inventory').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
