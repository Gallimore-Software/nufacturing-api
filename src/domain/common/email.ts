import { Result } from "@domain/common/result";

export class Email {
  private readonly _value: string;

  private constructor(email: string) {
    this._value = email;
  }

  get value(): string {
    return this._value;
  }

  public static validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public static create(email: string): Result<Email> {
    if (!this.validate(email)) {
      return Result.fail<Email>("Invalid email format");
    }
    return Result.ok<Email>(new Email(email));
  }
}
