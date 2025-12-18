

// const express = require('express');
// const router = express.Router();
// const transporterController = require('../controllers/TransportController');
// const upload = require('../middleware/upload');

// // ====== AUTHENTICATION ROUTES ======
// router.post('/send-otp', transporterController.sendOtp);
// router.post('/verify-otp-login', transporterController.verifyOtpLogin);
// router.post('/login-with-mpin', transporterController.loginWithMpin);
// router.post('/login-with-password', transporterController.loginWithPassword);

// // ====== REGISTRATION ROUTE ======
// router.post('/register', 
//   upload.fields([
//     { name: 'rcBook', maxCount: 1 },
//     { name: 'insuranceDoc', maxCount: 1 },
//     { name: 'pollutionCert', maxCount: 1 },
//     { name: 'permitDoc', maxCount: 1 },
//     { name: 'driverLicense', maxCount: 1 },
//     { name: 'driverPhoto', maxCount: 1 },
//     { name: 'panCard', maxCount: 1 },
//     { name: 'aadharFront', maxCount: 1 },
//     { name: 'aadharBack', maxCount: 1 },
//     { name: 'bankPassbook', maxCount: 1 }
//   ]),
//   transporterController.registerTransporter
// );

// // ====== PROFILE ROUTES ======
// router.get('/profile/:id', transporterController.getProfile);
// router.put('/profile/:id', transporterController.updateProfile);

// // ====== SEARCH ROUTES ======
// router.get('/all', transporterController.getAllTransporters);
// router.get('/search', transporterController.searchTransportersByLocation);
// router.get('/vehicle/:vehicleNumber', transporterController.getTransporterByVehicleNumber);
// router.get('/vehicle-type/:vehicleType', transporterController.getTransportersByVehicleType);

// // Add the mobile number route
// router.get('/mobile/:mobileNo', transporterController.getTransporterByMobile);

// // ====== MANAGEMENT ROUTES ======
// router.put('/deactivate/:id', transporterController.deactivateTransporter);
// router.put('/update-rating/:id', transporterController.updateRating);

// module.exports = router;

const express = require('express');
const router = express.Router();
const transporterController = require('../controllers/TransportController');
const upload = require('../middleware/upload');

// ====== AUTHENTICATION ROUTES ======
router.post('/send-otp', transporterController.sendOtp);
router.post('/verify-otp-login', transporterController.verifyOtpLogin);
router.post('/login-with-mpin', transporterController.loginWithMpin);
router.post('/login-with-password', transporterController.loginWithPassword);

// ====== REGISTRATION ROUTE ======
router.post('/register', 
  upload.fields([
    { name: 'rcBook', maxCount: 1 },
    { name: 'insuranceDoc', maxCount: 1 },
    { name: 'pollutionCert', maxCount: 1 },
    { name: 'permitDoc', maxCount: 1 },
    { name: 'driverLicense', maxCount: 1 },
    { name: 'driverPhoto', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'aadharFront', maxCount: 1 },
    { name: 'aadharBack', maxCount: 1 },
    { name: 'bankPassbook', maxCount: 1 }
  ]),
  transporterController.registerTransporter
);

// ====== PROFILE ROUTES ======
router.get('/profile/:id', transporterController.getProfile);
router.put('/profile/:id', transporterController.updateProfile);

// ====== SEARCH ROUTES ======
router.get('/all', transporterController.getAllTransporters);
router.get('/search', transporterController.searchTransportersByLocation);
router.get('/vehicle/:vehicleNumber', transporterController.getTransporterByVehicleNumber);
router.get('/vehicle-type/:vehicleType', transporterController.getTransportersByVehicleType);

// Add the mobile number route
router.get('/mobile/:mobileNo', transporterController.getTransporterByMobile);

// ====== MANAGEMENT ROUTES ======
router.put('/deactivate/:id', transporterController.deactivateTransporter);
router.put('/update-rating/:id', transporterController.updateRating);

module.exports = router;