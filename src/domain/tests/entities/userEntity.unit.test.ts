import { User } from "../../entities/user";

describe("User Entity Tests", () => {
  it("should create a valid user entity", () => {
    const user = new User({
      username: "john_doe",
      email: "john@example.com",
      role: "manager",
    });

    expect(user.username).toBe("john_doe");
    expect(user.email).toBe("john@example.com");
    expect(user.role).toBe("manager");
  });

  it("should throw an error when email is invalid", () => {
    expect(() => {
      new User({
        username: "jane_doe",
        email: "invalid-email",
        role: "employee",
      });
    }).toThrow("Invalid email format");
  });

  it("should properly update user role", () => {
    const user = new User({
      username: "john_doe",
      email: "john@example.com",
      role: "employee",
    });

    user.updateRole("manager");
    expect(user.role).toBe("manager");
  });
});
