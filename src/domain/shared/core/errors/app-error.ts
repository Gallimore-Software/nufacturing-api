import Logger from '@infrastructure/logging/logger';

// app-error/custom-error.ts
export abstract class CustomError extends Error {
  public statusCode: number;
  public metadata?: Record<string, unknown>; // Replace any with unknown

  constructor(
    message: string,
    statusCode: number,
    metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name; // Automatically set error name to class name
    this.statusCode = statusCode;
    this.metadata = metadata;

    // Maintain stack trace when extending built-in classes
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Generic log method to be overridden or used in subclasses
  logError() {
    Logger.error({
      errorName: this.name,
      message: this.message,
      metadata: this.metadata,
      stack: this.stack,
      timestamp: new Date().toISOString(),
    });
  }

  // Abstract method to enforce that all derived classes must implement this method
  abstract serializeErrors(): { message: string; field?: string }[];
}

// app-error/authentication-error.ts
export class AuthenticationError extends CustomError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    // Use Record<string, unknown>
    super(message, 401, metadata); // 401 for Unauthorized
  }

  // Implementing the abstract method to structure error responses
  serializeErrors() {
    return [{ message: this.message }];
  }
}

// app-error/unexpected-error.ts
export class UnexpectedError extends CustomError {
  public originalError: Error;

  constructor(error: Error, metadata?: Record<string, unknown>) {
    // Use Record<string, unknown>
    super('An unexpected error occurred.', 500, metadata); // 500 for Internal Server Error
    this.originalError = error;
  }

  // Log the original error along with additional context
  logError() {
    Logger.error({
      errorName: this.name,
      message: this.message,
      originalError: {
        message: this.originalError.message,
        stack: this.originalError.stack,
      },
      metadata: this.metadata,
      timestamp: new Date().toISOString(),
    });
  }

  // Implementing the abstract method to structure error responses
  serializeErrors() {
    return [
      {
        message: this.message,
        originalErrorMessage: this.originalError.message,
      },
    ];
  }
}
