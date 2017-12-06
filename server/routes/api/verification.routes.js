const express = require('express');
const verifyController = require('./../../controllers/verification.controller');
const router = express.Router();

router.get('/:token', verifyController.verification);
router.post('/resend', verifyController.resend);

module.exports = router;
