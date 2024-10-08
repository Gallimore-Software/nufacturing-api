// src/domain/entities/user/user.entity.ts

import { Entity } from "@domain/common/entity";
import { Result } from "@domain/common/result";
import { UniqueEntityID } from "@domain/value-objects/unique-entity-id";
import { Email } from "@domain/value-objects/email";

export interface UserProps {
  username: string;
  password: string;
  email: Email;
  role: "user" | "admin" | "manager";
  emailVerified?: boolean;
  createdAt?: Date;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const user = new User({ ...props, emailVerified: false }, id);
    return Result.ok<User>(user);
  }

  // Business rules can go here, like password changes, email verification logic, etc.
}
