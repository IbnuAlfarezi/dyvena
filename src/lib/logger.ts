import winston from 'winston';
import 'winston-daily-rotate-file';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create the logger
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Write all logs with level `error` and below to `error-%DATE%.log`
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d', // Keep logs for 14 days
      zippedArchive: true,
    }),
    // Write all logs with level `info` and below to `app-%DATE%.log`
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      zippedArchive: true,
    }),
  ],
});

// If we're not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}
