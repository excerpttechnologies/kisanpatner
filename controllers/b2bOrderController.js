// // controllers/b2bOrderController.js
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const B2BOrder = require("../models/B2BOrder");
// const B2BCart = require("../models/B2BCart");
// const B2BProduct = require("../models/B2BProduct");
// const B2BAddress = require("../models/B2BAddress");
// const B2BPaymentHistory = require("../models/B2BPaymentHistory");

// // Initialize Razorpay
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create order from cart
// exports.createOrder = async (req, res) => {
//   try {
//     const b2bUserId = req.user.id;
//     const { addressId, notes } = req.body;

//     // Validate address
//     const address = await B2BAddress.findOne({ _id: addressId, b2bUserId });
//     if (!address) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Address not found" });
//     }

//     // Get cart items
//     const cartItems = await B2BCart.find({ b2bUserId });
//     if (cartItems.length === 0) {
//       return res.status(400).json({ success: false, message: "Cart is empty" });
//     }

//     // Validate stock and prepare items
//     let items = [];
//     let subtotal = 0;

//     for (const cartItem of cartItems) {
//       const product = await B2BProduct.findById(cartItem.productId);
//       if (!product) {
//         return res.status(400).json({
//           success: false,
//           message: `Product ${cartItem.productName} not found`,
//         });
//       }

//       if (product.quantity < cartItem.quantity) {
//         return res.status(400).json({
//           success: false,
//           message: `Insufficient stock for ${product.productName}. Available: ${product.quantity}`,
//         });
//       }

//       const subtotalItem = product.price * cartItem.quantity;
//       subtotal += subtotalItem;

//       items.push({
//         productId: product._id,
//         productName: product.productName,
//         price: product.price,
//         quantity: cartItem.quantity,
//         unit: product.unit,
//         image: product.images[0] || "",
//         categoryName: product.categoryName,
//         subtotal: subtotalItem,
//       });
//     }

//     // Calculate totals
//     const tax = subtotal * 0.05; // 5% GST
//     const shippingCharge = subtotal > 5000 ? 0 : 100; // Free shipping above ₹5000
//     const totalAmount = subtotal + tax + shippingCharge;

//     // Generate order ID
//     const date = new Date();
//     const year = date.getFullYear().toString().slice(-2);
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const random = Math.floor(Math.random() * 10000)
//       .toString()
//       .padStart(4, "0");
//     const orderId = `B2B${year}${month}${random}`;

//     // Create order
//     const order = await B2BOrder.create({
//       orderId,
//       b2bUserId,
//       address: address._id,
//       addressSnapshot: {
//         fullName: address.fullName,
//         phoneNumber: address.phoneNumber,
//         addressLine1: address.addressLine1,
//         addressLine2: address.addressLine2,
//         landmark: address.landmark,
//         city: address.city,
//         state: address.state,
//         pincode: address.pincode,
//         country: address.country,
//       },
//       items,
//       subtotal,
//       tax,
//       shippingCharge,
//       discount: 0,
//       totalAmount,
//       notes,
//       statusHistory: [
//         {
//           status: "pending",
//           note: "Order created",
//           updatedBy: "system",
//           timestamp: new Date(),
//         },
//       ],
//     });

//     // Create Razorpay order
//     const razorpayOrder = await razorpayInstance.orders.create({
//       amount: Math.round(totalAmount * 100), // Amount in paise
//       currency: "INR",
//       receipt: order._id.toString(),
//       notes: {
//         orderId: order.orderId,
//         b2bUserId: b2bUserId.toString(),
//       },
//     });

//     // Save payment history
//     await B2BPaymentHistory.create({
//       b2bUserId,
//       orderId: order._id,
//       razorpayOrderId: razorpayOrder.id,
//       amount: totalAmount,
//       status: "created",
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         order,
//         razorpayOrder: {
//           id: razorpayOrder.id,
//           amount: razorpayOrder.amount,
//           currency: razorpayOrder.currency,
//         },
//         razorpayKey: process.env.RAZORPAY_KEY_ID,
//       },
//     });
//   } catch (error) {
//     console.error("Create order error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Verify payment
// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId,
//     } = req.body;
//     const b2bUserId = req.user.id;

//     // Verify signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     const isAuthentic = expectedSignature === razorpay_signature;

//     if (!isAuthentic) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid payment signature" });
//     }

//     // Update payment history
//     await B2BPaymentHistory.findOneAndUpdate(
//       { razorpayOrderId: razorpay_order_id },
//       {
//         razorpayPaymentId: razorpay_payment_id,
//         razorpaySignature: razorpay_signature,
//         status: "success",
//         paymentMethod: "razorpay",
//         "metadata.paidAt": new Date(),
//       },
//     );

//     // Update order
//     const order = await B2BOrder.findOne({ _id: orderId, b2bUserId });
//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     order.paymentDetails = {
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//       razorpaySignature: razorpay_signature,
//       amount: order.totalAmount,
//       currency: "INR",
//       status: "success",
//       paymentMethod: "razorpay",
//       paidAt: new Date(),
//     };

//     await order.updateStatus("confirmed", "Payment verified", "system");

//     // Update product stock
//     for (const item of order.items) {
//       await B2BProduct.findByIdAndUpdate(item.productId, {
//         $inc: { quantity: -item.quantity },
//       });
//     }

//     // Clear cart
//     await B2BCart.deleteMany({ b2bUserId });

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//       data: order,
//     });
//   } catch (error) {
//     console.error("Verify payment error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get my orders
// exports.getMyOrders = async (req, res) => {
//   try {
//     const b2bUserId = req.user.id;
//     const { status, page = 1, limit = 10 } = req.query;

//     const query = { b2bUserId };
//     if (status) query.status = status;

//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const orders = await B2BOrder.find(query)
//       .populate("address")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await B2BOrder.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: orders,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / parseInt(limit)),
//       },
//     });
//   } catch (error) {
//     console.error("Get orders error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get single order details
// exports.getOrderDetails = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const b2bUserId = req.user.id;

//     const order = await B2BOrder.findOne({ _id: orderId, b2bUserId }).populate(
//       "address",
//     );

//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: order,
//     });
//   } catch (error) {
//     console.error("Get order details error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Cancel order
// exports.cancelOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { cancellationReason } = req.body;
//     const b2bUserId = req.user.id;

//     const order = await B2BOrder.findOne({ _id: orderId, b2bUserId });

//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     // Check if order can be cancelled
//     const cancellableStatuses = ["pending", "confirmed", "processing"];
//     if (!cancellableStatuses.includes(order.status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Order cannot be cancelled at ${order.status} status`,
//       });
//     }

//     // Restore product stock
//     for (const item of order.items) {
//       await B2BProduct.findByIdAndUpdate(item.productId, {
//         $inc: { quantity: item.quantity },
//       });
//     }

//     await order.updateStatus(
//       "cancelled",
//       cancellationReason || "Cancelled by user",
//       "user",
//     );

//     // Update payment status to refunded if payment was made
//     if (order.paymentDetails && order.paymentDetails.status === "success") {
//       order.paymentDetails.status = "refunded";
//       await order.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "Order cancelled successfully",
//       data: order,
//     });
//   } catch (error) {
//     console.error("Cancel order error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get payment history
// exports.getPaymentHistory = async (req, res) => {
//   try {
//     const b2bUserId = req.user.id;
//     const { page = 1, limit = 10 } = req.query;

//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const payments = await B2BPaymentHistory.find({ b2bUserId })
//       .populate("orderId")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await B2BPaymentHistory.countDocuments({ b2bUserId });

//     res.status(200).json({
//       success: true,
//       data: payments,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / parseInt(limit)),
//       },
//     });
//   } catch (error) {
//     console.error("Get payment history error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };













// controllers/b2bOrderController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const B2BOrder = require("../models/B2BOrder");
const B2BCart = require("../models/B2BCart");
const B2BProduct = require("../models/B2BProduct");
const B2BAddress = require("../models/B2BAddress");
const B2BPaymentHistory = require("../models/B2BPaymentHistory");
const B2BRefund = require("../models/B2BRefund");

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
    const { status, page = 1, limit = 0 } = req.query;

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

// exports.cancelOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { cancellationReason } = req.body;
//     const b2bUserId = req.user.id;

//     // Validate ObjectId format
//     const mongoose = require("mongoose");
//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order ID format",
//       });
//     }

//     // Find order with proper error handling
//     let order;
//     try {
//       order = await B2BOrder.findOne({ _id: orderId, b2bUserId });
//     } catch (dbError) {
//       console.error("Database query error:", dbError);
//       return res.status(500).json({
//         success: false,
//         message: "Database error, please try again",
//       });
//     }

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found or you don't have permission",
//       });
//     }

//     // Check if order can be cancelled
//     const cancellableStatuses = ["pending", "confirmed", "processing"];
//     if (!cancellableStatuses.includes(order.status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Order cannot be cancelled at ${order.status} status`,
//         currentStatus: order.status,
//         allowedStatuses: cancellableStatuses,
//       });
//     }

//     // Check if already cancelled
//     if (order.status === "cancelled") {
//       return res.status(400).json({
//         success: false,
//         message: "Order is already cancelled",
//       });
//     }

//     // Restore product stock with better error handling
//     const stockUpdateErrors = [];
//     for (const item of order.items) {
//       try {
//         const product = await B2BProduct.findById(item.productId);
//         if (product) {
//           const result = await B2BProduct.findByIdAndUpdate(
//             item.productId,
//             { $inc: { quantity: item.quantity } },
//             { new: true, runValidators: true },
//           );
//           if (!result) {
//             stockUpdateErrors.push(
//               `Product ${item.productName || item.productId} not found`,
//             );
//           }
//         } else {
//           stockUpdateErrors.push(`Product ${item.productId} not found`);
//         }
//       } catch (stockError) {
//         console.error(
//           `Error restoring stock for product ${item.productId}:`,
//           stockError,
//         );
//         stockUpdateErrors.push(
//           `Failed to restore stock for ${item.productName || item.productId}`,
//         );
//       }
//     }

//     // Log stock update errors but don't fail the cancellation
//     if (stockUpdateErrors.length > 0) {
//       console.warn("Stock update warnings:", stockUpdateErrors);
//     }

//     // Update order status
//     try {
//       await order.updateStatus(
//         "cancelled",
//         cancellationReason || "Cancelled by user",
//         "user",
//       );
//     } catch (updateError) {
//       console.error("Error updating order status:", updateError);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to update order status",
//       });
//     }

//     // Update payment status if payment was made
//     if (order.paymentDetails && order.paymentDetails.status === "success") {
//       try {
//         order.paymentDetails.status = "refund";
//         order.paymentDetails.refundedAt = new Date();
//         await order.save();
//       } catch (paymentError) {
//         console.error("Error updating payment status:", paymentError);
//         // Don't fail the cancellation, just log the error
//       }
//     }

//     // Add cancellation to history
//     if (!order.statusHistory) {
//       order.statusHistory = [];
//     }
//     order.statusHistory.push({
//       status: "cancelled",
//       note: cancellationReason || "Cancelled by user",
//       updatedBy: "user",
//       timestamp: new Date(),
//     });

//     // Set cancellation timestamp
//     order.cancelledAt = new Date();
//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Order cancelled successfully",
//       data: {
//         _id: order._id,
//         orderId: order.orderId,
//         status: order.status,
//         cancelledAt: order.cancelledAt,
//         cancellationReason: cancellationReason || "Cancelled by user",
//         stockUpdateWarnings:
//           stockUpdateErrors.length > 0 ? stockUpdateErrors : undefined,
//       },
//     });
//   } catch (error) {
//     console.error("Cancel order error:", error);

//     // Send appropriate error response
//     if (error.name === "CastError") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order ID format",
//       });
//     }

//     if (error.name === "MongoError" || error.name === "MongoServerError") {
//       return res.status(503).json({
//         success: false,
//         message: "Database service unavailable, please try again later",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Server error, please try again later",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

// controllers/b2bOrderController.js - Update cancelOrder function

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { cancellationReason } = req.body;
    const b2bUserId = req.user.id;

    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID format",
      });
    }

    const order = await B2BOrder.findOne({ _id: orderId, b2bUserId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or you don't have permission",
      });
    }

    // Check if order can be cancelled (not delivered)
    const cancellableStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
    ];
    if (!cancellableStatuses.includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled at ${order.status} status`,
      });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await B2BProduct.findByIdAndUpdate(item.productId, {
        $inc: { quantity: item.quantity },
      });
    }

    // Update order status to cancelled
    await order.updateStatus(
      "cancelled",
      cancellationReason || "Cancelled by user",
      "user",
    );

    // ✅ AUTO REFUND - If payment was successful, process refund automatically
    let refundResult = null;
    if (order.paymentDetails && order.paymentDetails.status === "success") {
      try {
        // Create refund record
        const refund = new B2BRefund({
          refundId: generateRefundId(),
          orderId: order._id,
          b2bUserId,
          razorpayPaymentId: order.paymentDetails.razorpayPaymentId,
          amount: order.totalAmount,
          refundAmount: order.totalAmount,
          reason: cancellationReason || "Order cancelled by user",
          description: `Auto refund for cancelled order ${order.orderId}`,
          items: order.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
            reason: "Order cancelled",
          })),
          refundType: "full",
          status: "processing",
          approvedBy: "System",
          processedBy: "System",
          staffRemarks: "Auto refund triggered on order cancellation",
        });

        // Process Razorpay refund
        const razorpayRefund = await createRazorpayRefund(
          order.paymentDetails.razorpayPaymentId,
          order.totalAmount,
          "Order cancelled by user",
        );

        refund.razorpayRefundId = razorpayRefund.id;
        refund.transactionId = razorpayRefund.id;
        refund.status = "completed";
        refund.completedAt = new Date();
        await refund.save();

        // Update order payment status
        order.paymentDetails.status = "refunded";
        await order.save();

        refundResult = {
          success: true,
          refundId: refund.refundId,
          amount: refund.refundAmount,
          razorpayRefundId: razorpayRefund.id,
        };
      } catch (refundError) {
        console.error("Auto refund error:", refundError);
        refundResult = {
          success: false,
          error: refundError.message,
        };
      }
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: {
        orderId: order.orderId,
        status: order.status,
        cancelledAt: order.cancelledAt,
        refund: refundResult,
      },
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// Helper function to generate refund ID
function generateRefundId() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
  return `REF${year}${month}${random}`;
}

// Helper function to create Razorpay refund
async function createRazorpayRefund(paymentId, amount, reason) {
  const Razorpay = require("razorpay");
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const refund = await razorpayInstance.payments.refund(paymentId, {
    amount: Math.round(amount * 100),
    speed: "normal",
    notes: { reason: reason },
  });
  return refund;
}

// Get payment history
// controllers/b2bOrderController.js - Update getPaymentHistory

exports.getPaymentHistory = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    const { page = 1, limit = 0, search, status, fromDate, toDate } = req.query;

    let query = { b2bUserId };

    // Search by order ID or transaction ID
    if (search) {
      const orders = await B2BOrder.find({
        b2bUserId,
        orderId: { $regex: search, $options: "i" },
      }).select("_id");
      const orderIds = orders.map((o) => o._id);

      query.$or = [
        { orderId: { $in: orderIds } },
        { razorpayOrderId: { $regex: search, $options: "i" } },
        { razorpayPaymentId: { $regex: search, $options: "i" } },
      ];
    }

    // ✅ Status filter
    if (status && status !== "all") {
      query.status = status;
    }

    // ✅ Date range filter
    if (fromDate || toDate) {
      query.createdAt = {};
      if (fromDate) {
        const startDate = new Date(fromDate);
        startDate.setHours(0, 0, 0, 0);
        query.createdAt.$gte = startDate;
      }
      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);
        query.createdAt.$lte = endDate;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const payments = await B2BPaymentHistory.find(query)
      .populate("orderId", "orderId totalAmount status")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await B2BPaymentHistory.countDocuments(query);

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
//////admin refund

exports.adminRefund = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason, adminName, adminRemarks } = req.body;

    // Find order
    const order = await B2BOrder.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Check if payment exists
    if (!order.paymentDetails || order.paymentDetails.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "No successful payment found for this order",
      });
    }

    // Check if already refunded
    const existingRefund = await B2BRefund.findOne({
      orderId,
      status: "completed",
    });
    if (existingRefund) {
      return res.status(400).json({
        success: false,
        message: "Order already refunded",
      });
    }

    // Create refund record
    const refund = new B2BRefund({
      refundId: generateRefundId(),
      orderId: order._id,
      b2bUserId: order.b2bUserId,
      razorpayPaymentId: order.paymentDetails.razorpayPaymentId,
      amount: order.totalAmount,
      refundAmount: order.totalAmount,
      reason: reason || "Admin initiated refund",
      description: `Admin refund for order ${order.orderId}`,
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        reason: reason || "Admin initiated",
      })),
      refundType: "full",
      status: "processing",
      approvedBy: adminName || "Admin",
      staffRemarks: adminRemarks || "",
    });

    // Process Razorpay refund
    const razorpayRefund = await createRazorpayRefund(
      order.paymentDetails.razorpayPaymentId,
      order.totalAmount,
      reason || "Admin initiated refund",
    );

    refund.razorpayRefundId = razorpayRefund.id;
    refund.transactionId = razorpayRefund.id;
    refund.status = "completed";
    refund.completedAt = new Date();
    await refund.save();

    // Update order payment status
    order.paymentDetails.status = "refunded";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Refund processed successfully",
      data: {
        refundId: refund.refundId,
        orderId: order.orderId,
        amount: refund.refundAmount,
        razorpayRefundId: razorpayRefund.id,
      },
    });
  } catch (error) {
    console.error("Admin refund error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process refund",
      error: error.message,
    });
  }
};

// Get all refunds with search and filters
exports.getAllRefunds = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 0,
      status,
      search,
      fromDate,
      toDate,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    let query = {};

    // Status filter
    if (status) query.status = status;

    // Search by orderId or refundId or user name
    if (search) {
      const orders = await B2BOrder.find({
        orderId: { $regex: search, $options: "i" },
      }).select("_id");
      const orderIds = orders.map((o) => o._id);

      query.$or = [
        { refundId: { $regex: search, $options: "i" } },
        { orderId: { $in: orderIds } },
      ];
    }

    // Date range filter
    if (fromDate || toDate) {
      query.createdAt = {};
      if (fromDate) query.createdAt.$gte = new Date(fromDate);
      if (toDate) query.createdAt.$lte = new Date(toDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const refunds = await B2BRefund.find(query)
      .populate("orderId", "orderId totalAmount status")
      .populate("b2bUserId", "name email phone")
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await B2BRefund.countDocuments(query);

    // Get statistics
    const stats = await B2BRefund.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalAmount: { $sum: "$refundAmount" },
        },
      },
    ]);

    // Calculate total refunded amount
    const totalRefunded = await B2BRefund.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$refundAmount" } } },
    ]);

    res.status(200).json({
      success: true,
      data: refunds,
      stats: {
        byStatus: stats,
        totalRefunded: totalRefunded[0]?.total || 0,
        totalRefunds: total,
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get all refunds error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch refunds" });
  }
};

// Get user's own refunds (with search)
exports.getMyRefunds = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    const { page = 1, limit = 0, status, search, fromDate, toDate } = req.query;

    let query = { b2bUserId };

    if (status) query.status = status;

    if (search) {
      const orders = await B2BOrder.find({
        b2bUserId,
        orderId: { $regex: search, $options: "i" },
      }).select("_id");
      const orderIds = orders.map((o) => o._id);

      query.$or = [
        { refundId: { $regex: search, $options: "i" } },
        { orderId: { $in: orderIds } },
      ];
    }

    if (fromDate || toDate) {
      query.createdAt = {};
      if (fromDate) query.createdAt.$gte = new Date(fromDate);
      if (toDate) query.createdAt.$lte = new Date(toDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const refunds = await B2BRefund.find(query)
      .populate("orderId", "orderId totalAmount status")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await B2BRefund.countDocuments(query);

    res.status(200).json({
      success: true,
      data: refunds,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get my refunds error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch refunds" });
  }
};

// Get single refund details
exports.getRefundDetails = async (req, res) => {
  try {
    const { refundId } = req.params;
    const b2bUserId = req.user.id;

    const refund = await B2BRefund.findOne({ refundId })
      .populate("orderId", "orderId totalAmount status items addressSnapshot")
      .populate("b2bUserId", "name email phone");

    if (!refund) {
      return res
        .status(404)
        .json({ success: false, message: "Refund not found" });
    }

    // Check permission (user can see only their own refunds)
    if (
      refund.b2bUserId._id.toString() !== b2bUserId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({
      success: true,
      data: refund,
    });
  } catch (error) {
    console.error("Get refund details error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch refund details" });
  }
};


