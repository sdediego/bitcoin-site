const express = require('express');
const router  = express.Router();
const authRoutes = require('./auth.routes');
const verificationRoutes = require('./verification.routes');
//const authSteemitRoutes = require('./authSteemit.routes');

router.use('/auth', authRoutes);
router.use('/verification', verificationRoutes);
//router.use('/authSteemit', authSteemitRoutes);

module.exports = router;
