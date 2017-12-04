const express = require('express');
const router  = express.Router();

const authRoutes = require('./auth.routes');
//const threadRoutes  = require('./thread.routes');

router.use('/auth', authRoutes);
//router.use('/threads', threadRoutes);

module.exports = router;
