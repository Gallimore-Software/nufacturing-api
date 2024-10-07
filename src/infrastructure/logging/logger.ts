import { createLogger } from "winston";

import loggerConfig from "./logger-config";

const logger = createLogger(loggerConfig);

logger.info("Logger initialized.");

export default logger;
