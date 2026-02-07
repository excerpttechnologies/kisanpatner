// const express = require('express');
// const router = express.Router();
// const farmerController = require('../controllers/farmerController');
// const upload = require('../middleware/upload');


// router.post('/', upload.fields([
//   { name: 'panCard', maxCount: 1 },
//   { name: 'aadharFront', maxCount: 1 },
//   { name: 'aadharBack', maxCount: 1 },
//   { name: 'bankPassbook', maxCount: 1 }
// ]), farmerController.registerFarmer);


// router.post('/verify-mpin', farmerController.verifyMpin);


// router.get('/all', farmerController.getAllFarmers);


// router.get('/search', farmerController.searchFarmers);


// router.get('/stats', farmerController.getFarmerStats);


// router.get('/:id', farmerController.getFarmerById);

// router.put('/update/:id', farmerController.updateFarmer);
// router.put('/:id', upload.fields([
//   { name: 'panCard', maxCount: 1 },
//   { name: 'aadharFront', maxCount: 1 },
//   { name: 'aadharBack', maxCount: 1 },
//   { name: 'bankPassbook', maxCount: 1 }
// ]), farmerController.updateFarmer);


// router.delete('/:id', farmerController.deleteFarmer);


// router.delete('/:id/permanent', farmerController.permanentlyDeleteFarmer);

// module.exports = router;


const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const upload = require('../middleware/upload');


router.post('/', upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'aadharFront', maxCount: 1 },
  { name: 'aadharBack', maxCount: 1 },
  { name: 'bankPassbook', maxCount: 1 }
]), farmerController.registerFarmer);


router.post('/verify-mpin', farmerController.verifyMpin);


router.get('/all', farmerController.getAllFarmers);


router.get('/search', farmerController.searchFarmers);


router.get('/stats', farmerController.getFarmerStats);


router.get('/:id', farmerController.getFarmerById);

router.put('/update/:id', farmerController.updateFarmer);
router.put('/:id', upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'aadharFront', maxCount: 1 },
  { name: 'aadharBack', maxCount: 1 },
  { name: 'bankPassbook', maxCount: 1 }
]), farmerController.updateFarmer);


router.delete('/:id', farmerController.deleteFarmer);


router.delete('/:id/permanent', farmerController.permanentlyDeleteFarmer);
router.post(
  '/list',
  farmerController.getFarmerMarketTransportationOrders
);

/**
 * @route   POST /api/farmer/market-transportation/order-details
 * @desc    Get specific order details
 * @access  Public (farmerId sent in body)
 * @body    { farmerId: "FARMER_ID", orderId: "ORDER_ID" }
 */
router.post(
  '/order-details',
  farmerController.getFarmerOrderDetails
);

/**
 * @route   POST /api/farmer/market-transportation/update
 * @desc    Update quantity sent by farmer
 * @access  Public (farmerId sent in body)
 * @body    { farmerId: "FARMER_ID", orderId: "ORDER_ID", productItemUpdates: [...] }
 */
router.post(
  '/update',
  farmerController.updateFarmerMarketTransportation
);

module.exports = router;