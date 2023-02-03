const express = require('express');
const postController = require('../controllers/post.controller');
const tokenValiation = require('../middlewares/tokenValiation');

const router = express.Router();

router.post('/', tokenValiation.validateToken, postController.addPost);

module.exports = router;