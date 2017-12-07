const express = require('express');
const replyController = require('./../../controllers/reply.controller');
const router = express.Router();

router.post('/:threadId', replyController.reply);
router.get('/remove/:replyId', replyController.removeReply);

module.exports = router;
