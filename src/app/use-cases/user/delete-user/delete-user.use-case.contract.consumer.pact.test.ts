import { Pact, Matchers } from '@pact-foundation/pact';
import request from 'supertest'; // To simulate API calls
import * as path from 'path';

const { like } = Matchers;

// Define the pact for the consumer (the client)
describe('Pact - Delete User Use Case with Mocked External Service', () => {
  const provider = new Pact({
    consumer: 'UserClient', // Define consumer name
    provider: 'UserAPI', // Define provider name
    port: 1234, // Local pact server port
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'), // Pact contract output directory
    logLevel: 'info', // Log level
    spec: 2, // Pact specification version
  });

  // Set up pact interactions
  beforeAll(async () => {
    await provider.setup(); // Ensure provider setup is fully awaited
  });

  afterEach(async () => {
    await provider.verify(); // Ensure interactions are verified after each test
  });

  afterAll(async () => {
    await provider.finalize(); // Finalize Pact file after all tests
  });

  describe('when a DELETE request is made to delete a user', () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: 'a user with ID 123 exists', // Pre-condition
        uponReceiving: 'a request to delete a user',
        withRequest: {
          method: 'DELETE',
          path: '/api/users/123', // Define the path expected by the consumer
          headers: {
            Accept: 'application/json',
          },
        },
        willRespondWith: {
          status: 200, // The expected status code
          headers: { 'Content-Type': 'application/json' },
          body: like({ message: 'User deleted successfully' }), // The expected response
        },
      });
    });

    it('should successfully delete the user', async () => {
      // Act: Simulate API call to delete the user
      const response = await request('http://localhost:1234')
        .delete('/api/users/123')
        .set('Accept', 'application/json');

      // Assert: Verify the response matches the contract
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'User deleted successfully' });
    });
  });

  describe('when a DELETE request is made for a non-existent user', () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: 'no user exists with ID 999', // Pre-condition
        uponReceiving: 'a request to delete a non-existent user',
        withRequest: {
          method: 'DELETE',
          path: '/api/users/999', // Define the path for a non-existent user
          headers: {
            Accept: 'application/json',
          },
        },
        willRespondWith: {
          status: 404, // Expected status code
          headers: { 'Content-Type': 'application/json' },
          body: like({ message: 'User not found' }), // Expected response
        },
      });
    });

    it('should return 404 for a non-existent user', async () => {
      // Act: Simulate API call to delete a non-existent user
      const response = await request('http://localhost:1234')
        .delete('/api/users/999')
        .set('Accept', 'application/json');

      // Assert: Verify the response matches the contract
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });
});
