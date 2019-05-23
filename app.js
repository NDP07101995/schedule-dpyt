
const winston = require('winston');
const path = require('path');
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
const models = require('./src/models/index');

const schedule = require('node-schedule');

const job = schedule.scheduleJob('*/1 * * * *', function(){
    logger.debug('schedule run');
});

models.Channel.findAll({
    attributes: ['id', 'uid', 'title', 'thumbnail']
})
    .then(results => logger.debug(results))
    .catch(err => logger.error(err));


