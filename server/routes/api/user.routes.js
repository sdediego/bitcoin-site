const express = require('express');
const userController = require('./../../controllers/user.controller');
const router = express.Router();

router.get('/profile', userController.profile);
router.get('/profile/edit', userController.edit);
router.post('/profile/update', userController.update);

module.exports = router;
