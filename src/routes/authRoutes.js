const express = require('express');
const router = express.Router();
const {registerUser, loginUser, deleteUser} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// only admins may remove accounts
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;