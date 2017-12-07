const express = require('express');
const router  = express.Router();
const authRoutes = require('./auth.routes');
const verificationRoutes = require('./verification.routes');
const categoryRoutes = require('./category.routes');
const threadRoutes = require('./thread.routes');
//const authSteemitRoutes = require('./authSteemit.routes');

router.use('/auth', authRoutes);
router.use('/verification', verificationRoutes);
router.use('/categories', categoryRoutes);
router.use('/thread', threadRoutes);
//router.use('/authSteemit', authSteemitRoutes);

module.exports = router;
