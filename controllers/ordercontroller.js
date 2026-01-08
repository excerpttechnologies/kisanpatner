// const Order = require("../models/order");
// const Product = require("../models/product");

// // Create order after payment
// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       traderId,
//       traderName,
//       traderMobile,
//       traderEmail,
//       cartItems, // Array of { productId, farmerId, grade, quantity, pricePerUnit }
//       totalAmount,
//       paidAmount,
//       razorpayPaymentId,
//       razorpayOrderId,
//       razorpaySignature,
//     } = req.body;

//     // Validate input
//     if (!traderId || !cartItems || cartItems.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Trader ID and cart items are required",
//       });
//     }

//     // Calculate totals and prepare product items
//     const productItems = cartItems.map((item) => ({
//       productId: item.productId,
//       farmerId: item.farmerId,
//       grade: item.grade,
//       quantity: item.quantity,
//       pricePerUnit: item.pricePerUnit,
//       totalAmount: item.quantity * item.pricePerUnit,
//     }));

//     const calculatedTotal = productItems.reduce(
//       (sum, item) => sum + item.totalAmount,
//       0
//     );
//     const finalTotalAmount = totalAmount || calculatedTotal;
//     const finalPaidAmount = paidAmount || 0;
//     const remainingAmount = finalTotalAmount - finalPaidAmount;

//     // Determine payment status
//     let paymentStatus = "pending";
//     if (finalPaidAmount >= finalTotalAmount) {
//       paymentStatus = "paid";
//     } else if (finalPaidAmount > 0) {
//       paymentStatus = "partial";
//     }

//     // Create payment history record
//     const paymentHistory =
//       finalPaidAmount > 0
//         ? [
//             {
//               amount: finalPaidAmount,
//               paidDate: new Date(),
//               razorpayPaymentId,
//               razorpayOrderId,
//               razorpaySignature,
//             },
//           ]
//         : [];

//     // Create order
//     const newOrder = new Order({
//       traderId,
//       traderName,
//       traderMobile,
//       traderEmail,
//       productItems,
//       traderToAdminPayment: {
//         totalAmount: finalTotalAmount,
//         paidAmount: finalPaidAmount,
//         remainingAmount,
//         paymentStatus,
//         paymentHistory,
//       },
//       traderAcceptedStatus: true,
//       farmerAcceptedStatus: false,
//       orderStatus: "pending",
//     });

//     await newOrder.save();

//     // Update product purchaseHistory
//     for (const item of cartItems) {
//       await Product.findOneAndUpdate(
//         {
//           productId: item.productId,
//           "gradePrices.grade": item.grade,
//         },
//         {
//           $push: {
//             "gradePrices.$.purchaseHistory": {
//               traderId,
//               traderName,
//               quantity: item.quantity,
//               pricePerUnit: item.pricePerUnit,
//               totalAmount: item.quantity * item.pricePerUnit,
//               purchaseDate: new Date(),
//               purchaseType: "direct",
//               paymentStatus: paymentStatus === "paid" ? "paid" : "pending",
//               razorpayPaymentId,
//               razorpayOrderId,
//             },
//           },
//         }
//       );
//     }

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       data: newOrder,
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create order",
//       error: error.message,
//     });
//   }
// };

// // Get trader's orders
// exports.getTraderOrders = async (req, res) => {
//   try {
//     const { traderId } = req.params;

//     const orders = await Order.find({ traderId }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: orders.length,
//       data: orders,
//     });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch orders",
//       error: error.message,
//     });
//   }
// };

// // Get single order
// exports.getOrderById = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findOne({ orderId });

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
//     console.error("Error fetching order:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch order",
//       error: error.message,
//     });
//   }
// };

// // Add payment to existing order
// exports.addPaymentToOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const {
//       paidAmount,
//       razorpayPaymentId,
//       razorpayOrderId,
//       razorpaySignature,
//     } = req.body;

//     const order = await Order.findOne({ orderId });

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Update payment
//     order.traderToAdminPayment.paidAmount += paidAmount;
//     order.traderToAdminPayment.remainingAmount -= paidAmount;

//     // Update payment status
//     if (order.traderToAdminPayment.remainingAmount <= 0) {
//       order.traderToAdminPayment.paymentStatus = "paid";
//       order.traderToAdminPayment.remainingAmount = 0;
//     } else if (order.traderToAdminPayment.paidAmount > 0) {
//       order.traderToAdminPayment.paymentStatus = "partial";
//     }

//     // Add to payment history
//     order.traderToAdminPayment.paymentHistory.push({
//       amount: paidAmount,
//       paidDate: new Date(),
//       razorpayPaymentId,
//       razorpayOrderId,
//       razorpaySignature,
//     });

//     order.updatedAt = Date.now();
//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Payment added successfully",
//       data: order,
//     });
//   } catch (error) {
//     console.error("Error adding payment:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to add payment",
//       error: error.message,
//     });
//   }
// };

// // Update farmer acceptance status
// exports.updateFarmerStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { farmerAcceptedStatus } = req.body;

//     const order = await Order.findOneAndUpdate(
//       { orderId },
//       {
//         farmerAcceptedStatus,
//         updatedAt: Date.now(),
//       },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Farmer status updated successfully",
//       data: order,
//     });
//   } catch (error) {
//     console.error("Error updating farmer status:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update farmer status",
//       error: error.message,
//     });
//   }
// };

// // Update order status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { orderStatus } = req.body;

//     const order = await Order.findOneAndUpdate(
//       { orderId },
//       {
//         orderStatus,
//         updatedAt: Date.now(),
//       },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Order status updated successfully",
//       data: order,
//     });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update order status",
//       error: error.message,
//     });
//   }
// };

// // Get all orders (admin)
// exports.getAllOrders = async (req, res) => {
//   try {
//     const { status, traderId, paymentStatus } = req.query;

//     let filter = {};
//     if (status) filter.orderStatus = status;
//     if (traderId) filter.traderId = traderId;
//     if (paymentStatus)
//       filter["traderToAdminPayment.paymentStatus"] = paymentStatus;

//     const orders = await Order.find(filter).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: orders.length,
//       data: orders,
//     });
//   } catch (error) {
//     console.error("Error fetching all orders:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch orders",
//       error: error.message,
//     });
//   }
// };




const Order = require("../models/order");
const Product = require("../models/product");

// ==================== CREATE ORDER ====================
exports.createOrder = async (req, res) => {
  try {
    const {
      traderId,
      traderName,
      traderMobile,
      traderEmail,
      cartItems,
      totalAmount,
      paidAmount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    
    console.log("Creating order:", req.body);

    if (!traderId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Trader ID and cart items are required",
      });
    }

    const farmerId = cartItems[0].farmerId;

    const productItems = cartItems.map((item) => ({
      productId: item.productId,
      farmerId: item.farmerId,
      grade: item.grade,
      deliveryDate: item.deliveryDate,
      quantity: item.quantity,
      pricePerUnit: item.pricePerUnit,
      totalAmount: item.quantity * item.pricePerUnit,
      nearestMarket: item.nearestMarket,
    }));

    const calculatedTotal = productItems.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );
    
    const finalTotalAmount = totalAmount || calculatedTotal;
    const finalPaidAmount = paidAmount || 0;
    const remainingAmount = finalTotalAmount - finalPaidAmount;

    // Determine payment status
    let paymentStatus = "pending";
    if (order.traderToAdminPayment.remainingAmount <= 0) {
      paymentStatus = "paid";
    } else if (finalPaidAmount > 0) {
      paymentStatus = "partial";
    }

    const paymentHistory =
      finalPaidAmount > 0
        ? [
            {
              amount: finalPaidAmount,
              paidDate: new Date(),
              razorpayPaymentId,
              razorpayOrderId,
              razorpaySignature,
            },
          ]
        : [];

    // ✅ AUTO GENERATE TRADER DELIVERY KEY IF FULL PAYMENT
    let traderDeliveryKey = null;
    if (paymentStatus === "paid") {
      const rand = Math.floor(1000 + Math.random() * 9000);
      traderDeliveryKey = `TRADER${rand}`;
      console.log("✅ Trader Key Generated at Creation:", traderDeliveryKey);
    }

    const newOrder = new Order({
      traderId,
      traderName,
      traderMobile,
      traderEmail,
      farmerId,
      productItems,
      traderToAdminPayment: {
        totalAmount: finalTotalAmount,
        paidAmount: finalPaidAmount,
        remainingAmount,
        paymentStatus,
        paymentHistory,
      },
      traderDeliveryKey,
      traderAcceptedStatus: true,
      farmerAcceptedStatus: false,
      orderStatus: "pending",
    });

    await newOrder.save();

    // Update product purchaseHistory
    for (const item of cartItems) {
      await Product.findOneAndUpdate(
        {
          productId: item.productId,
          "gradePrices.grade": item.grade,
        },
        {
          $push: {
            "gradePrices.$.purchaseHistory": {
              traderId,
              traderName,
              quantity: item.quantity,
              pricePerUnit: item.pricePerUnit,
              totalAmount: item.quantity * item.pricePerUnit,
              purchaseDate: new Date(),
              purchaseType: "direct",
              paymentStatus: paymentStatus === "paid" ? "paid" : "pending",
              razorpayPaymentId,
              razorpayOrderId,
            },
          },
        }
      );
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      traderDeliveryKey: traderDeliveryKey || null,
      data: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// ==================== FARMER ACCEPTS ORDER ====================
exports.farmerAcceptOrder = async (req, res) => {
  try {
    const {
      farmerId,
      traderId,
      productItems,
      farmerName,
      farmerMobile,
      farmerEmail,
      totalFarmerAmount,
      commissionRate,
    } = req.body;

    if (!farmerId || !traderId || !productItems || productItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Farmer ID, Trader ID and product items are required",
      });
    }

    const order = await Order.findOne({
      farmerId: farmerId,
      traderId: traderId,
      farmerAcceptedStatus: false,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or already accepted",
      });
    }

    const orderProductMatches = productItems.every((reqItem) => {
      return order.productItems.some(
        (orderItem) =>
          orderItem.productId === reqItem.productId &&
          orderItem.grade === reqItem.grade
      );
    });

    if (!orderProductMatches) {
      return res.status(400).json({
        success: false,
        message: "Product items do not match the order",
      });
    }

    order.farmerName = farmerName || order.farmerName;
    order.farmerMobile = farmerMobile || order.farmerMobile;
    order.farmerEmail = farmerEmail || order.farmerEmail;
    order.farmerAcceptedStatus = true;

    order.adminToFarmerPayment = {
      totalAmount: totalFarmerAmount,
      paidAmount: 0,
      remainingAmount: totalFarmerAmount,
      paymentStatus: "pending",
      paymentHistory: [],
    };

    order.orderStatus = "processing";
    order.updatedAt = Date.now();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order accepted by farmer successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error accepting order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to accept order",
      error: error.message,
    });
  }
};

// ==================== GET FARMER ORDERS ====================
exports.getFarmerOrders = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const orders = await Order.find({ farmerId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching farmer orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// ==================== GET TRADER ORDERS ====================
exports.getTraderOrders = async (req, res) => {
  try {
    const { traderId } = req.params;
    const orders = await Order.find({ traderId }).sort({ createdAt: -1 });

    // ✅ AUTO-GENERATE KEY IF PAYMENT IS PAID BUT KEY MISSING
    let updated = false;

    for (let order of orders) {
      if (
        order.traderToAdminPayment?.paymentStatus === "paid" &&
        !order.traderDeliveryKey
      ) {
        const rand = Math.floor(1000 + Math.random() * 9000);
        order.traderDeliveryKey = `TRADER${rand}`;
        updated = true;
        console.log("✅ Auto fixed missing trader key:", order.orderId);
        await order.save();
      }
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


// ==================== GET SINGLE ORDER ====================
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

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
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// ==================== ADD PAYMENT (TRADER TO ADMIN) ====================
exports.addPaymentToOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      paidAmount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update payment amounts
    order.traderToAdminPayment.paidAmount += paidAmount;
    order.traderToAdminPayment.remainingAmount -= paidAmount;

    // Update payment status
    if (order.traderToAdminPayment.remainingAmount <= 100) {
      order.traderToAdminPayment.paymentStatus = "paid";
      order.traderToAdminPayment.remainingAmount = 0;
    } else if (order.traderToAdminPayment.paidAmount > 0) {
      order.traderToAdminPayment.paymentStatus = "partial";
    }

    // Add to payment history
    order.traderToAdminPayment.paymentHistory.push({
      amount: paidAmount,
      paidDate: new Date(),
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    });

    // ✅ AUTO GENERATE TRADER DELIVERY KEY WHEN PAYMENT BECOMES PAID
    if (
      order.traderToAdminPayment.paymentStatus === "paid" &&
      !order.traderDeliveryKey
    ) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      order.traderDeliveryKey = `TRADER${rand}`;
      console.log("✅ Trader Delivery Key Generated:", order.traderDeliveryKey);
    }

    order.updatedAt = Date.now();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment added successfully",
      traderDeliveryKey: order.traderDeliveryKey || null,
      data: order,
    });
  } catch (error) {
    console.error("Error adding payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add payment",
      error: error.message,
    });
  }
};

// ==================== ADD PAYMENT (ADMIN TO FARMER) ====================
exports.addAdminToFarmerPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paidAmount, paymentReference } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.adminToFarmerPayment) {
      return res.status(400).json({
        success: false,
        message: "Farmer has not accepted this order yet",
      });
    }

    order.adminToFarmerPayment.paidAmount += paidAmount;
    order.adminToFarmerPayment.remainingAmount -= paidAmount;

    if (order.adminToFarmerPayment.remainingAmount <= 0) {
      order.adminToFarmerPayment.paymentStatus = "paid";
      order.adminToFarmerPayment.remainingAmount = 0;
    } else if (order.adminToFarmerPayment.paidAmount > 0) {
      order.adminToFarmerPayment.paymentStatus = "partial";
    }

    order.adminToFarmerPayment.paymentHistory.push({
      amount: paidAmount,
      paidDate: new Date(),
      razorpayPaymentId: paymentReference || "",
    });

    order.updatedAt = Date.now();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment to farmer added successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error adding farmer payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add payment",
      error: error.message,
    });
  }
};

// ==================== UPDATE ORDER STATUS ====================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findOneAndUpdate(
      { orderId },
      {
        orderStatus,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// ==================== GET ALL ORDERS (ADMIN) ====================
exports.getAllOrders = async (req, res) => {
  try {
    const {
      status,
      traderId,
      farmerId,
      traderPaymentStatus,
      showPartialPayments = "false",
    } = req.query;

    let filter = {};

    if (status) filter.orderStatus = status;
    if (traderId) filter.traderId = traderId;
    if (farmerId) filter.farmerId = farmerId;

    if (traderPaymentStatus) {
      filter["traderToAdminPayment.paymentStatus"] = traderPaymentStatus;
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    let filteredOrders = orders;

    if (showPartialPayments === "false") {
      filteredOrders = orders.filter(
        (order) => order.traderToAdminPayment?.paymentStatus !== "pending"
      );
    }

    res.status(200).json({
      success: true,
      count: filteredOrders.length,
      data: filteredOrders,
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// ==================== TRANSPORTER ACCEPTS ORDER ====================
exports.transporterAcceptOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { transporterDetails } = req.body;

    const order = await Order.findOne({ orderId });
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    order.transporterStatus = "accepted";
    order.transporterDetails = transporterDetails;
    order.updatedAt = Date.now();

    await order.save();

    res.json({
      success: true,
      message: "Transporter accepted order",
      data: order,
    });
  } catch (err) {
    console.error("Transporter accept error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// ==================== ADMIN SELECTS TRANSPORTER & GENERATES PICKUP KEY ====================
exports.adminSelectTransporter = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    if (!order.transporterDetails) {
      return res.status(400).json({ 
        success: false, 
        message: "No transporter accepted yet" 
      });
    }

    // ✅ GENERATE ADMIN PICKUP KEY
    const rand = Math.floor(1000 + Math.random() * 9000);
    const pickupKey = `KISANPARTNER${rand}`;

    order.adminPickupKey = pickupKey;
    order.transporterStatus = "approved";
    order.updatedAt = Date.now();

    await order.save();

    res.json({
      success: true,
      message: "Transporter approved & pickup key generated",
      pickupKey,
      data: order,
    });
  } catch (err) {
    console.error("Admin select transporter error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// ==================== TRANSPORTER STARTS JOURNEY ====================
exports.transporterStartJourney = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { pickupKey } = req.body;

    const order = await Order.findOne({ orderId });
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // ✅ VERIFY ADMIN PICKUP KEY
    if (order.adminPickupKey !== pickupKey) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid pickup key" 
      });
    }

    order.transporterStatus = "started";
    order.orderStatus = "in_transit";
    order.updatedAt = Date.now();
    
    await order.save();

    res.json({ 
      success: true, 
      message: "Journey started successfully", 
      data: order 
    });
  } catch (err) {
    console.error("Start journey error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// ==================== TRANSPORTER COMPLETES DELIVERY ====================
exports.completeDeliveryByTransporter = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { traderKey } = req.body;

    const order = await Order.findOne({ orderId });
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // ✅ CHECK IF TRADER DELIVERY KEY IS GENERATED
    if (!order.traderDeliveryKey) {
      return res.status(400).json({ 
        success: false, 
        message: "Trader delivery key not generated yet. Payment must be completed first." 
      });
    }

    // ✅ VERIFY TRADER DELIVERY KEY
    if (order.traderDeliveryKey !== traderKey) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid trader delivery key" 
      });
    }

    // ✅ MARK DELIVERY AS COMPLETED
    order.deliveryStatus = "delivered";
    order.orderStatus = "completed";
    order.transporterStatus = "completed";

    // ✅ EXPIRE THE KEY (DELETE IT)
    order.traderDeliveryKey = null;
    order.adminPickupKey = null;

    order.updatedAt = Date.now();
    await order.save();

    res.json({
      success: true,
      message: "Delivery completed successfully! 🎉",
      data: order,
    });

  } catch (err) {
    console.error("Complete delivery error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error",
      error: err.message 
    });
  }
};

// ==================== ADMIN: UPDATE PAYMENT STATUS MANUALLY ====================
exports.adminUpdatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus, paidAmount } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update payment details if provided
    if (paidAmount !== undefined) {
      order.traderToAdminPayment.paidAmount = paidAmount;
      order.traderToAdminPayment.remainingAmount =
        order.traderToAdminPayment.totalAmount - paidAmount;
    }

    // Update payment status
    if (paymentStatus) {
      order.traderToAdminPayment.paymentStatus = paymentStatus;
    }

    // ✅ AUTO GENERATE TRADER KEY IF PAYMENT IS PAID
    if (
      order.traderToAdminPayment.paymentStatus === "paid" &&
      !order.traderDeliveryKey
    ) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      order.traderDeliveryKey = `TRADER${rand}`;
      console.log("✅ Admin Triggered Trader Key:", order.traderDeliveryKey);
    }

    order.updatedAt = Date.now();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      traderDeliveryKey: order.traderDeliveryKey || null,
      data: order,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};

// ==================== GENERATE TRADER KEY MANUALLY ====================
exports.generateTraderDeliveryKey = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if payment is completed
    if (order.traderToAdminPayment.paymentStatus !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment must be completed before generating delivery key",
      });
    }

    // Check if key already exists
    if (order.traderDeliveryKey) {
      return res.status(200).json({
        success: true,
        message: "Delivery key already exists",
        traderDeliveryKey: order.traderDeliveryKey,
        data: order,
      });
    }

    // Generate new key
    const rand = Math.floor(1000 + Math.random() * 9000);
    order.traderDeliveryKey = `TRADER${rand}`;
    order.updatedAt = Date.now();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Trader delivery key generated successfully",
      traderDeliveryKey: order.traderDeliveryKey,
      data: order,
    });
  } catch (error) {
    console.error("Error generating trader key:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate trader key",
      error: error.message,
    });
  }
};

module.exports = exports;