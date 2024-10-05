import User from "@domain-entities/user"; // Adjust path if necessary
import UserModel from "@models/userModel"; // Mocked
import UserDTO from "@dto/userDTO"; // Adjust path if necessary

jest.mock("@models/userModel");

describe("User Entity", () => {
  let userEntity;

  beforeEach(() => {
    userEntity = new User();
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user and save it to the database", async () => {
      const userDTO: UserDTO = {
        username: "testuser",
        password: "password123",
        email: "testuser@example.com",
        phoneNumber: "1234567890",
      };

      const mockSave = jest.fn().mockResolvedValue(userDTO);
      (UserModel as unknown as jest.Mock).mockImplementation(() => ({
        save: mockSave,
      }));

      const result = await userEntity.createUser(userDTO);

      expect(UserModel).toHaveBeenCalledWith(userDTO);
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(userDTO);
    });
  });

  // describe("findUserByEmail", () => {
  //   it("should find a user by email", async () => {
  //     const mockUser = {
  //       username: "testuser",
  //       password: "password123",
  //       email: "testuser@example.com",
  //       phoneNumber: "1234567890",
  //     };

  //     (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

  //     const result = await userEntity.findUserByEmail("testuser@example.com");

  //     expect(UserModel.findOne).toHaveBeenCalledWith({ email: "testuser@example.com" });
  //     expect(result).toEqual(mockUser);
  //   });

  //   it("should return null if the user is not found", async () => {
  //     (UserModel.findOne as jest.Mock).mockResolvedValue(null);

  //     const result = await userEntity.findUserByEmail("nonexistent@example.com");

  //     expect(UserModel.findOne).toHaveBeenCalledWith({ email: "nonexistent@example.com" });
  //     expect(result).toBeNull();
  //   });
  // });
});
