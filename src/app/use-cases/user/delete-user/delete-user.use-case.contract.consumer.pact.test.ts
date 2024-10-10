// delete-user.use-case.contract.test.ts (Consumer Pact Test)

import { Pact } from '@pact-foundation/pact';
import { Matchers } from '@pact-foundation/pact';
import request from 'supertest'; // To simulate API calls
import * as path from 'path';

const { like } = Matchers;

// Define the pact for the consumer (the client)
describe('Pact - Delete User Use Case', () => {
  const provider = new Pact({
    consumer: 'UserClient', // Define consumer name
    provider: 'UserAPI', // Define provider name
    port: 1234, // Local pact server port
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'docs/generated/pacts'),
    spec: 2, // Pact specification version
  });

  // Set up pact interactions
  beforeAll(() => provider.setup());

  afterEach(() => provider.verify()); // Verify Pact interactions
  afterAll(() => provider.finalize()); // Finalize Pact file

  describe('when a DELETE request is made to delete a user', () => {
    beforeAll(() =>
      provider.addInteraction({
        state: 'a user with ID 123 exists', // Pre-condition
        uponReceiving: 'a request to delete a user',
        withRequest: {
          method: 'DELETE',
          path: '/api/users/123', // Define the path expected by the consumer
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: like({ message: 'User deleted successfully' }), // The expected response
        },
      })
    );

    it('should successfully delete the user', async () => {
      // Act: Simulate API call to delete the user
      const response = await request('http://localhost:1234').delete(
        '/api/users/123'
      );

      // Assert: Verify the response matches the contract
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'User deleted successfully' });
    });
  });

  describe('when a DELETE request is made for a non-existent user', () => {
    beforeAll(() =>
      provider.addInteraction({
        state: 'no user exists with ID 999',
        uponReceiving: 'a request to delete a non-existent user',
        withRequest: {
          method: 'DELETE',
          path: '/api/users/999',
        },
        willRespondWith: {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
          body: like({ message: 'User not found' }),
        },
      })
    );

    it('should return 404 for a non-existent user', async () => {
      // Act: Simulate API call to delete a non-existent user
      const response = await request('http://localhost:1234').delete(
        '/api/users/999'
      );

      // Assert: Verify the response matches the contract
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });
});
