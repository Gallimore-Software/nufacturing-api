import {  } from './eventHandler';
import {  } from '@application/services/';
import { Logger } from '@infrastructure/logging/logger';
import {  } from '@domain/contracts/';

jest.mock('@application/services/');
jest.mock('@infrastructure/logging/logger');

describe('', () => {
  let eventHandler: ;
  let serviceMock: jest.Mocked<>;
  let loggerMock: jest.Mocked<Logger>;
  const mockEvent:  = {
    // TODO: Define the properties of the eventContract for mock
  };

  beforeEach(() => {
    serviceMock = new () as jest.Mocked<>;
    loggerMock = new Logger() as jest.Mocked<Logger>;

    eventHandler = new (serviceMock, loggerMock);
  });

  it('should call service.processEvent when handle is invoked', async () => {
    // Arrange
    serviceMock.processEvent.mockResolvedValueOnce(undefined);

    // Act
    await eventHandler.handle(mockEvent);

    // Assert
    expect(serviceMock.processEvent).toHaveBeenCalledWith(mockEvent);
    expect(loggerMock.info).toHaveBeenCalledWith(expect.stringContaining('Handling event'));
    expect(loggerMock.info).toHaveBeenCalledWith(expect.stringContaining('Successfully handled event'));
  });

  it('should log an error when service.processEvent fails', async () => {
    // Arrange
    const error = new Error('Service error');
    serviceMock.processEvent.mockRejectedValueOnce(error);

    // Act
    await eventHandler.handle(mockEvent).catch(() => {});

    // Assert
    expect(serviceMock.processEvent).toHaveBeenCalledWith(mockEvent);
    expect(loggerMock.error).toHaveBeenCalledWith(expect.stringContaining('Error while handling event'), error);
  });
});
