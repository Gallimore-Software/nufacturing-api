import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Export the MongoDB URI for use in the db.ts file
const dbConfig = {
  mongoURI: process.env.DB_URI || '',
};

// Ensure DB_URI is defined
if (!dbConfig.mongoURI) {
  throw new Error('DB_URI is not defined in the environment variables');
}

export default dbConfig;
