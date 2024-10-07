import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { ReceivingDTO } from './receiving.ts';

describe('Receiving Endpoints', () => {
  it('should create a new receiving', async () => {
    const newDto: ReceivingDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/receiving').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
