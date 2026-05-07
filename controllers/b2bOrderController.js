// controllers/b2bOrderController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const B2BOrder = require("../models/B2BOrder");
const B2BCart = require("../models/B2BCart");
const B2BProduct = require("../models/B2BProduct");
const B2BAddress = require("../models/B2BAddress");
const B2BPaymentHistory = require("../models/B2BPaymentHistory");

// Initialize Razorpay
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order from cart
exports.createOrder = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    const { addressId, notes } = req.body;

    // Validate address
    const address = await B2BAddress.findOne({ _id: addressId, b2bUserId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Get cart items
    const cartItems = await B2BCart.find({ b2bUserId });
    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Validate stock and prepare items
    let items = [];
    let subtotal = 0;

    for (const cartItem of cartItems) {
      const product = await B2BProduct.findById(cartItem.productId);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product ${cartItem.productName} not found`,
        });
      }

      if (product.quantity < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.productName}. Available: ${product.quantity}`,
        });
      }

      const subtotalItem = product.price * cartItem.quantity;
      subtotal += subtotalItem;

      items.push({
        productId: product._id,
        productName: product.productName,
        price: product.price,
        quantity: cartItem.quantity,
        unit: product.unit,
        image: product.images[0] || "",
        categoryName: product.categoryName,
        subtotal: subtotalItem,
      });
    }

    // Calculate totals
    const tax = subtotal * 0.05; // 5% GST
    const shippingCharge = subtotal > 5000 ? 0 : 100; // Free shipping above ₹5000
    const totalAmount = subtotal + tax + shippingCharge;

    // Generate order ID
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const orderId = `B2B${year}${month}${random}`;

    // Create order
    const order = await B2BOrder.create({
      orderId,
      b2bUserId,
      address: address._id,
      addressSnapshot: {
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
      },
      items,
      subtotal,
      tax,
      shippingCharge,
      discount: 0,
      totalAmount,
      notes,
      statusHistory: [
        {
          status: "pending",
          note: "Order created",
          updatedBy: "system",
          timestamp: new Date(),
        },
      ],
    });

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: Math.round(totalAmount * 100), // Amount in paise
      currency: "INR",
      receipt: order._id.toString(),
      notes: {
        orderId: order.orderId,
        b2bUserId: b2bUserId.toString(),
      },
    });

    // Save payment history
    await B2BPaymentHistory.create({
      b2bUserId,
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      status: "created",
    });

    res.status(200).json({
      success: true,
      data: {
        order,
        razorpayOrder: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
        razorpayKey: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;
    const b2bUserId = req.user.id;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    // Update payment history
    await B2BPaymentHistory.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "success",
        paymentMethod: "razorpay",
        "metadata.paidAt": new Date(),
      },
    );

    // Update order
    const order = await B2BOrder.findOne({ _id: orderId, b2bUserId });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.paymentDetails = {
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: order.totalAmount,
      currency: "INR",
      status: "success",
      paymentMethod: "razorpay",
      paidAt: new Date(),
    };

    await order.updateStatus("confirmed", "Payment verified", "system");

    // Update product stock
    for (const item of order.items) {
      await B2BProduct.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -item.quantity },
      });
    }

    // Clear cart
    await B2BCart.deleteMany({ b2bUserId });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: order,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get my orders
exports.getMyOrders = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { b2bUserId };
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await B2BOrder.find(query)
      .populate("address")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await B2BOrder.countDocuments(query);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get single order details
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const b2bUserId = req.user.id;

    const order = await B2BOrder.findOne({ _id: orderId, b2bUserId }).populate(
      "address",
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Get order details error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { cancellationReason } = req.body;
    const b2bUserId = req.user.id;

    const order = await B2BOrder.findOne({ _id: orderId, b2bUserId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Check if order can be cancelled
    const cancellableStatuses = ["pending", "confirmed", "processing"];
    if (!cancellableStatuses.includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled at ${order.status} status`,
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await B2BProduct.findByIdAndUpdate(item.productId, {
        $inc: { quantity: item.quantity },
      });
    }

    await order.updateStatus(
      "cancelled",
      cancellationReason || "Cancelled by user",
      "user",
    );

    // Update payment status to refunded if payment was made
    if (order.paymentDetails && order.paymentDetails.status === "success") {
      order.paymentDetails.status = "refunded";
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get payment history
exports.getPaymentHistory = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const payments = await B2BPaymentHistory.find({ b2bUserId })
      .populate("orderId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await B2BPaymentHistory.countDocuments({ b2bUserId });

    res.status(200).json({
      success: true,
      data: payments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get payment history error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
