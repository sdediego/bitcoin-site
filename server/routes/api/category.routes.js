const express = require('express');
const router = express.Router();
const categoryController = require('./../../controllers/category.controller');

router.get('/', categoryController.list);
router.get('/:category', categoryController.category);

module.exports = router;
