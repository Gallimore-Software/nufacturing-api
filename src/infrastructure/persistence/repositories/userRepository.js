"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userModel_1 = __importDefault(require("@infrastructure/persistence/models/userModel"));
class UserRepository {
    async createUser(userDetails) {
        const user = new userModel_1.default(userDetails);
        return user.save();
    }
    async findById(userId) {
        return userModel_1.default.findById(userId);
    }
    async findByEmail(email) {
        return userModel_1.default.findOne({ email });
    }
    async updateUser(userId, updateData) {
        return userModel_1.default.findByIdAndUpdate(userId, updateData, { new: true });
    }
    async deleteUser(userId) {
        return userModel_1.default.findByIdAndDelete(userId);
    }
}
exports.UserRepository = UserRepository;
