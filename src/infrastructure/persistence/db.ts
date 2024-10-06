import logger from "@logging/logger";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { transports, format } from "winston";

// Load environment variables
dotenv.config();

// Connect to MongoDB and add MongoDB transport
const connectDB = async () => {
  try {
    const dbUri = process.env.DB_URI;

    // Ensure DB_URI is defined
    if (!dbUri) {
      throw new Error("DB_URI is not defined in the environment variables");
    }

    // Connect to MongoDB
    await mongoose.connect(dbUri);

    // Add MongoDB transport for logging
    logger.add(
      new transports.MongoDB({
        db: dbUri,
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
