const express = require('express');
const router = express.Router();
const threadController = require('./../../controllers/thread.controller');

router.get('/:id', threadController.thread);

module.exports = router;
