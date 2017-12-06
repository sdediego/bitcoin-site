const express = require('express');
const passportConfig = require('./../../config/passport.config');
const authController = require('./../../controllers/auth.controller');

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login);
router.get('/logout', passportConfig.isAuthenticated, authController.logout);
router.get('/loggedin', passportConfig.isAuthenticated, authController.isLoggedin);
router.get('/verification/:token', authController.verification);
router.post('/resend', authController.resend);
//router.get('/email-verification/:URL', authController.verifyEmail);

module.exports = router;
