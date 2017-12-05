const express = require('express');
const passportConfig = require('./../../config/passport.config');
const authController = require('./../../controllers/authSteemit.controller');

const router = express.Router();
