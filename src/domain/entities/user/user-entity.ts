import { Entity } from '@domain/common/entity';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';
import { UserProps } from './user-props';
import { Result } from '@domain/common/result';
import { UserRole } from '@domain/entities/user/user-role';
import { Guard } from '@domain/common/guards/against-null-or-undefined-bulk/against-null-or-undefined-bulk.guard';

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id); // Entity base class handles the id
  }

  // Factory method to create a user with validation checks
  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.email ?? '', argumentName: 'email' }, // Ensure email is a string
      { argument: props.username ?? '', argumentName: 'username' }, // Ensure username is a string
      { argument: props.password ?? '', argumentName: 'password' }, // Ensure password is a string
      // { argument: props.role?.getValue() ?? '', argumentName: 'role' }, // Ensure role is a valid string value
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message ?? 'Validation failed'); // Default message
    }

    const user = new User(props, id);
    return Result.ok<User>(user);
  }

  get id(): UniqueEntityID {
    return this._id; // _id is inherited from the base Entity class
  }

  get role(): UserRole {
    return this.props.role;
  }

  get email(): string {
    return this.props.email ?? ''; // Return a default empty string if undefined
  }

  get username(): string {
    return this.props.username ?? ''; // Return a default empty string if undefined
  }

  // Domain-specific business logic methods

  public changePassword(newPassword: string): Result<void> {
    if (newPassword.length < 6) {
      return Result.fail<void>('Password must be at least 6 characters long.');
    }
    this.props.password = newPassword;
    return Result.ok<void>();
  }

  public markDeleted(): void {
    this.props.isDeleted = true;
  }

  public isDeleted(): boolean {
    return this.props.isDeleted;
  }

  public verifyEmail(): void {
    this.props.emailVerified = true;
  }

  public static restoreDeleted(user: User): Result<void> {
    if (!user.props.isDeleted) {
      return Result.fail<void>('User is not deleted.');
    }
    user.props.isDeleted = false;
    return Result.ok<void>();
  }

  public isAdmin(): boolean {
    return this.props.role.isAdmin();
  }
}
