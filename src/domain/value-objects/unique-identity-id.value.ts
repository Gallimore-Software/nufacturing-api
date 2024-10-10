import { v4 as uuidv4 } from 'uuid';

export class UniqueEntityID {
  private readonly _value: string;

  constructor(id?: string) {
    this._value = id ? id : uuidv4();
  }

  get value(): string {
    return this._value;
  }

  equals(id?: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    return this._value === id.value;
  }
}
