// const express = require('express');
// const router = express.Router();
// const farmerController = require('../controllers/authcontroller');

// // Import the existing registration route
// // (Keep your existing registerFarmer route)

// // Authentication Routes
// router.post('/send-otp', farmerController.sendOtp);
// router.post('/verify-otp-login', farmerController.verifyOtpLogin);
// router.post('/login-mpin', farmerController.loginWithMpin);
// router.post('/login-password', farmerController.loginWithPassword);

// // Export router
// module.exports = router;



const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

// Authentication Routes for all roles (farmer, trader, transport)
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp-login', authController.verifyOtpLogin);
router.post('/login-mpin', authController.loginWithMpin);
router.post('/login-password', authController.loginWithPassword);

// Transport-specific authentication routes (optional - they use same controllers)
router.post('/transport/send-otp', authController.sendOtp);
router.post('/transport/verify-otp-login', authController.verifyOtpLogin);
router.post('/transport/login-mpin', authController.loginWithMpin);
router.post('/transport/login-password', authController.loginWithPassword);

// Export router
module.exports = router;