const express = require('express');
const userController = require('../controllers/user.controller');
const tokenValidation = require('../middlewares/tokenValiation');

const router = express.Router();

router.post('/', userController.addUser);
router.get('/', tokenValidation.validateToken, userController.getAll);
router.get('/:id', tokenValidation.validateToken, userController.getById);

module.exports = router;