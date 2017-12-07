const express = require('express');
const router = express.Router();
const threadController = require('./../../controllers/thread.controller');

router.post('/new', threadController.newThread);
router.get('/:id', threadController.thread);
router.post('/:id/reply', threadController.reply);
router.post('/:id/vote', threadController.vote);

module.exports = router;
