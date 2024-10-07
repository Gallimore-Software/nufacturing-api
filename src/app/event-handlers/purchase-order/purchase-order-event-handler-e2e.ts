import { create } from './eventHandler';
import {  } from '@domain/contracts/';
import { Logger } from '@infrastructure/logging/logger';
import {  } from '@application/services/';

describe('End-to-End Test: ', () => {
  let eventHandler: ReturnType<typeof create>;
  let logger: Logger;
  let service: ;

  const mockEvent:  = {
    // TODO: Define the properties of the eventContract for e2e testing
    id: '1234',
    type: '',
    payload: {
      key: 'value',
    },
    timestamp: new Date(),
  };

  beforeAll(() => {
    logger = new Logger();
    service = new ();
    eventHandler = create(service, logger);
  });

  it('should handle the event end-to-end successfully', async () => {
    const serviceSpy = jest.spyOn(service, 'processEvent').mockResolvedValueOnce(undefined);
    const loggerSpy = jest.spyOn(logger, 'info');

    await eventHandler.handle(mockEvent);

    expect(serviceSpy).toHaveBeenCalledWith(mockEvent);
    expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('Successfully handled event'));

    // Clean up mocks
    serviceSpy.mockRestore();
    loggerSpy.mockRestore();
  });

  // Optionally test error scenarios for e2e tests
  it('should log errors during handling in eß 2e', async () => {
    const error = new Error('Simulated failure');
    const serviceSpy = jest.spyOn(service, 'processEvent').mockRejectedValueOnce(error);
    const loggerSpy = jest.spyOn(logger, 'error');

    // Handle the error gracefully
    await expect(eventHandler.handle(mockEvent)).rejects.toThrow(error);

    expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('Error while handling event'), error);

    // Clean up mocks
    serviceSpy.mockRestore();
    loggerSpy.mockRestore();
  });
});
