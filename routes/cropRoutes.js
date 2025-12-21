const express = require('express');
const router = express.Router();
const { addCrop, getFarmerCrops } = require('../controllers/cropController');

router.post('/add', addCrop);
router.get('/farmer/:id', getFarmerCrops);

module.exports = router;
