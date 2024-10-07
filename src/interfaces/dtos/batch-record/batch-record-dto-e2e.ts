import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { BatchRecordDTO } from './batchRecord.ts';

describe('BatchRecord Endpoints', () => {
  it('should create a new batchRecord', async () => {
    const newDto: BatchRecordDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/batchRecord').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
