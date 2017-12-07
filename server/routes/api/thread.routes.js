const express = require('express');
const threadController = require('./../../controllers/thread.controller');
const router = express.Router();

router.post('/new', threadController.newThread);
router.get('/:id', threadController.thread);
router.get('/:id/remove', threadController.removeThread);
//router.post('/:id/reply', threadController.reply);
//router.get('/:id/reply/:replyId', threadController.removeReply);
//router.post('/:id/vote', threadController.vote);

module.exports = router;
