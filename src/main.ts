import https from 'https';
import fs from 'fs';
import 'reflect-metadata'; // Necessary for InversifyJS to work
import 'module-alias/register';
import * as dotenv from 'dotenv';
import app from '@app/app';
import logger from '@infrastructure/logging/logger';

// Load the environment variables based on the NODE_ENV
logger.info('Starting API in :', process.env.NODE_ENV);

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

// SSL certificates
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

const PORT = process.env.PORT || 3000;

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
