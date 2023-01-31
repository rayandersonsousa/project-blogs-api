const express = require('express');
const categoryController = require('../controllers/category.controller');
const tokenValidation = require('../middlewares/tokenValiation');

const router = express.Router();

router.post('/', tokenValidation.validateToken, categoryController.addCategory);
router.get('/', tokenValidation.validateToken, categoryController.getAll);

module.exports = router;