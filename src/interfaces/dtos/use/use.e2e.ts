import request from 'supertest';
import { app } from '../../app'; // Update to your app's path
import { UseDTO } from './use.ts';

describe('Use Endpoints', () => {
  it('should create a new use', async () => {
    const newDto: UseDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/use').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
