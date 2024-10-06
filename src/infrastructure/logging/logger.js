"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const loggerConfig_1 = __importDefault(require("./loggerConfig"));
const logger = (0, winston_1.createLogger)(loggerConfig_1.default);
logger.info("Logger initialized.");
exports.default = logger;
