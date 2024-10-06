"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("@models/userModel")); // Adjust the path as needed
class User {
    constructor() {
        this.userModel = userModel_1.default;
    }
    async createUser(userDTO) {
        const user = new this.userModel(userDTO);
        return await user.save();
    }
    async findUserByEmail(email) {
        return await this.userModel.findOne({ email });
    }
}
exports.default = User;
