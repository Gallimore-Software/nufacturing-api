const mongoose = require('mongoose');
const { transports, format } = require('winston');
const logger = require('./logger');
require('dotenv').config();

// Connect to MongoDB and add MongoDB transport
const connectDB = async () => {
  try {
    console.log(process.env.DB_URI);
    await mongoose.connect(`${process.env.DB_URI}`);
    logger.add(new transports.MongoDB({
      db: process.env.DB_URI,
      collection: 'logs',
      level: 'info',
      options: { useUnifiedTopology: true },
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
    }));

    logger.info('Connected to MongoDB for logging.');
    console.log('Connected to MongoDB');
  } catch (err) {
    logger.error('Could not connect to MongoDB for logging', err);
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
