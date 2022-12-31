const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const customLogFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      filename: 'server.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        customLogFormat
      )
    })
  ]
});

module.exports = logger;