import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { OrderDTO } from './order.ts';

describe('Order Endpoints', () => {
  it('should create a new order', async () => {
    const newDto: OrderDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/order').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
