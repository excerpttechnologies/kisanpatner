const router = require('express').Router();
const ctrl   = require('../controllers/dashboardController');
const { protect } = require('../middleware/marketAuth');

router.get('/seller', protect, ctrl.sellerDashboard);
router.get('/buyer',  protect, ctrl.buyerDashboard);

module.exports = router;
