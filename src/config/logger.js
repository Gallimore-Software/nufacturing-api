const { createLogger, format, transports } = require('winston');
require('winston-mongodb');
require('dotenv').config();

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log' }),
    new transports.Console({ format: format.simple(), level: 'error' }),
  ],
});

logger.info('Logger initialized.');

module.exports = logger;
