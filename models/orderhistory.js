// const Order = require("../models/order");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// const razorpay = new Razorpay({
//   key_id: "rzp_test_qUmhUFElBiSNIs",
//   key_secret: "wsBV1ts8yJPld9JktATIdOiS",
// });

// // Get Farmer Order History
// exports.getFarmerOrderHistory = async (req, res) => {
//   try {
//     const { farmerId } = req.params;

//     const orders = await Order.find({
//       farmerId: farmerId,
//       farmerAcceptedStatus: true,
//     }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: orders.length,
//       data: orders,
//     });
//   } catch (error) {
//     console.error("Error fetching farmer order history:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch order history",
//       error: error.message,
//     });
//   }
// };

// // Get Trader Order History
// exports.getTraderOrderHistory = async (req, res) => {
//   try {
//     const { traderId } = req.params;

//     const orders = await Order.find({
//       traderId: traderId,
//     }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: orders.length,
//       data: orders,
//     });
//   } catch (error) {
//     console.error("Error fetching trader order history:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch order history",
//       error: error.message,
//     });
//   }
// };

// // Create Razorpay Order for Trader Payment
// exports.createTraderPaymentOrder = async (req, res) => {
//   try {
//     const { orderId, amount } = req.body;

//     const order = await Order.findOne({ orderId: orderId });
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     const options = {
//       amount: Math.round(amount * 100),
//       currency: "INR",
//       receipt: `${orderId}_${Date.now()}`,
//       notes: {
//         orderId: orderId,
//         type: "trader_to_admin_payment",
//       },
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     res.status(200).json({
//       success: true,
//       data: razorpayOrder,
//       key_id: razorpay.key_id,
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create payment order",
//       error: error.message,
//     });
//   }
// };

// // Verify and Update Trader Payment
// exports.verifyTraderPayment = async (req, res) => {
//   try {
//     const {
//       orderId,
//       razorpayOrderId,
//       razorpayPaymentId,
//       razorpaySignature,
//       amount,
//     } = req.body;

//     // Verify signature
//     const body = razorpayOrderId + "|" + razorpayPaymentId;
//     const expectedSignature = crypto
//       .createHmac("sha256", razorpay.key_secret)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpaySignature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

  

//     const order = await Order.findOne({ orderId: orderId });
// if (!order) {
//   return res.status(404).json({
//     success: false,
//     message: "Order not found",
//   });
// }

// // Create payment record
// const paymentRecord = {
//   amount: parseFloat(amount), // Ensure it's a number
//   paidDate: new Date(),
//   razorpayPaymentId: razorpayPaymentId,
//   razorpayOrderId: razorpayOrderId,
//   razorpaySignature: razorpaySignature,
// };

// // Push payment to history
// order.traderToAdminPayment.paymentHistory.push(paymentRecord);

// // Update amounts - use parseFloat to ensure proper calculation
// order.traderToAdminPayment.paidAmount = 
//   parseFloat(order.traderToAdminPayment.paidAmount) + parseFloat(amount);
  
// order.traderToAdminPayment.remainingAmount = 
//   parseFloat(order.traderToAdminPayment.totalAmount) - parseFloat(order.traderToAdminPayment.paidAmount);

// // Round to 2 decimal places to avoid floating point issues
// order.traderToAdminPayment.remainingAmount = 
//   Math.round(order.traderToAdminPayment.remainingAmount * 100) / 100;

// // Update payment status
// if (order.traderToAdminPayment.remainingAmount <= 0.01) { // Allow small rounding error
//   order.traderToAdminPayment.paymentStatus = "paid";
//   order.traderToAdminPayment.remainingAmount = 0;
// } else if (order.traderToAdminPayment.paidAmount > 0) {
//   order.traderToAdminPayment.paymentStatus = "partial";
// }

// // Mark the subdocument as modified (important for nested objects!)
// order.markModified('traderToAdminPayment');
//     // Update payment details
//     // const paymentRecord = {
//     //   amount: amount,
//     //   paidDate: new Date(),
//     //   razorpayPaymentId: razorpayPaymentId,
//     //   razorpayOrderId: razorpayOrderId,
//     //   razorpaySignature: razorpaySignature,
//     // };

//     // order.traderToAdminPayment.paymentHistory.push(paymentRecord);
//     // order.traderToAdminPayment.paidAmount += amount;
//     // order.traderToAdminPayment.remainingAmount -= amount;

//     // if (order.traderToAdminPayment.remainingAmount <= 0) {
//     //   order.traderToAdminPayment.paymentStatus = "paid";
//     //   order.traderToAdminPayment.remainingAmount = 0;
//     // } else {
//     //   order.traderToAdminPayment.paymentStatus = "partial";
//     // }

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Payment verified and updated successfully",
//       data: order,
//     });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to verify payment",
//       error: error.message,
//     });
//   }
// };

// // Get Single Order Details
// exports.getOrderDetails = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findOne({ orderId: orderId });

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: order,
//     });
//   } catch (error) {
//     console.error("Error fetching order details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch order details",
//       error: error.message,
//     });
//   }
// };


//vps

const Order = require("../models/order");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: "rzp_test_qUmhUFElBiSNIs",
  key_secret: "wsBV1ts8yJPld9JktATIdOiS",
});

// Get Farmer Order History
exports.getFarmerOrderHistory = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const orders = await Order.find({
      farmerId: farmerId,
      farmerAcceptedStatus: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching farmer order history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order history",
      error: error.message,
    });
  }
};

// Get Trader Order History
exports.getTraderOrderHistory = async (req, res) => {
  try {
    const { traderId } = req.params;

    const orders = await Order.find({
      traderId: traderId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching trader order history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order history",
      error: error.message,
    });
  }
};

// Create Razorpay Order for Trader Payment
exports.createTraderPaymentOrder = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const order = await Order.findOne({ orderId: orderId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `${orderId}_${Date.now()}`,
      notes: {
        orderId: orderId,
        type: "trader_to_admin_payment",
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      data: razorpayOrder,
      key_id: razorpay.key_id,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment order",
      error: error.message,
    });
  }
};

// Verify and Update Trader Payment
exports.verifyTraderPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      amount,
    } = req.body;

    // Verify signature
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }



    const order = await Order.findOne({ orderId: orderId });
if (!order) {
  return res.status(404).json({
    success: false,
    message: "Order not found",
  });
}

// Create payment record
const paymentRecord = {
  amount: parseFloat(amount), // Ensure it's a number
  paidDate: new Date(),
  razorpayPaymentId: razorpayPaymentId,
  razorpayOrderId: razorpayOrderId,
  razorpaySignature: razorpaySignature,
};

// Push payment to history
order.traderToAdminPayment.paymentHistory.push(paymentRecord);

// Update amounts - use parseFloat to ensure proper calculation
order.traderToAdminPayment.paidAmount =
  parseFloat(order.traderToAdminPayment.paidAmount) + parseFloat(amount);

order.traderToAdminPayment.remainingAmount =
  parseFloat(order.traderToAdminPayment.totalAmount) - parseFloat(order.traderToAdminPayment.paidAmount);

// Round to 2 decimal places to avoid floating point issues
order.traderToAdminPayment.remainingAmount =
  Math.round(order.traderToAdminPayment.remainingAmount * 100) / 100;

// Update payment status
if (order.traderToAdminPayment.remainingAmount <= 0.01) { // Allow small rounding error
  order.traderToAdminPayment.paymentStatus = "paid";
  order.traderToAdminPayment.remainingAmount = 0;
} else if (order.traderToAdminPayment.paidAmount > 0) {
  order.traderToAdminPayment.paymentStatus = "partial";
}

// Mark the subdocument as modified (important for nested objects!)
order.markModified('traderToAdminPayment');
    // Update payment details
    // const paymentRecord = {
    //   amount: amount,
    //   paidDate: new Date(),
    //   razorpayPaymentId: razorpayPaymentId,
    //   razorpayOrderId: razorpayOrderId,
    //   razorpaySignature: razorpaySignature,
    // };

    // order.traderToAdminPayment.paymentHistory.push(paymentRecord);
    // order.traderToAdminPayment.paidAmount += amount;
    // order.traderToAdminPayment.remainingAmount -= amount;

    // if (order.traderToAdminPayment.remainingAmount <= 0) {
    //   order.traderToAdminPayment.paymentStatus = "paid";
    //   order.traderToAdminPayment.remainingAmount = 0;
    // } else {
    //   order.traderToAdminPayment.paymentStatus = "partial";
    // }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

// Get Single Order Details
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId: orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};