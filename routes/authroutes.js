const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/authcontroller');

// Import the existing registration route
// (Keep your existing registerFarmer route)

// Authentication Routes
router.post('/send-otp', farmerController.sendOtp);
router.post('/verify-otp-login', farmerController.verifyOtpLogin);
router.post('/login-mpin', farmerController.loginWithMpin);
router.post('/login-password', farmerController.loginWithPassword);

// Export router
module.exports = router;