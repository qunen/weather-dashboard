const logger = require('../utils/logger/index');
const dao = require('./../utils/dao/daoHandler');

class RestaurantController {
    static async allRestaurant(_req, res) {
        const callback = (restaurants, err) => {
            if (err === null) {
                logger.info(`Retrieved ${restaurants.length} entries`);
                res.status(200).json(restaurants);
            }
            else {
                logger.error('Failed to retrieve all restaurants data', err);
                res.status(400).json({success: false, error: 'Failed to retrieve all restaurants data'});
            }
        };
        await dao.mongodbHandler.getRestaurants(callback);
    }

    static async addRestaurant(req, res) {
        logger.info('Request body received', req.body);
        const callback = (newId, err) => {
            if (err === null) {
                logger.info(`Added restaurant ${req.body.name} successfully`);
                res.status(200).json({_id: newId});
            }
            else if (err.error === 'Restaurant Exists') {
                logger.error(`Restaurant ${req.body.name} already exist`, err);
                res.status(400).json({success: false, error: 'Restaurant already exists'});
            }
            else {
                logger.error(`Failed to add restaurant ${req.body.name}`, err);
                res.status(400).json({success: false, error: 'Failed to add restaurant data'});
            }
        }
        if (!req.body || !req.body.name && !req.body.address) return callback({error: 'invalid request body'});
        else await dao.mongodbHandler.addRestaurant({name: req.body.name, address: req.body.address}, callback);
    }
    
    static async deleteRestaurant(req, res) {
        logger.info('Request body received', req.body);
        const callback = (err) => {
            if (err === null) {
                logger.info(`Delete restaurant ${req.body.id} successfully`);
                res.status(200).json({success: true});
            }
            else {
                logger.error(`Failed to add restaurant ${req.body.id}`, err);
                res.status(400).json({success: false, error: 'Failed to delete restaurant data'});
            }
        }
        if (!req.body.id) callback({error: 'id not found'});
        await dao.mongodbHandler.deleteRestaurant(req.body.id, callback);
    }
}

module.exports = RestaurantController;