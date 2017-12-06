const express = require('express');
const passportConfig = require('./../../config/passport.config');
const categoryController = require('./../../controllers/category.controller');
const router = express.Router();

router.get('/categories', passportConfig.isAuthenticated, categoryController.category);

module.exports = router;
