const express = require('express');
const weatherDataController = require('./../../../controllers/weatherData');

// Initialize /api/v1/* routes
const router = express.Router();

// GET Requests
router.get('/relativeHumidity', weatherDataController.getRelativeHumidity);
router.get('/temperature', weatherDataController.getTemperature);
router.get('/directRadiation', weatherDataController.getDirectRadiation);
router.get('/axisUnits', weatherDataController.getAxisUnits);

module.exports = router;