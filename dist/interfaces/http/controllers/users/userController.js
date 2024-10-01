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
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
// Joi validation schema
const userSchema = joi_1.default.object({
  username: joi_1.default.string().min(3).max(30).required(),
  password: joi_1.default.string().min(6).required(),
  email: joi_1.default.string().email().required(),
  role: joi_1.default
    .string()
    .valid("user", "admin", "manager")
    .default("user"),
  phoneNumber: joi_1.default
    .string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
});
const loginSchema = joi_1.default.object({
  email: joi_1.default.string().email().required(),
  password: joi_1.default.string().min(6).required(),
});
// Get all users
exports.getAllUsers = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const users = yield userModel_1.default.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Error fetching users", error: err });
    }
  });
// Get a single user by ID
exports.getUserById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = yield userModel_1.default.findById(req.params._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error fetching user", error: err });
    }
  });
// Create a new user and issue JWT token
exports.createUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({
            message: "Validation error",
            error: error.details[0].message,
          });
      }
      // Hash the password before saving
      const saltRounds = 10;
      const hashedPassword = yield bcrypt_1.default.hash(
        req.body.password,
        saltRounds,
      );
      const user = new userModel_1.default(
        Object.assign(Object.assign({}, req.body), {
          password: hashedPassword,
          verified: false,
        }),
      );
      yield user.save();
      // Generate JWT token
      const token = jsonwebtoken_1.default.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "5h" },
      );
      // Generate verification token
      const verificationToken = jsonwebtoken_1.default.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );
      // Send verification email
      const verificationLink = process.env.LIVE_API_URL
        ? `${process.env.LIVE_API_URL}/api/users/verify/${verificationToken}`
        : `http://localhost:3000/api/users/verify/${verificationToken}`;
      yield (0, sendEmail_1.default)(
        user.email,
        "Email Verification",
        `Please verify your email by clicking on the following link: ${verificationLink}`,
      );
      res.status(201).json({ user, token }); // Send user and token in response
    } catch (err) {
      res.status(400).json({ message: "Error creating user", error: err });
    }
  });
// Update a user by ID
exports.updateUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({
            message: "Validation error",
            error: error.details[0].message,
          });
      }
      const user = yield userModel_1.default.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: "Error updating user", error: err });
    }
  });
// Delete a user by ID
exports.deleteUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = yield userModel_1.default.findByIdAndDelete(req.params._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user", error: err });
    }
  });
exports.loginUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({
            message: "Validation error",
            error: error.details[0].message,
          });
      }
      const { email, password } = req.body;
      // Find user by email
      const user = yield userModel_1.default.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      // Check if the email is verified
      if (!user.emailVerified) {
        return res.status(401).json({ message: "Email not verified" });
      }
      // Compare passwords
      const isMatch = yield bcrypt_1.default.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      // Generate JWT token
      const token = jsonwebtoken_1.default.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );
      // Respond with token and user info
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Error logging in", error: err });
    }
  });
//# sourceMappingURL=userController.js.map
