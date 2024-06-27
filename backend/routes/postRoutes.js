const express = require('express');
const { createPost, getPostsByUser, getPostById } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createPost);
router.route('/user/:userId').get(getPostsByUser);
router.route('/:id').get(getPostById);

module.exports = router;