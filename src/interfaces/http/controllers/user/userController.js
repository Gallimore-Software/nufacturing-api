"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("@infrastructure/persistence/models/userModel"));
const userMapper_1 = require("@app/mappers/userMapper");
const sendEmail_1 = __importDefault(require("@infrastructure/notifications/sendEmail"));
const joi_1 = __importDefault(require("joi"));
// Joi validation schema
const userSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().min(6).required(),
    email: joi_1.default.string().email().required(),
    role: joi_1.default.string().valid("user", "admin", "manager").default("user"),
    phoneNumber: joi_1.default.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional(),
});
// Create a new user and issue JWT token
const createUser = async (req, res) => {
    try {
        // Validate the request body
        const { error } = userSchema.validate(req.body);
        if (error) {
            res
                .status(400)
                .json({ message: "Validation error", error: error.details[0].message });
            return;
        }
        const userDTO = req.body;
        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(userDTO.password, saltRounds);
        const newUser = new userModel_1.default({
            ...userDTO,
            password: hashedPassword,
            verified: false,
        });
        await newUser.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "5h" });
        // Send verification email
        const verificationToken = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const verificationLink = `${process.env.LIVE_API_URL || "http://localhost:3000"}/api/users/verify/${verificationToken}`;
        await (0, sendEmail_1.default)(newUser.email, "Email Verification", `Please verify your email by clicking on the following link: ${verificationLink}`);
        res.status(201).json({ user: userMapper_1.UserMapper.toDTO(newUser), token });
    }
    catch (err) {
        res.status(400).json({
            message: "Error creating user",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.createUser = createUser;
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel_1.default.find();
        res.status(200).json(users.map(userMapper_1.UserMapper.toDTO));
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching users",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.getAllUsers = getAllUsers;
// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await userModel_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(userMapper_1.UserMapper.toDTO(user));
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching user",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.getUserById = getUserById;
// Update a user by ID
const updateUser = async (req, res) => {
    try {
        // Validate the request body
        const { error } = userSchema.validate(req.body);
        if (error) {
            res
                .status(400)
                .json({ message: "Validation error", error: error.details[0].message });
            return;
        }
        const userDTO = req.body;
        const updatedUser = await userModel_1.default.findByIdAndUpdate(req.params.id, userDTO, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(userMapper_1.UserMapper.toDTO(updatedUser));
    }
    catch (err) {
        res.status(400).json({
            message: "Error updating user",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.updateUser = updateUser;
// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await userModel_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (err) {
        res.status(500).json({
            message: "Error deleting user",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.deleteUser = deleteUser;
// Login user and issue JWT token
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Check if the email is verified
        if (!user.verified) {
            res.status(401).json({ message: "Email not verified" });
            return;
        }
        // Compare passwords
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Respond with token and user info
        res.status(200).json({
            message: "Login successful",
            token,
            user: userMapper_1.UserMapper.toDTO(user),
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error logging in",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.loginUser = loginUser;
