"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const logger_1 = __importDefault(require("./infrastructure/logging/logger"));
const app_1 = __importDefault(require("./app/app"));
// Load the environment variables based on the NODE_ENV
logger_1.default.info("Starting API in :", process.env.NODE_ENV);
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`,
});
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
