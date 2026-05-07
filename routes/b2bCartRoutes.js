const router = require('express').Router();
const ctrl   = require('../controllers/b2bCartController');
const { protect } = require('../middleware/marketAuth');

// ─── All routes protected (B2B JWT) ──────────────────────────────────────────

// Cart
router.post('/cart/add',           protect, ctrl.addToCart);
router.get('/cart',                protect, ctrl.getCart);
router.put('/cart/:itemId',        protect, ctrl.updateCartItem);
router.delete('/cart/clear',       protect, ctrl.clearCart);
router.delete('/cart/:itemId',     protect, ctrl.removeFromCart);

// Orders
router.post('/orders/checkout',    protect, ctrl.checkout);
router.get('/orders',              protect, ctrl.getMyOrders);
router.get('/orders/:orderId',     protect, ctrl.getOrderById);
router.put('/orders/:orderId/cancel', protect, ctrl.cancelOrder);

module.exports = router;