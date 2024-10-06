"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = require("winston");
const logger_1 = __importDefault(require("@logging/logger"));
// Load environment variables
dotenv_1.default.config();
// Connect to MongoDB and add MongoDB transport
const connectDB = async () => {
    try {
        const dbUri = process.env.DB_URI;
        // Ensure DB_URI is defined
        if (!dbUri) {
            throw new Error("DB_URI is not defined in the environment variables");
        }
        // Connect to MongoDB
        await mongoose_1.default.connect(dbUri);
        // Add MongoDB transport for logging
        logger_1.default.add(new winston_1.transports.MongoDB({
            db: dbUri,
            collection: "logs",
            level: "info",
            options: { useUnifiedTopology: true },
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
        }));
        logger_1.default.info("Connected to MongoDB for logging.");
        console.log("Connected to MongoDB");
    }
    catch (err) {
        logger_1.default.error("Could not connect to MongoDB for logging", err);
        console.error("Could not connect to MongoDB", err);
        process.exit(1); // Exit the process if there is a connection error
    }
};
exports.default = connectDB;
