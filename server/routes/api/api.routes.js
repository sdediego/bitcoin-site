const express = require('express');
const router  = express.Router();

const authRoutes = require('./auth.routes');
//const authSteemitRoutes = require('./authSteemit.routes');

router.use('/auth', authRoutes);
//router.use('/authSteemit', authSteemitRoutes);

module.exports = router;
