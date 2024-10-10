export class Left<L, R> {
  constructor(public readonly value: L) {}

  // Helper to check if the result is 'left'
  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

export class Right<L, R> {
  constructor(public readonly value: R) {}

  // Helper to check if the result is 'right'
  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }
}

// Generic Either type, representing either a Left (failure) or a Right (success)
export type Either<L, R> = Left<L, R> | Right<L, R>;

// Helper functions to create Left or Right values
export const left = <L, R>(l: L): Either<L, R> => new Left<L, R>(l);
export const right = <L, R>(r: R): Either<L, R> => new Right<L, R>(r);
