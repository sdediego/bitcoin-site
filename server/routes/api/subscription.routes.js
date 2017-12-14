const express = require('express');
const subscribeController = require('./../../controllers/subscription.controller');
const router = express.Router();

console.log('EN LA RUTA CORRECTA');
router.post('/', subscribeController.send);

module.exports = router;
