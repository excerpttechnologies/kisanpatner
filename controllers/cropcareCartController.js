
const CropCareCart = require('../models/cropcareCartModel');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay lazily when needed
let razorpayInstance = null;

const getRazorpayInstance = () => {
  if (!razorpayInstance) {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      throw new Error('Razorpay credentials not found in environment variables');
    }

    razorpayInstance = new Razorpay({
      key_id: key_id,
      key_secret: key_secret
    });
  }
  return razorpayInstance;
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await CropCareCart.findOne({ userId });

    if (!cart) {
      // Create empty cart if doesn't exist
      cart = new CropCareCart({
        userId,
        items: []
      });
      await cart.save();
    }

    // Recalculate totals
    cart.subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.seedPrice * item.quantity);
    }, 0);

    cart.gst = cart.subtotal * 0.18; // 18% GST
    cart.shipping = cart.subtotal > 500 ? 0 : 50; // Free shipping above ₹500
    cart.total = cart.subtotal + cart.gst + cart.shipping;

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, item } = req.body;

    if (!userId || !item) {
      return res.status(400).json({
        success: false,
        message: 'User ID and item are required'
      });
    }

    let cart = await CropCareCart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new CropCareCart({
        userId,
        items: [item]
      });
    } else {
      // Check if item already exists
      const existingItemIndex = cart.items.findIndex(
        cartItem => cartItem.seedId === item.seedId
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart.items[existingItemIndex].quantity += item.quantity || 1;
      } else {
        // Add new item
        cart.items.push(item);
      }
    }

    // Recalculate totals
    cart.subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.seedPrice * item.quantity);
    }, 0);

    cart.gst = cart.subtotal * 0.18;
    cart.shipping = cart.subtotal > 500 ? 0 : 50;
    cart.total = cart.subtotal + cart.gst + cart.shipping;

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart',
      error: error.message
    });
  }
};

// Update item quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { userId, quantity } = req.body;
    const { itemId } = req.params;

    const cart = await CropCareCart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity < 1) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    // Recalculate totals
    cart.subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.seedPrice * item.quantity);
    }, 0);

    cart.gst = cart.subtotal * 0.18;
    cart.shipping = cart.subtotal > 500 ? 0 : 50;
    cart.total = cart.subtotal + cart.gst + cart.shipping;

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message
    });
  }
};

// Remove item from cart
exports.removeItem = async (req, res) => {
  try {
    const { userId } = req.body;
    const { itemId } = req.params;

    const cart = await CropCareCart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    // Recalculate totals
    cart.subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.seedPrice * item.quantity);
    }, 0);

    cart.gst = cart.subtotal * 0.18;
    cart.shipping = cart.subtotal > 500 ? 0 : 50;
    cart.total = cart.subtotal + cart.gst + cart.shipping;

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing item',
      error: error.message
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await CropCareCart.findOneAndUpdate(
      { userId },
      {
        items: [],
        subtotal: 0,
        gst: 0,
        shipping: 0,
        total: 0
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
};

// Create Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await CropCareCart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Get Razorpay instance
    const razorpay = getRazorpayInstance();

    // Create Razorpay order
    const options = {
      amount: Math.round(cart.total * 100), // Amount in paise
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        cartId: cart._id.toString()
      }
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID,
        cart: cart
      }
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message || 'Unknown error'
    });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment details'
      });
    }

    // Create expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // Verify signature
    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Here you would typically:
    // 1. Update order status in your database
    // 2. Clear the cart
    // 3. Send confirmation email
    // 4. Update inventory

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      }
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

// Get order history for user
exports.getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // For now, return empty array
    // In production, you would query an Order model
    res.status(200).json({
      success: true,
      message: 'Order history',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order history',
      error: error.message
    });
  }
};