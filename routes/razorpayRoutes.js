// const express = require('express');
// const router = express.Router();
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const CropCareCart = require('../models/cropcareCartModel');

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // POST /api/payment/create-order - Create Razorpay order
// router.post('/create-order', async (req, res) => {
//   try {
//     console.log('📦 Received order request:', req.body);

//     const { userId } = req.body;

//     if (!userId) {
//       console.log('❌ No userId provided');
//       return res.status(400).json({
//         success: false,
//         message: 'User ID is required'
//       });
//     }

//     console.log('🔍 Finding cart for user:', userId);

//     // Get user's cart
//     const cart = await CropCareCart.findOne({ userId });

//     console.log('🛒 Cart found:', cart ? `${cart.items.length} items, total: ₹${cart.total}` : 'No cart');

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Cart is empty'
//       });
//     }

//     console.log('💰 Creating Razorpay order for amount:', cart.total);

//     // Create Razorpay order
//     const options = {
//       amount: Math.round(cart.total * 100), // Convert to paise
//       currency: "INR",
//       receipt: `rcpt_${Date.now()}`, // Max 40 chars
//       notes: {
//         userId: userId,
//         cartId: cart._id.toString()
//       }
//     };

//     const order = await razorpay.orders.create(options);

//     console.log('✅ Razorpay order created:', order.id);

//     res.status(200).json({
//       success: true,
//       message: 'Order created successfully',
//       data: {
//         orderId: order.id,
//         amount: order.amount,
//         currency: order.currency,
//         key: process.env.RAZORPAY_KEY_ID
//       }
//     });

//   } catch (error) {
//     console.error('❌ Razorpay order creation error:', error);
//     console.error('Error details:', {
//       message: error.message,
//       stack: error.stack
//     });
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create order',
//       error: error.message
//     });
//   }
// });

// // POST /api/payment/verify - Verify payment
// router.post('/verify', async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing payment details'
//       });
//     }

//     // Create signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     // Verify signature
//     if (expectedSignature === razorpay_signature) {
//       res.status(200).json({
//         success: true,
//         message: 'Payment verified successfully',
//         data: {
//           orderId: razorpay_order_id,
//           paymentId: razorpay_payment_id
//         }
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: 'Invalid signature'
//       });
//     }

//   } catch (error) {
//     console.error('Payment verification error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Payment verification failed',
//       error: error.message
//     });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const CropCareCart = require('../models/cropcareCartModel');
const CropcareOrder = require('../models/cropcareOrderModel');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payment/create-order - Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    console.log('📦 Received order request:', req.body);

    const { userId } = req.body;

    if (!userId) {
      console.log('❌ No userId provided');
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    console.log('🔍 Finding cart for user:', userId);

    // Get user's cart
    const cart = await CropCareCart.findOne({ userId });

    console.log('🛒 Cart found:', cart ? `${cart.items.length} items, total: ₹${cart.total}` : 'No cart');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    console.log('💰 Creating Razorpay order for amount:', cart.total);

    // Create Razorpay order
    const options = {
      amount: Math.round(cart.total * 100), // Convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`, // Max 40 chars
      notes: {
        userId: userId,
        cartId: cart._id.toString()
      }
    };

    const order = await razorpay.orders.create(options);

    console.log('✅ Razorpay order created:', order.id);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID
      }
    });

  } catch (error) {
    console.error('❌ Razorpay order creation error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// POST /api/payment/verify - Verify payment and create order
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shippingAddress, paymentMethod } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment details'
      });
    }

    // Create signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // Verify signature
    if (expectedSignature === razorpay_signature) {

      // Get cart from Razorpay order notes
      const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
      const userId = razorpayOrder.notes.userId;

      // Get user's cart
      const cart = await CropCareCart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }

      // Create order in database
      const newOrder = new CropcareOrder({
        userId: userId,
        items: cart.items,
        shippingAddress: shippingAddress,
        payment: {
          method: paymentMethod || 'razorpay',
          status: 'completed',
          amount: cart.total,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature
        },
        orderStatus: 'confirmed',
        subtotal: cart.subtotal,
        gst: cart.gst,
        shipping: cart.shipping,
        total: cart.total
      });

      await newOrder.save();

      // Clear the cart
      await CropCareCart.findOneAndUpdate(
        { userId },
        {
          items: [],
          subtotal: 0,
          gst: 0,
          shipping: 0,
          total: 0
        }
      );

      res.status(200).json({
        success: true,
        message: 'Payment verified and order created successfully',
        data: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          order: newOrder
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid signature'
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
});

// GET /api/payment/orders/:userId - Get user orders
router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await CropcareOrder.find({ userId })
      .sort({ createdAt: -1 }); // Latest first

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

module.exports = router;