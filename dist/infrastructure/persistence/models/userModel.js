"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin", "manager"], default: "user" },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  emailVerified: { type: Boolean, default: false },
});
const User = mongoose_1.default.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=userModel.js.map
