import { Verifier } from '@pact-foundation/pact';
import path from 'path';

describe('Pact Verification - Delete User Use Case', () => {
  it('should validate the expectations from the consumer contract', async () => {
    try {
      // Initialize the Pact Verifier
      const verifier = new Verifier({
        providerBaseUrl: 'http://localhost:1234', // Ensure provider is running at this URL
        pactUrls: [
          path.join(
            process.cwd(),
            'docs',
            'generated',
            'pacts',
            'userclient-userapi.json' // Ensure this matches the path where the Pact file is generated
          ),
        ],
        publishVerificationResult: true,
        providerVersion: '1.0.0',
        logLevel: 'info', // Debugging info
      });

      // Verify the provider with the contract
      const output = await verifier.verifyProvider();
      console.log('Pact Verification Complete!', output);
    } catch (error) {
      console.error('Pact Verification Failed!', error);
      throw error; // Ensure Jest captures the error as a test failure
    }
  });
});
