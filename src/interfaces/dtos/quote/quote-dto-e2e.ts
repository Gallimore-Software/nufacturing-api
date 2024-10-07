import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { QuoteDTO } from './quote.ts';

describe('Quote Endpoints', () => {
  it('should create a new quote', async () => {
    const newDto: QuoteDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/quote').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
