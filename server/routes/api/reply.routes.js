const express = require('express');
const passportConfig = require('./../../config/passport.config');
const replyController = require('./../../controllers/reply.controller');
const router = express.Router();

router.post('/:threadId', passportConfig.isAuthenticated, replyController.reply);
router.get('/remove/:replyId', passportConfig.isAuthenticated, replyController.removeReply);

module.exports = router;
