const mariadb = require('mariadb');
const logger = require('./../../logger');
require('dotenv').config();

const mariadbConnectionPool = mariadb.createPool({
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
    connectionLimit: process.env.MARIADB_POOL
});

const initMariaDb = async () => {
    try {
        // Test connection
        const connection = await mariadbConnectionPool.getConnection();
        await connection.query('SELECT 1 AS val');
        connection.end();
        logger.info('Connected to MariaDB successfully');
    } catch (err) {
        logger.error('Failed to connect to MariaDB', err);
        throw err;
    }
}

const mariadbConnection = async () => {
    return await mariadbConnectionPool.getConnection();
};
module.exports = {
    initMariaDb,
    mariadbConnection
};