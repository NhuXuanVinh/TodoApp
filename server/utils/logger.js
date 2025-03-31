const winston = require('winston');

const consoleLogFormat = winston.format.combine(
	winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const fileLogFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.printf(({ timestamp, level, message }) => {
	  return `[${timestamp}] ${level}: ${message}`;
	})
  );

const logger = winston.createLogger({
  level: 'info', 
  transports: [
    // Log to the console
    new winston.transports.Console({
		format: consoleLogFormat,
	}),
    // Log to a file
    new winston.transports.File({
		format: fileLogFormat,
		filename: 'logs/combined.log'
	})
  ]
});

module.exports = logger;
