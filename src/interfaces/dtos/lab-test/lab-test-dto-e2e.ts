import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { LabTestDTO } from './labTest.ts';

describe('LabTest Endpoints', () => {
  it('should create a new labTest', async () => {
    const newDto: LabTestDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/labTest').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
