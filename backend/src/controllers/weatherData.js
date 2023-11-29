const logger = require('../utils/logger/index');
const dao = require('./../utils/dao/daoHandler');

class WeatherDataController {
    static async getRelativeHumidity(req, res) {
        const query = req.query;
        const callback = (data, err) => {
            if (err === null) {
                logger.info('Successfully retrieved relative humidity data');
                res.status(200).json({success: true, data: data});
            }
            else {
                logger.error('Failed to retrieve relative humidity data', err);
                res.status(400).json({success: false, error: 'Failed to retrieve relativeHumidity data'});
            }
        };
        await dao.mariadbHandler.getRelativeHumidity(query, callback);
    }

    static async getTemperature(req, res) {
        const query = req.query;
        const callback = (data, err) => {
            if (err === null) {
                logger.info('Successfully retrieved temperature data');
                res.status(200).json({success: true, data: data});
            }
            else {
                logger.error('Failed to retrieve temperature data', err);
                res.status(400).json({success: false, error: 'Failed to retrieve temperature data'});
            }
        };
        await dao.mariadbHandler.getTemperature(query, callback);
    }
    
    static async getDirectRadiation(req, res) {
        const query = req.query;
        const callback = (data, err) => {
            if (err === null) {
                logger.info('Successfully retrieved direct radiation data');
                res.status(200).json({success: true, data: data});
            }
            else {
                logger.error('Failed to retrieve direct radiation data', err);
                res.status(400).json({success: false, error: 'Failed to retrieve direct radiation data'});
            }
        };
        await dao.mariadbHandler.getDirectRadiation(query, callback);
    }

    static async getAxisUnits(_req, res) {
        const callback = (data, err) => {
            if (err === null) {
                logger.info('Successfully retrieved axis units data');
                res.status(200).json({success: true, data: data});
            }
            else {
                logger.error('Failed to retrieve axis units data', err);
                res.status(400).json({success: false, error: 'Failed to retrieve axis units data'});
            }
        };
        await dao.mariadbHandler.getAxisUnits(callback);
    }
}

module.exports = WeatherDataController;