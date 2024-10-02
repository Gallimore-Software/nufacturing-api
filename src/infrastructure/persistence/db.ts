import mongoose from "mongoose";
import dotenv from "dotenv";
import { transports, format } from "winston";
import logger from "@logging/logger";

// Load environment variables
dotenv.config();

// Connect to MongoDB and add MongoDB transport
const connectDB = async () => {
  try {
    console.log(process.env.DB_URI);

    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);

    // Add MongoDB transport for logging
    logger.add(
      new transports.MongoDB({
        db: process.env.DB_URI,
        collection: "logs",
        level: "info",
        options: { useUnifiedTopology: true },
        format: format.combine(format.timestamp(), format.json()),
      }),
    );

    logger.info("Connected to MongoDB for logging.");
    console.log("Connected to MongoDB");
  } catch (err) {
    logger.error("Could not connect to MongoDB for logging", err);
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Exit the process if there is a connection error
  }
};

export default connectDB;
