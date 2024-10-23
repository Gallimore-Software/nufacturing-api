// user-role.ts
export class UserRole {
  private readonly value: string;

  // Static definitions for known roles
  public static readonly ADMIN = 'Admin';
  public static readonly MANAGER = 'Manager';
  public static readonly USER = 'User';
  public static readonly SUPER_ADMIN = 'SuperAdmin';

  // You can add more static role definitions here as needed

  // List of valid roles
  private static readonly validRoles = [
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.USER,
    UserRole.SUPER_ADMIN,
  ];

  constructor(role: string) {
    if (!UserRole.validRoles.includes(role)) {
      throw new Error(`Invalid user role: ${role}`);
    }
    this.value = role;
  }

  // Get the string value of the role
  getValue(): string {
    return this.value;
  }

  // Check if this role equals another role
  equals(role: UserRole): boolean {
    return this.value === role.getValue();
  }

  // Check if the role is an Admin
  isAdmin(): boolean {
    return this.value === UserRole.ADMIN;
  }

  // Check if the role is a Manager
  isManager(): boolean {
    return this.value === UserRole.MANAGER;
  }

  // Check if the role is a User
  isUser(): boolean {
    return this.value === UserRole.USER;
  }
}

// Ensure it's exported
export default UserRole;
