const mariadb = require('mariadb');
require('dotenv').config();

const url = 'https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2023-10-01&end_date=2023-10-10';
const connectionOptions = {
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE
};

const relativeHumidity = [];
const directRadiation = [];
const temperature = [];
const axisUnits = [];

const initDb = async () => {
    // Retrieve and parse data
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Validate data
        const validationErrors = [];
        const hourlyData = data.hourly || {};
        const dailyData = data.daily || {};
        if (hourlyData.relativehumidity_2m === undefined || hourlyData.relativehumidity_2m.length === 0) validationErrors.push('No relative humidity data found');
        if (hourlyData.direct_radiation === undefined || hourlyData.direct_radiation.length === 0) validationErrors.push('No direct radiation data found');
        if (dailyData.temperature_2m_max === undefined || dailyData.temperature_2m_max.length === 0) validationErrors.push('No direct radiation data found');
        if (dailyData.temperature_2m_min === undefined || dailyData.temperature_2m_min.length === 0) validationErrors.push('No direct radiation data found');
        if (validationErrors.length !== 0) throw validationErrors.join(', ');

        // Prepare relative humidity and direct radiation table data
        for (let i=0; i<hourlyData.time.length; i++) {
            relativeHumidity.push([new Date(`${hourlyData.time[i]}Z`), hourlyData.relativehumidity_2m[i]]);
            directRadiation.push([new Date(`${hourlyData.time[i]}Z`), hourlyData.direct_radiation[i]]);
        }
    
        // Prepare temperature table data
        for (let j=0; j<dailyData.time.length; j++) {
            temperature.push([new Date(`${dailyData.time[j]}T00:00Z`), dailyData.temperature_2m_max[j], dailyData.temperature_2m_min[j]]);
        }
    
        // Prepare axis unit table
        const timezone = (data.timezone_abbreviation[0] === '+' || data.timezone_abbreviation[0] === '-') ? `GMT${data.timezone_abbreviation}` : data.timezone_abbreviation;
        axisUnits.push(['relativeHumidity', data.hourly_units.relativehumidity_2m, timezone]);
        axisUnits.push(['directRadiation', data.hourly_units.direct_radiation, timezone]);
        axisUnits.push(['temperature', data.daily_units.temperature_2m_max, timezone]);
    } catch (err) {
        console.log('Failed to retrieve data', err);
        process.exit(1);
    }

    // Insert data to database
    let conn;
    try {
        conn = await mariadb.createConnection(connectionOptions);
        console.log('Connected to mariadb.');

        // Insert data
        await conn.batch('INSERT INTO relativeHumidity(time, relativeHumidity) VALUES (?, ?)', relativeHumidity);
        await conn.batch('INSERT INTO directRadiation(time, directRadiation) VALUES (?, ?)', directRadiation);
        await conn.batch('INSERT INTO temperature(date, max, min) VALUES (?, ?, ?)', temperature);
        await conn.batch('INSERT INTO axisUnits(tableName, yAxis, xAxis) VALUES (?, ?, ?)', axisUnits);
        await conn.commit();
    } catch (err) {
        console.log('Failed to insert data to database', err);
        if (conn) await conn.rollback();
        process.exit(1);
    } finally {
        if (conn !== undefined) conn.end();
    }
};

initDb().then(() => { console.log('Done populating database') }).catch((err) => { throw err });