// delete-user.provider.pact.test.ts (Provider Verification)

import { Verifier } from '@pact-foundation/pact';
import path from 'path';

describe('Pact Verification - Delete User Use Case', () => {
  it('should validate the expectations from the consumer contract', async () => {
    const verifier = new Verifier({
      providerBaseUrl: 'http://localhost:3000', // The actual provider's URL
      pactUrls: [
        path.resolve(
          process.cwd(),
          'docs/generated/pacts/userclient-userapi.json'
        ),
      ], // Path to the generated Pact file
      publishVerificationResult: true,
      providerVersion: '1.0.0', // Version of the provider API
    });

    const output = await verifier.verifyProvider();
    console.log('Pact Verification Complete!', output);
  });
});
