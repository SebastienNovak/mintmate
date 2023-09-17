const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Log only if info level or more severe
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

module.exports = logger;
