import https from 'https';
import fs from 'fs';
import 'reflect-metadata'; // Necessary for InversifyJS to work
import 'module-alias/register';
import * as dotenv from 'dotenv';
import app from '@app/app';
import logger from '@infrastructure/logging/logger';

// Load the environment variables based on the NODE_ENV
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

logger.info('Starting API in:', process.env.NODE_ENV);

// SSL certificates
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./csr.pem'),
};

// Determine if HTTPS or HTTP should be used
const PORT = process.env.PORT || 3000;
const USE_HTTPS = process.env.USE_HTTPS === 'true';

if (USE_HTTPS) {
  const httpsServer = https.createServer(httpsOptions, app);
  httpsServer.listen(PORT, () => {
    logger.info(`Server is running securely on port ${PORT} (HTTPS)`);
  });
} else {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT} (HTTP)`);
  });
}
