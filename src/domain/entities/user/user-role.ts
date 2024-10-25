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

  constructor(role: string | UserRole) {
    // Check if the provided role is a string or another UserRole instance
    const roleValue = role instanceof UserRole ? role.getValue() : role;

    if (!UserRole.validRoles.includes(roleValue)) {
      throw new Error(`Invalid user role: ${roleValue}`);
    }
    this.value = roleValue;
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
