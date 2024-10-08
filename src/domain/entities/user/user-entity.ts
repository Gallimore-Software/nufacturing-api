// user.ts
import { Entity } from '@domain/common/entity';
import { UniqueEntityID } from '@domain/value-objects/unique-entity-id';
import { UserProps } from './user-props'; // Import the props

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);  // Entity base class handles the id
  }

  // Factory method to create a user
  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    // Any domain-specific validation logic can be placed here.
    const user = new User(props, id);
    return Result.ok<User>(user);
  }

  get id(): UniqueEntityID {
    return this._id;  // _id is inherited from the base Entity class
  }

  // Example of a getter method for the user's role
  get role(): string {
    return this.props.role;
  }

  // Other methods for domain logic (e.g., changePassword, verifyEmail, etc.)
}
