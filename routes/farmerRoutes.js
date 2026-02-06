const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// Public - registration (files optional)
router.post('/', upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'aadharFront', maxCount: 1 },
  { name: 'aadharBack', maxCount: 1 },
  { name: 'bankPassbook', maxCount: 1 }
]), farmerController.registerFarmer);

// Protected profile routes
router.get('/profile', auth, farmerController.getProfile);
router.get('/profile/:farmerId', auth, farmerController.getProfile);
router.put('/profile', auth, farmerController.updateProfile);
router.put('/profile/:farmerId', auth, farmerController.updateProfile);
router.post('/upload-document', auth, farmerController.uploadDocuments);
router.post('/upload-document/:farmerId', auth, farmerController.uploadDocuments);


router.post('/verify-mpin', farmerController.verifyMpin);


router.get('/all', farmerController.getAllFarmers);


router.get('/search', farmerController.searchFarmers);


router.get('/stats', farmerController.getFarmerStats);


router.get('/:id', farmerController.getFarmerById);


router.put('/:id', upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'aadharFront', maxCount: 1 },
  { name: 'aadharBack', maxCount: 1 },
  { name: 'bankPassbook', maxCount: 1 }
]), farmerController.updateFarmer);


router.delete('/:id', farmerController.deleteFarmer);


router.delete('/:id/permanent', farmerController.permanentlyDeleteFarmer);

module.exports = router;