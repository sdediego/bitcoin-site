const express = require('express');
const router  = express.Router();

const apiRoutes = require('./api/api.routes');

router.use('/api', apiRoutes);

module.exports = router;
