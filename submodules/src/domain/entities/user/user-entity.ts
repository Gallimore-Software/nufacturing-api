// src/domain/entities/user.ts
export class User {
  constructor(public id: string, public role: string) {}

  hasRole(requiredRoles: string[]): boolean {
    return requiredRoles.includes(this.role);
  }
}
