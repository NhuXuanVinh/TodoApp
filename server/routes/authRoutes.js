
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware')

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

router.get('/verify-token', authMiddleware.verifyToken, authController.validateToken)

module.exports = router;
