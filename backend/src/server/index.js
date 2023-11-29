const cors = require('cors');
const express = require('express');
const expessWinston = require('express-winston');
const helmet = require('helmet');
const morgan = require('morgan');
const requestId = require('express-request-id');
const v1Routes = require('./routes/v1/index');
const winston = require('winston');

// Initialize app
const app = express();

// Setup app
app.use(helmet());
app.use(express.json());
app.use(requestId());
app.use(cors())

// Setup logging
app.use(morgan('[:date[iso]] Started :method :url for :remote-addr', { immediate: true }));
app.use(morgan('[:date[iso]] Completed :method :url :status - :response-time ms', {
    skip: (_req, res) => res.statusCode >= 400
}));
app.use(morgan('[:date[iso]] Failed :method :url :status - :response-time ms', {
    skip: (_req, res) => res.statusCode < 400
}));
const apiLogPath = process.env.LOGPATH_API|| undefined;
if (apiLogPath) {
    app.use(expessWinston.logger({
        transports: [
            new winston.transports.File({ filename: apiLogPath })
        ],
        format: winston.format.combine(
            winston.format.label({ label: process.env.ENV ? process.env.ENV : 'DEV'}),
            winston.format.timestamp(),
            winston.format.json()
        )
    }));
}

// Setup routes
app.get('/ping', (_req, res) => {
    return res.status(200).json({ message: 'pong' });
});
app.use('/api/v1', v1Routes);

module.exports = app;
