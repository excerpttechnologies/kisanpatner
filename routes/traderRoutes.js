const express = require('express');
const router = express.Router();
const traderCtrl = require('../controllers/traderController');

router.post('/', traderCtrl.createTrader);
router.get('/:id', traderCtrl.getTrader);

module.exports = router;
