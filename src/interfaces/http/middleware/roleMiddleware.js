"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("@models/userModel"));
const roleMiddleware = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await userModel_1.default.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: "Access denied" });
            }
            req.user = user;
            next();
        }
        catch (err) {
            res.status(401).json({ message: "Unauthorized", err: err });
        }
    };
};
exports.default = roleMiddleware;
