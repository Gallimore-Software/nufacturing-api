import { createLogger } from "winston";
import loggerConfig from "@logging/loggerConfig";

const logger = createLogger(loggerConfig);

logger.info("Logger initialized.");

export default logger;
