const express = require('express');
const authRoutes = require('./auth.routes');
//const authSteemitRoutes = require('./authSteemit.routes');
const verificationRoutes = require('./verification.routes');
const categoryRoutes = require('./category.routes');
const threadRoutes = require('./thread.routes');
const replyRoutes = require('./reply.routes');
const voteRoutes = require('./vote.routes');
const router  = express.Router();

router.use('/auth', authRoutes);
//router.use('/authSteemit', authSteemitRoutes);
router.use('/verification', verificationRoutes);
router.use('/categories', categoryRoutes);
router.use('/thread', threadRoutes);
router.use('/reply', replyRoutes);
router.use('/vote', voteRoutes);

module.exports = router;
