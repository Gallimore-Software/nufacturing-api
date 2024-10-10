import { createLogger } from 'winston';

import loggerConfig from './logger-config';

const Logger = createLogger(loggerConfig);

Logger.info('Logger initialized.');

export default Logger;
