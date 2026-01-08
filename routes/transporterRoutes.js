const express = require("express");
const router = express.Router();
const transporterController = require("../controllers/transportercontroller");
const upload = require("../middleware/upload");
// Get eligible orders for transporter (both accepted + future delivery)
router.get(
  "/eligible-orders",
  transporterController.getEligibleOrdersForTransporter
);

// Accept order by transporter
router.post("/:orderId/accept", transporterController.acceptOrderByTransporter);

// Reject order by transporter
router.post("/:orderId/reject", transporterController.rejectOrderByTransporter);

// Get transporter's accepted orders
router.get(
  "/:transporterId/orders",
  transporterController.getTransporterOrders
);
router.post(
  "/register",upload.fields([
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

router.post('/send-otp', transporterController.sendOtp);
router.post('/verify-otp-login', transporterController.verifyOtpLogin);
router.post('/login-with-mpin', transporterController.loginWithMpin);
router.post('/login-with-password', transporterController.loginWithPassword);

// ====== REGISTRATION ROUTE ======
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

// ====== PROFILE ROUTES ======
router.get('/profile/:id', transporterController.getProfile);
router.put('/profile/:id', transporterController.updateProfile);

// ====== VEHICLE MANAGEMENT ROUTES ======
// Add new vehicle
router.post('/profile/:id/vehicles',
  upload.fields([
    { name: 'rcBook', maxCount: 1 },
    { name: 'insuranceDoc', maxCount: 1 },
    { name: 'pollutionCert', maxCount: 1 },
    { name: 'permitDoc', maxCount: 1 },
    { name: 'driverLicense', maxCount: 1 },
    { name: 'driverPhoto', maxCount: 1 }
  ]),
  transporterController.addVehicle
);

// Update existing vehicle
router.put('/profile/:id/vehicles/:vehicleNumber',
  upload.fields([
    { name: 'rcBook', maxCount: 1 },
    { name: 'insuranceDoc', maxCount: 1 },
    { name: 'pollutionCert', maxCount: 1 },
    { name: 'permitDoc', maxCount: 1 },
    { name: 'driverLicense', maxCount: 1 },
    { name: 'driverPhoto', maxCount: 1 }
  ]),
  transporterController.updateVehicle
);

// Remove vehicle
router.delete('/profile/:id/vehicles/:vehicleNumber', transporterController.removeVehicle);

// Set primary vehicle
router.put('/profile/:id/vehicles/set-primary', transporterController.setPrimaryVehicle);

// Get all vehicles for a transporter
router.get('/profile/:id/vehicles', transporterController.getAllVehicles);

// Update profile with files (for single vehicle updates)
router.put('/profile/:id/update-with-files', 
  upload.fields([
    { name: 'rcBook', maxCount: 1 },
    { name: 'insuranceDoc', maxCount: 1 },
    { name: 'pollutionCert', maxCount: 1 },
    { name: 'permitDoc', maxCount: 1 },
    { name: 'driverLicense', maxCount: 1 }
  ]),
  transporterController.updateProfileWithFiles
);

// ====== SEARCH ROUTES ======
router.get('/all', transporterController.getAllTransporters);
router.get('/search', transporterController.searchTransportersByLocation);
router.get('/vehicle/:vehicleNumber', transporterController.getTransporterByVehicleNumber);
router.get('/vehicle-type/:vehicleType', transporterController.getTransportersByVehicleType);
router.get('/mobile/:mobileNo', transporterController.getTransporterByMobile);

// ====== MANAGEMENT ROUTES ======
router.put('/deactivate/:id', transporterController.deactivateTransporter);
router.put('/update-rating/:id', transporterController.updateRating);

module.exports = router;
