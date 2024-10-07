import { Pact } from '@pact-foundation/pact';
import {  } from './eventHandler';
import { Logger } from '@infrastructure/logging/logger';
import {  } from '@application/services/';
import {  } from '@domain/contracts/';
import path from 'path';

describe('Pact Contract Test: ', () => {
  const provider = new Pact({
    consumer: '',
    provider: '',
    port: 1234,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
  });

  let eventHandler: ;
  let logger: Logger;
  let service: ;

  const mockEvent:  = {
    id: '1234',
    type: '',
    payload: {
      key: 'value',
    },
    timestamp: new Date(),
  };

  beforeAll(async () => {
    logger = new Logger();
    service = new ();
    eventHandler = new (service, logger);
    await provider.setup(); // Ensure setup is awaited
  });

  afterAll(async () => {
    await provider.finalize(); // Ensure finalize is awaited
  });

  describe('when an event is handled', () => {
    beforeEach(async () => {
      await provider.addInteraction({
        state: 'the service is ready to handle the event',
        uponReceiving: 'a request to handle an event',
        withRequest: {
          method: 'POST',
          path: '/event',
          headers: {
            'Content-Type': 'application/json',
          },
          body: mockEvent,
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            success: true,
          },
        },
      });
    });

    it('should successfully handle the event and interact with the provider', async () => {
      // Act
      await eventHandler.handle(mockEvent);

      // Assert
      await provider.verify(); // Ensure verification is awaited
    });
  });
});
