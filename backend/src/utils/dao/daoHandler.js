const { mariadbConnection } = require('./mariadb/mariadbConnector');

const parseParams = (colName, params) => {
    const filters = [];
    if (params.startDate !== undefined) filters.push(`${colName} >= '${params.startDate}'`);
    if (params.endDate !== undefined) filters.push(`${colName} <= '${params.endDate}'`);
    return (filters.length !== 0) ? `WHERE ${filters.join(' AND ')}` : '';
}

const mariadbHandler = {
    getRelativeHumidity: async (params, callback) => {
        const query = `SELECT * FROM relativeHumidity ${parseParams('time', params)}`;
        let connection;
        try {
            connection = await mariadbConnection();
            const result = await connection.query(query);
            const time = [];
            const relativeHumidity = [];
            for (const data of result) {
                time.push(data.time);
                relativeHumidity.push(data.relativeHumidity);
            }
            callback({ time, relativeHumidity }, null);
        } catch (err) {
            callback(null, err);
        } finally {
            if (connection) connection.end();
        }
    },

    getDirectRadiation: async (params, callback) => {
        const query = `SELECT * FROM directRadiation ${parseParams('time', params)}`;
        console.log(query)
        let connection;
        try {
            connection = await mariadbConnection();
            const result = await connection.query(query);
            const time = [];
            const directRadiation = [];
            for (const data of result) {
                time.push(data.time);
                directRadiation.push(data.directRadiation);
            }
            callback({ time, directRadiation }, null);
        } catch (err) {
            callback(null, err);
        } finally {
            if (connection) connection.end();
        }
    },

    getTemperature: async (params, callback) => {
        const query = `SELECT * FROM temperature ${parseParams('date', params)}`;
        let connection;
        try {
            connection = await mariadbConnection();
            const result = await connection.query(query);
            const date = [];
            const max = [];
            const min = [];
            for (const data of result) {
                date.push(data.date);
                max.push(data.max);
                min.push(data.min);
            }
            callback({ date, max, min }, null);
        } catch (err) {
            callback(null, err);
        } finally {
            if (connection) connection.end();
        }
    },

    getAxisUnits: async (callback) => {
        const query = `SELECT * FROM axisUnits`;
        let connection;
        try {
            connection = await mariadbConnection();
            const result = await connection.query(query);
            const axisUnits = {};
            for (const data of result) {
                axisUnits[data.tableName] = {
                    x: data.xAxis,
                    y: data.yAxis
                }
            }
            callback(axisUnits, null);
        } catch (err) {
            callback(null, err);
        } finally {
            if (connection) connection.end();
        }
    }
};

module.exports = { mariadbHandler };