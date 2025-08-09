import { format, transports, createLogger } from 'winston';
import 'winston-mongodb';
import dotenv from 'dotenv';

dotenv.config();

const logLevel = process.env.LOG_LEVEL || 'info';

// Create the logger configuration
const loggerConfig = createLogger({
  level: logLevel,
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: logLevel, // The console transport respects the global log level
    }),
  ],
});

// Add MongoDB transport if a connection string is provided
if (process.env.MONGODB_URI) {
  loggerConfig.add(
    new transports.MongoDB({
      level: 'error',
      db: process.env.MONGODB_URI,
      options: { useUnifiedTopology: true },
      collection: 'app_logs',
    })
  );
}

export default loggerConfig;
