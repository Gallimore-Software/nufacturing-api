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

// Determine if HTTPS or HTTP should be used
const PORT = process.env.PORT || 3000;
const USE_HTTPS = process.env.USE_HTTPS === 'true';

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} (HTTP)`);
});
