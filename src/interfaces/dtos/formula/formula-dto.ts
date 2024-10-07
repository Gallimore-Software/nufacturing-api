import request from 'supertest';
import { app } from '@@app'; // Update to your app's path
import { FormulaDTO } from './formula.ts';

describe('Formula Endpoints', () => {
  it('should create a new formula', async () => {
    const newDto: FormulaDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/formula').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
