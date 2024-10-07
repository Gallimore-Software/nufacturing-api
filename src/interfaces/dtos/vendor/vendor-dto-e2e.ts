import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { VendorDTO } from './vendor.ts';

describe('Vendor Endpoints', () => {
  it('should create a new vendor', async () => {
    const newDto: VendorDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/vendor').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
