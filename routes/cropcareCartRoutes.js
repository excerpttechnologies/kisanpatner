const express = require('express');
const router = express.Router();
const cropcareCartController = require('../controllers/cropcareCartController');

// GET /api/cropcare/cart/:userId - Get user's cart
router.get('/cart/:userId', cropcareCartController.getCart);

// POST /api/cropcare/cart/add - Add item to cart
router.post('/cart/add', cropcareCartController.addToCart);

// PUT /api/cropcare/cart/update/:itemId - Update item quantity
router.put('/cart/update/:itemId', cropcareCartController.updateQuantity);

// DELETE /api/cropcare/cart/remove/:itemId - Remove item from cart
router.delete('/cart/remove/:itemId', cropcareCartController.removeItem);

// DELETE /api/cropcare/cart/clear/:userId - Clear cart
router.delete('/cart/clear/:userId', cropcareCartController.clearCart);

// POST /api/cropcare/order/create - Create Razorpay order
router.post('/order/create', cropcareCartController.createOrder);

// POST /api/cropcare/payment/verify - Verify payment
router.post('/payment/verify', cropcareCartController.verifyPayment);

// GET /api/cropcare/orders/:userId - Get order history
router.get('/orders/:userId', cropcareCartController.getOrderHistory);

module.exports = router;