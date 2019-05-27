import winston from 'winston';
import path from 'path';

const logDir = 'logs/';
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'info.log'), level: 'info' }),
        new winston.transports.File({ filename: path.join(logDir, 'debug.log'), level: 'debug' }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default logger;