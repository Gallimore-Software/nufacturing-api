"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
require("winston-mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logLevel = process.env.LOG_LEVEL || "info";
// Create the logger configuration
const loggerConfig = (0, winston_1.createLogger)({
    level: logLevel,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
            level: logLevel, // The console transport respects the global log level
        }),
    ],
});
// Add MongoDB transport if a connection string is provided
if (process.env.MONGODB_URI) {
    loggerConfig.add(new winston_1.transports.MongoDB({
        level: "error",
        db: process.env.MONGODB_URI,
        options: { useUnifiedTopology: true },
        collection: "app_logs",
    }));
}
exports.default = loggerConfig;
