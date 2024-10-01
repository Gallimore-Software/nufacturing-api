"use strict";
const { createLogger, format, transports } = require("winston");
require("winston-mongodb");
require("dotenv").config();
const logLevel = process.env.LOG_LEVEL || "info";
const loggerConfig = {
  level: logLevel,
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(), // Add colorize for better readability in the console
        format.simple(),
      ),
      level: logLevel, // The console transport respects the global log level
    }),
  ],
};
// Add MongoDB transport if a connection string is provided
if (process.env.MONGODB_URI) {
  loggerConfig.transports.push(
    new transports.MongoDB({
      level: "error", // Log errors to MongoDB by default
      db: process.env.MONGODB_URI,
      options: { useUnifiedTopology: true },
      collection: "app_logs",
    }),
  );
}
module.exports = loggerConfig;
//# sourceMappingURL=loggerConfig.js.map
