const express = require('express');
const voteController = require('./../../controllers/vote.controller');
const router = express.Router();

router.post('/:threadId', voteController.vote);

module.exports = router;
