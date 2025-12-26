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

module.exports = router;