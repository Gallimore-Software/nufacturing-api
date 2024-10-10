export class UserRole {
  isAdmin(): boolean {
    throw new Error('Method not implemented.');
  }
  private readonly value: string;

  private static readonly validRoles = ['Admin', 'User', 'SuperAdmin'];

  constructor(value: string) {
    if (!UserRole.validRoles.includes(value)) {
      throw new Error(`Invalid user role: ${value}`);
    }
    this.value = value;
  }

  static create(role: string): UserRole {
    return new UserRole(role);
  }

  getValue(): string {
    return this.value;
  }

  equals(role: UserRole): boolean {
    return this.value === role.getValue();
  }
}
