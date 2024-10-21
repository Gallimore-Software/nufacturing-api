import { Verifier } from '@pact-foundation/pact';
import path from 'path';
import nock from 'nock'; // Add this to mock the provider test

describe('Pact Verification - Delete User Use Case', () => {
  beforeAll(() => {
    // Mock the provider HTTP calls using nock
    nock('http://localhost:1234')
      .delete('/api/users/123')
      .reply(200, { message: 'User deleted successfully' });

    nock('http://localhost:1234')
      .delete('/api/users/999')
      .reply(404, { message: 'User not found' });
  });

  it('should validate the expectations from the consumer contract', async () => {
    try {
      const verifier = new Verifier({
        providerBaseUrl: 'http://localhost:1234',
        pactUrls: [
          path.join(
            process.cwd(),
            'docs',
            'generated',
            'pacts',
            'userclient-userapi.json'
          ),
        ],
        publishVerificationResult: true,
        providerVersion: '1.0.0',
        logLevel: 'info',
      });

      const output = await verifier.verifyProvider();
      console.log('Pact Verification Complete!', output);
    } catch (error) {
      console.error('Pact Verification Failed!', error);
      throw error;
    }
  });
});
