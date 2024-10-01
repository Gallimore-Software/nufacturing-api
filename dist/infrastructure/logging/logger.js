"use strict";
const { createLogger } = require("winston");
const loggerConfig = require("../../config/loggerConfig");
const logger = createLogger(loggerConfig);
logger.info("Logger initialized.");
module.exports = logger;
//# sourceMappingURL=logger.js.map
