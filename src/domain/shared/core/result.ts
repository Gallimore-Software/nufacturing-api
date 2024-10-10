export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private readonly _value: T;

  private constructor(isSuccess: boolean, value: T) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._value = value;
  }

  public getValue(): T {
    return this._value;
  }

  public static ok<U>(value: U): Result<U> {
    return new Result(true, value);
  }

  public static fail<U>(error: U): Result<U> {
    return new Result(false, error);
  }
}
