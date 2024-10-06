import UserDTO from "@dto/userDTO"; // Adjust the path as needed
import UserModel from "@models/userModel"; // Adjust the path as needed

class User {
  private userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  async createUser(userDTO: UserDTO) {
    const user = new this.userModel(userDTO);
    return await user.save();
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}

export default User;
