const express = require('express');
const { createLogger, format } = require('winston');
const winston = require('winston');
const { combine, prettyPrint, colorize } = format;


const app = express();

app.listen('3000', () => {
    const logger = createLogger({
        level: 'info',
        transports: [
          new winston.transports.Console({
            format: combine(prettyPrint(), colorize()),
          }),
        ],
      });
      logger.info(`listening to port 3000`);
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})