const express = require('express');
const router  = express.Router();

const authRoutes = require('./auth.routes');
//const verifyRoutes = require('./tempVerify.routes');
//const authSteemitRoutes = require('./authSteemit.routes');

router.use('/auth', authRoutes);
//router.use('/verify', verifyRoutes);
//router.use('/authSteemit', authSteemitRoutes);

module.exports = router;
