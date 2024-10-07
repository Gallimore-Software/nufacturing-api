import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { ProductTypeDTO } from './productType.ts';

describe('ProductType Endpoints', () => {
  it('should create a new productType', async () => {
    const newDto: ProductTypeDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/productType').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
