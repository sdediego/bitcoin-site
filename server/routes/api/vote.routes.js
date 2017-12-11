const express = require('express');
const passportConfig = require('./../../config/passport.config');
const voteController = require('./../../controllers/vote.controller');
const router = express.Router();

router.get('/:threadId', passportConfig.isAuthenticated, voteController.vote);

module.exports = router;
