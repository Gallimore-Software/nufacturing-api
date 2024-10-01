"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const verifyEmail = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const token = req.params.token;
      // Validate token format
      if (!token || typeof token !== "string") {
        return res.status(400).json({ message: "Invalid token format" });
      }
      // Verify token
      const decoded = jsonwebtoken_1.default.verify(
        token,
        process.env.JWT_SECRET,
      );
      // Ensure token is not expired (if expiration was set during token creation)
      if (Date.now() >= decoded.exp * 1000) {
        return res.status(400).json({ message: "Token has expired" });
      }
      // Find user by ID from the decoded token
      const user = yield userModel_1.default.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Check if email is already verified
      if (user.emailVerified) {
        return res.status(200).json({ message: "Email already verified" });
      }
      // Verify email
      user.emailVerified = true;
      yield user.save();
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({ message: "Token has expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(400).json({ message: "Invalid token" });
      }
      res.status(500).json({ message: "Internal server error", error });
    }
  });
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=authController.js.map
