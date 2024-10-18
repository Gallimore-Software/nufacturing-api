import { Pact, Matchers } from '@pact-foundation/pact';
import request from 'supertest'; // To simulate API calls
import * as path from 'path';

const { like } = Matchers;

describe('Pact - Delete User Use Case with Mocked External Service', () => {
  const provider = new Pact({
    consumer: 'UserClient', // Define consumer name
    provider: 'UserAPI', // Define provider name
    port: 1234, // Local pact server port
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'docs/generated/pacts'), // Pact contract output directory
    logLevel: 'info', // Log level for debugging
    spec: 2, // Pact specification version
  });

  beforeAll(async () => {
    console.log('Setting up Pact mock server...');
    await provider.setup();
    console.log('Pact mock server is ready.');
  });

  afterEach(async () => {
    console.log('Verifying Pact interactions...');
    await provider.verify();
    console.log('Pact interactions verified.');
  });

  afterAll(async () => {
    console.log('Finalizing Pact...');
    await provider.finalize(); // Finalize Pact file after all tests
  });

  describe('when a DELETE request is made to delete a user', () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: 'a user with ID 123 exists',
        uponReceiving: 'a request to delete a user',
        withRequest: {
          method: 'DELETE',
          path: '/api/users/123',
          headers: { Accept: 'application/json' },
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: like({ message: 'User deleted successfully' }),
        },
      });
    });

    it('should successfully delete the user', async () => {
      const response = await request('http://localhost:1234')
        .delete('/api/users/123')
        .set('Accept', 'application/json');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'User deleted successfully' });
    });
  });

  describe('when a DELETE request is made for a non-existent user', () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: 'no user exists with ID 999',
        uponReceiving: 'a request to delete a non-existent user',
        withRequest: {
          method: 'DELETE',
          path: '/api/users/999',
          headers: { Accept: 'application/json' },
        },
        willRespondWith: {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
          body: like({ message: 'User not found' }),
        },
      });
    });

    it('should return 404 for a non-existent user', async () => {
      const response = await request('http://localhost:1234')
        .delete('/api/users/999')
        .set('Accept', 'application/json');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });
});
