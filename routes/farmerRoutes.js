// const express = require('express');
// const router = express.Router();
// const farmerController = require('../controllers/farmerController');
// const upload = require('../middleware/upload');

// // ==================== EXISTING FARMER ROUTES ====================

// // Register farmer
// router.post('/', upload.fields([
//   { name: 'panCard', maxCount: 1 },
//   { name: 'aadharFront', maxCount: 1 },
//   { name: 'aadharBack', maxCount: 1 },
//   { name: 'bankPassbook', maxCount: 1 }
// ]), farmerController.registerFarmer);

// // Verify MPIN
// router.post('/verify-mpin', farmerController.verifyMpin);

// // Get all farmers
// router.get('/all', farmerController.getAllFarmers);

// // Search farmers
// router.get('/search', farmerController.searchFarmers);

// // Get farmer statistics
// router.get('/stats', farmerController.getFarmerStats);

// // Get farmer by ID
// router.get('/:id', farmerController.getFarmerById);

// // Update farmer
// router.put('/update/:id', farmerController.updateFarmer);
// router.put('/:id', upload.fields([
//   { name: 'panCard', maxCount: 1 },
//   { name: 'aadharFront', maxCount: 1 },
//   { name: 'aadharBack', maxCount: 1 },
//   { name: 'bankPassbook', maxCount: 1 }
// ]), farmerController.updateFarmer);

// // Soft delete farmer
// router.delete('/:id', farmerController.deleteFarmer);

// // Permanent delete farmer
// router.delete('/:id/permanent', farmerController.permanentlyDeleteFarmer);

// // Market transportation orders
// router.post('/list', farmerController.getFarmerMarketTransportationOrders);

// /**
//  * @route   POST /api/farmer/market-transportation/order-details
//  * @desc    Get specific order details
//  * @access  Public (farmerId sent in body)
//  * @body    { farmerId: "FARMER_ID", orderId: "ORDER_ID" }
//  */
// router.post('/order-details', farmerController.getFarmerOrderDetails);

// /**
//  * @route   POST /api/farmer/market-transportation/update
//  * @desc    Update quantity sent by farmer
//  * @access  Public (farmerId sent in body)
//  * @body    { farmerId: "FARMER_ID", orderId: "ORDER_ID", productItemUpdates: [...] }
//  */
// router.post('/update', farmerController.updateFarmerMarketTransportation);

// // ==================== NEW TRADER PROFILE ROUTES ====================
// // These routes fix the 404 errors in your logs

// /**
//  * @route   GET /api/farmer/trader/:traderId
//  * @desc    Get trader profile by traderId
//  * @access  Public
//  */
// router.get('/trader/:traderId', farmerController.getTraderProfile);

// /**
//  * @route   GET /api/farmer/trader/profile/:traderId
//  * @desc    Get trader profile by traderId (alternative route)
//  * @access  Public
//  */
// router.get('/trader/profile/:traderId', farmerController.getTraderProfile);

// /**
//  * @route   GET /api/farmer/profile/:userId
//  * @desc    Get user profile by any identifier (ID, farmerId, traderId)
//  * @access  Public
//  */
// router.get('/profile/:userId', farmerController.getUserProfile);

// /**
//  * @route   GET /api/farmer/profile/get/:id
//  * @desc    Get profile by any identifier (alternative route)
//  * @access  Public
//  */
// router.get('/profile/get/:id', farmerController.getProfileById);

// module.exports = router;












//updated by sagar



// backend/routes/farmerRoutes.js

const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const uploadFields=require('../middleware/uploadFields')
const upload= require('../middleware/upload')


router.post('/', uploadFields, farmerController.registerFarmer)

// Verify MPIN
router.post('/verify-mpin', farmerController.verifyMpin);

// Get all farmers
router.get('/all', farmerController.getAllFarmers);

// Search farmers
router.get('/search', farmerController.searchFarmers);

// Get farmer statistics
router.get('/stats', farmerController.getFarmerStats);

// Get farmer by ID
router.get('/:id', farmerController.getFarmerById);

// Update farmer
router.put('/update/:id', farmerController.updateFarmer);
router.put('/:id', upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'aadharFront', maxCount: 1 },
  { name: 'aadharBack', maxCount: 1 },
  { name: 'bankPassbook', maxCount: 1 }
]), farmerController.updateFarmer);

// Soft delete farmer
router.delete('/:id', farmerController.deleteFarmer);

// Permanent delete farmer
router.delete('/:id/permanent', farmerController.permanentlyDeleteFarmer);

// Market transportation orders
router.post('/list', farmerController.getFarmerMarketTransportationOrders);

/**
 * @route   POST /api/farmer/market-transportation/order-details
 * @desc    Get specific order details
 * @access  Public (farmerId sent in body)
 * @body    { farmerId: "FARMER_ID", orderId: "ORDER_ID" }
 */
router.post('/order-details', farmerController.getFarmerOrderDetails);

/**
 * @route   POST /api/farmer/market-transportation/update
 * @desc    Update quantity sent by farmer
 * @access  Public (farmerId sent in body)
 * @body    { farmerId: "FARMER_ID", orderId: "ORDER_ID", productItemUpdates: [...] }
 */
router.post('/update', farmerController.updateFarmerMarketTransportation);

// ==================== NEW TRADER PROFILE ROUTES ====================
// These routes fix the 404 errors in your logs

/**
 * @route   GET /api/farmer/trader/:traderId
 * @desc    Get trader profile by traderId
 * @access  Public
 */
router.get('/trader/:traderId', farmerController.getTraderProfile);

/**
 * @route   GET /api/farmer/trader/profile/:traderId
 * @desc    Get trader profile by traderId (alternative route)
 * @access  Public
 */
router.get('/trader/profile/:traderId', farmerController.getTraderProfile);

/**
 * @route   GET /api/farmer/profile/:userId
 * @desc    Get user profile by any identifier (ID, farmerId, traderId)
 * @access  Public
 */
router.get('/profile/:userId', farmerController.getUserProfile);

/**
 * @route   GET /api/farmer/profile/get/:id
 * @desc    Get profile by any identifier (alternative route)
 * @access  Public
 */
router.get('/profile/get/:id', farmerController.getProfileById);

module.exports = router;
