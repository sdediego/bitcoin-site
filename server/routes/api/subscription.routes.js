const express = require('express');
const subscribeController = require('./../../controllers/subscription.controller');
const router = express.Router();


router.post('/', subscribeController.send);

module.exports = router;
