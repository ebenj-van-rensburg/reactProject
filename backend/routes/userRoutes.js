const express = require('express');
const { getUserProfile, getAllUsers, getUserById } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/profile').get(protect, getUserProfile);
router.route('/:id').get(getUserById); // Add route to get user by ID
router.route('/').get(getAllUsers);

module.exports = router;