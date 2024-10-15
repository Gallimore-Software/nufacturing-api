import mongoose from 'mongoose';
import logger from '@logging/logger';
import { transports, format } from 'winston';
import dbConfig from '@infrastructure/config/db-config'; // Import the MongoDB URI

// Function to connect to MongoDB and add MongoDB transport for logging
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the config file
    await mongoose.connect(dbConfig.mongoURI);

    // Add MongoDB transport for logging
    logger.add(
      new transports.MongoDB({
        db: dbConfig.mongoURI,
        collection: 'logs',
        level: 'info',
        options: { useUnifiedTopology: true },
        format: format.combine(format.timestamp(), format.json()),
      })
    );

    logger.info('Connected to MongoDB for logging.');
    console.log('Connected to MongoDB');
  } catch (err) {
    logger.error('Could not connect to MongoDB for logging', err);
    process.exit(1); // Exit the process if there is a connection error
  }
};

export default connectDB;
