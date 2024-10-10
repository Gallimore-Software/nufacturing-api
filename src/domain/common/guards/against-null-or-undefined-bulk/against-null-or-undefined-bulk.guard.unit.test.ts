import { Guard } from './against-null-or-undefined-bulk.guard';

describe('Guard.againstNullOrUndefinedBulk', () => {
  it('should return success when all arguments are valid (not null or undefined)', () => {
    // Arrange
    const args = [
      { argument: 'valid string', argumentName: 'firstArg' },
      { argument: 123, argumentName: 'secondArg' },
      { argument: true, argumentName: 'thirdArg' },
    ];

    // Act
    const result = Guard.againstNullOrUndefinedBulk(args);

    // Assert
    expect(result.succeeded).toBe(true);
    expect(result.message).toBeUndefined(); // Since it succeeded, there should be no error message
  });

  it('should return failure when one of the arguments is null', () => {
    // Arrange
    const args = [
      { argument: 'valid string', argumentName: 'firstArg' },
      { argument: null, argumentName: 'secondArg' }, // null value
      { argument: true, argumentName: 'thirdArg' },
    ];

    // Act
    const result = Guard.againstNullOrUndefinedBulk(args);

    // Assert
    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('secondArg is null or undefined'); // Error should match the argumentName
  });

  it('should return failure when one of the arguments is undefined', () => {
    // Arrange
    const args = [
      { argument: 'valid string', argumentName: 'firstArg' },
      { argument: undefined, argumentName: 'secondArg' }, // undefined value
      { argument: true, argumentName: 'thirdArg' },
    ];

    // Act
    const result = Guard.againstNullOrUndefinedBulk(args);

    // Assert
    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('secondArg is null or undefined'); // Error should match the argumentName
  });

  it('should return failure when multiple arguments are null or undefined', () => {
    // Arrange
    const args = [
      { argument: undefined, argumentName: 'firstArg' }, // undefined value
      { argument: null, argumentName: 'secondArg' }, // null value
      { argument: true, argumentName: 'thirdArg' },
    ];

    // Act
    const result = Guard.againstNullOrUndefinedBulk(args);

    // Assert
    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('firstArg is null or undefined'); // Should report the first failure it finds
  });

  it('should return success for an empty array of arguments', () => {
    // Arrange
    const args: { argument: any; argumentName: string }[] = [];

    // Act
    const result = Guard.againstNullOrUndefinedBulk(args);

    // Assert
    expect(result.succeeded).toBe(true);
    expect(result.message).toBeUndefined(); // No message since it's successful
  });
});
