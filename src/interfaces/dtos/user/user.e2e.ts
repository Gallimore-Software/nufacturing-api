import request from 'supertest';
import { app } from '../../app'; // Update to your app's path
import { UserDTO } from './user.ts';

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const newDto: UserDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const response = await request(app).post('/user').send(newDto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Additional tests can be added here
});
