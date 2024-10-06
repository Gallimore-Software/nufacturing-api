"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("@models/userModel"));
const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        // Validate token format
        if (!token || typeof token !== "string") {
            return res.status(400).json({ message: "Invalid token format" });
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Ensure token is not expired (if expiration was set during token creation)
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(400).json({ message: "Token has expired" });
        }
        // Find user by ID from the decoded token
        const user = await userModel_1.default.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if email is already verified
        if (user.emailVerified) {
            return res.status(200).json({ message: "Email already verified" });
        }
        // Verify email
        user.emailVerified = true;
        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(400).json({ message: "Token has expired" });
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(400).json({ message: "Invalid token" });
        }
        else if (error instanceof Error) {
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
        // Fallback for unknown error types
        return res.status(500).json({ message: "An unexpected error occurred" });
    }
};
exports.verifyEmail = verifyEmail;
