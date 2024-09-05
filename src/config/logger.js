const { createLogger, format, transports } = require("winston");
require("winston-mongodb");
require("dotenv").config();

// Create the logger
const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({ format: format.simple(), level: "info" }), // Log all levels to console
  ],
});

// Optional: Add MongoDB transport if a connection string is provided
if (process.env.MONGODB_URI) {
  logger.add(
    new transports.MongoDB({
      level: "info",
      db: process.env.MONGODB_URI,
      options: { useUnifiedTopology: true },
      collection: "app_logs",
    }),
  );
}

logger.info("Logger initialized.");

module.exports = logger;
