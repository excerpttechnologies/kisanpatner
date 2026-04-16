const router = require('express').Router();
const ctrl   = require('../controllers/marketOrderController');
const { protect } = require('../middleware/marketAuth');

router.post('/create',       protect, ctrl.createOrder);
router.get('/my',            protect, ctrl.getMyOrders);
router.get('/sales',         protect, ctrl.getMySales);
router.patch('/:id/status',  protect, ctrl.updateOrderStatus);

module.exports = router;
