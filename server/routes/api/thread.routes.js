const express = require('express');
const passportConfig = require('./../../config/passport.config');
const threadController = require('./../../controllers/thread.controller');
const router = express.Router();

router.post('/new/:category', passportConfig.isAuthenticated, threadController.newThread);
router.get('/:id', threadController.thread);
router.get('/:id/remove', passportConfig.isAuthenticated, threadController.removeThread);
//router.post('/:id/reply', threadController.reply);
//router.get('/:id/reply/:replyId', threadController.removeReply);
//router.post('/:id/vote', threadController.vote);

module.exports = router;
