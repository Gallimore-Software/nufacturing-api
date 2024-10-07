import {  } from './eventHandler';
import {  } from '@application/services/';
import { Logger } from '@infrastructure/logging/logger';
import {  } from '@domain/contracts/';

describe('Integration Test: ', () => {
  let eventHandler: ;
  let logger: Logger;
  let service: ;

  const mockEvent:  = {
    // TODO: Define the properties of the eventContract for integration testing
  };

  beforeAll(() => {
    logger = new Logger();
    service = new ();
    eventHandler = new (service, logger);
  });

  it('should handle the event and call service successfully', async () => {
    // Spy on the logger to capture log messages
    const loggerInfoSpy = jest.spyOn(logger, 'info');
    const serviceSpy = jest.spyOn(service, 'processEvent').mockResolvedValueOnce(undefined);

    // Act
    await eventHandler.handle(mockEvent);

    // Assert
    expect(serviceSpy).toHaveBeenCalledWith(mockEvent);
    expect(loggerInfoSpy).toHaveBeenCalledWith(expect.stringContaining('Handling event'));
    expect(loggerInfoSpy).toHaveBeenCalledWith(expect.stringContaining('Successfully handled event'));

    // Clean up spies
    serviceSpy.mockRestore();
    loggerInfoSpy.mockRestore();
  });

  it('should handle error scenario when service fails', async () => {
    // Arrange
    const error = new Error('Simulated service error');
    const serviceSpy = jest.spyOn(service, 'processEvent').mockRejectedValueOnce(error);
    const loggerErrorSpy = jest.spyOn(logger, 'error');

    // Act
    await eventHandler.handle(mockEvent).catch(() => {});

    // Assert
    expect(serviceSpy).toHaveBeenCalledWith(mockEvent);
    expect(loggerErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error while handling event'), error);

    // Clean up spies
    serviceSpy.mockRestore();
    loggerErrorSpy.mockRestore();
  });
});
