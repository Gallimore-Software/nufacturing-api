import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { PurchaseOrderDTO } from './purchaseOrder.ts';

describe('PurchaseOrder Endpoints', () => {
  it('should create a new purchaseOrder', async () => {
    const newDto: PurchaseOrderDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/purchaseOrder').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
