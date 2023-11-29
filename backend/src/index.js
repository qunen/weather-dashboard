const app = require('./server/index');
const { initMariaDb } = require('./utils/dao/mariadb/mariadbConnector');

// Load environment variables from .env file
require('dotenv').config();

// Listen to port
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    
    // Initialize DB connection
    initMariaDb();
});

// Handle error and exception
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } 
    else {
        process.exit(1);
    }
};
const exceptionErrorHandler = (err) => {
    console.error('Unexpected error occured!', err);
    exitHandler
};

process.on('uncaughtException', exceptionErrorHandler);
process.on('unhandledRejection', exceptionErrorHandler);
process.on('SIGTERM', () => {
    if (server) server.close();
});