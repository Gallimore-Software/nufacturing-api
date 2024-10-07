import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { ProductSkuDTO } from './productSku.ts';

describe('ProductSku Endpoints', () => {
  it('should create a new productSku', async () => {
    const newDto: ProductSkuDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/productSku').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
