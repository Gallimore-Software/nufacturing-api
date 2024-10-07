import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { CustomerDTO } from './customer.ts';

describe('Customer Endpoints', () => {
  it('should create a new customer', async () => {
    const newDto: CustomerDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/customer').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
