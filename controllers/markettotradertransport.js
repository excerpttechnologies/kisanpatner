// controllers/transportController.js
const Order = require("../models/order");
const Product = require("../models/product");
const Market = require("../models/Market");
const Farmer = require("../models/Farmer");

// ==================== TRANSPORTER APIs ====================

// Get eligible orders for transporter (Step 1)
exports.getEligibleOrdersForTransporter = async (req, res) => {
  try {
    const { transporterId } = req.query;

    // Find orders where:
    // 1. Payment is paid and remaining amount is 0
    // 2. TransporterStatus is 'completed' (farmer to market completed)
    // 3. MarketToTraderTransport status is 'pending' or doesn't exist or is null
    const orders = await Order.find({
      "traderToAdminPayment.paymentStatus": "paid",
      "traderToAdminPayment.remainingAmount": 0,
      transporterStatus: "completed",
      $or: [
        { "marketToTraderTransport.status": "pending" },
        { "marketToTraderTransport.status": { $exists: false } },
        { "marketToTraderTransport.status": null }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching eligible orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch eligible orders",
      error: error.message,
    });
  }
};

// Transporter accepts offer
exports.acceptTransportOffer = async (req, res) => {
  try {
    const { orderId, transporterId, transporterName, transporterMobile, pickupLocation, deliveryLocation } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check eligibility
    if (
      order.traderToAdminPayment.paymentStatus !== "paid" ||
      order.traderToAdminPayment.remainingAmount !== 0 ||
      order.transporterStatus !== "completed"
    ) {
      return res.status(400).json({
        success: false,
        message: "Order is not eligible for transport",
      });
    }

    // Check if already accepted by another transporter
    if (
      order.marketToTraderTransport &&
      order.marketToTraderTransport.status === "accepted" &&
      order.marketToTraderTransport.transporterId !== transporterId
    ) {
      return res.status(400).json({
        success: false,
        message: "Order already accepted by another transporter",
      });
    }

    // Create or update transport details
    order.marketToTraderTransport = {
      status: "accepted",
      transporterId,
      transporterName,
      transporterMobile,
      pickupLocation: pickupLocation || order.marketToTraderTransport?.pickupLocation,
      deliveryLocation: deliveryLocation || order.marketToTraderTransport?.deliveryLocation,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Send notification to admin
    console.log(`Notification: Transporter ${transporterName} accepted order ${orderId}`);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Transport offer accepted successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error accepting transport offer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to accept transport offer",
      error: error.message,
    });
  }
};

// Transporter rejects offer
exports.rejectTransportOffer = async (req, res) => {
  try {
    const { orderId, transporterId } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only update if this transporter was assigned
    if (
      order.marketToTraderTransport &&
      order.marketToTraderTransport.transporterId === transporterId
    ) {
      order.marketToTraderTransport.status = "rejected";
      order.marketToTraderTransport.updatedAt = new Date();
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: "Transport offer rejected successfully",
    });
  } catch (error) {
    console.error("Error rejecting transport offer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject transport offer",
      error: error.message,
    });
  }
};

// Transporter starts journey (enters pickup key)
exports.startJourney = async (req, res) => {
  try {
    const { orderId, transporterId, pickupKey } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.marketToTraderTransport) {
      return res.status(400).json({
        success: false,
        message: "Transport not initiated for this order",
      });
    }

    // Check if transporter is authorized
    if (order.marketToTraderTransport.transporterId !== transporterId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized transporter",
      });
    }

    // Check if already started
    if (order.marketToTraderTransport.status === "in_progress") {
      return res.status(400).json({
        success: false,
        message: "Journey already started",
      });
    }

    // Verify pickup key (from admin)
    if (!order.marketToTraderTransport.adminGeneratedKey) {
      return res.status(400).json({
        success: false,
        message: "No pickup key generated by admin",
      });
    }

    if (order.marketToTraderTransport.adminGeneratedKey !== pickupKey) {
      return res.status(400).json({
        success: false,
        message: "Invalid pickup key",
      });
    }

    // Update status and timestamps
    order.marketToTraderTransport.status = "in_progress";
    order.marketToTraderTransport.pickupKeyEnteredAt = new Date();
    order.marketToTraderTransport.journeyStartedAt = new Date();
    order.marketToTraderTransport.updatedAt = new Date();

    // Send notification to admin and trader
    console.log(`Notification: Transporter started journey for order ${orderId}`);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Journey started successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error starting journey:", error);
    res.status(500).json({
      success: false,
      message: "Failed to start journey",
      error: error.message,
    });
  }
};

// Transporter completes journey (enters trader key)
exports.completeJourney = async (req, res) => {
  try {
    const { orderId, transporterId, deliveryKey } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.marketToTraderTransport) {
      return res.status(400).json({
        success: false,
        message: "Transport not initiated for this order",
      });
    }

    // Check if transporter is authorized
    if (order.marketToTraderTransport.transporterId !== transporterId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized transporter",
      });
    }

    // Check if journey is in progress
    if (order.marketToTraderTransport.status !== "in_progress") {
      return res.status(400).json({
        success: false,
        message: "Journey not started or already completed",
      });
    }

    // Verify delivery key (from trader)
    if (!order.marketToTraderTransport.deliveryKey) {
      return res.status(400).json({
        success: false,
        message: "No delivery key generated by trader",
      });
    }

    if (order.marketToTraderTransport.deliveryKey !== deliveryKey) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery key",
      });
    }

    // Update status and timestamps
    order.marketToTraderTransport.status = "completed";
    order.marketToTraderTransport.deliveryKeyEnteredAt = new Date();
    order.marketToTraderTransport.journeyCompletedAt = new Date();
    order.marketToTraderTransport.updatedAt = new Date();

    // Update main order status
    order.orderStatus = "completed";
    order.updatedAt = new Date();

    // Send notification to admin and trader
    console.log(`Notification: Journey completed for order ${orderId}`);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Journey completed successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error completing journey:", error);
    res.status(500).json({
      success: false,
      message: "Failed to complete journey",
      error: error.message,
    });
  }
};

// ==================== ADMIN APIs ====================

// Get all transport orders for admin
exports.getAdminTransportOrders = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {
      "traderToAdminPayment.paymentStatus": "paid",
      "traderToAdminPayment.remainingAmount": 0,
      transporterStatus: "completed",
    };

    // Filter by transport status if provided
    if (status) {
      filter["marketToTraderTransport.status"] = status;
    } else {
      // Show all orders that have marketToTraderTransport or are eligible
      filter["$or"] = [
        { "marketToTraderTransport": { $exists: true } },
        {
          "marketToTraderTransport": { $exists: false },
          "traderToAdminPayment.paymentStatus": "paid",
          "traderToAdminPayment.remainingAmount": 0,
          transporterStatus: "completed"
        }
      ];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching admin transport orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transport orders",
      error: error.message,
    });
  }
};

// Admin assigns transporter and generates key
// In transportController.js - Update the assignTransporter function
exports.assignTransporter = async (req, res) => {
  try {
    const { orderId, transporterId, adminGeneratedKey, adminNotes } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order is accepted by transporter
    if (!order.marketToTraderTransport || order.marketToTraderTransport.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Transporter has not accepted this order yet",
      });
    }

    // Check if transporter matches
    if (order.marketToTraderTransport.transporterId !== transporterId) {
      return res.status(400).json({
        success: false,
        message: "Not authorized for this transporter",
      });
    }

    // Generate key if not provided
    let transportKey = adminGeneratedKey;
    if (!transportKey) {
      const randomNum = Math.floor(100 + Math.random() * 900); // 3 digit random
      transportKey = `KISANTRANSPORTER${randomNum}`;
    }

    // Update transport details with admin key
    order.marketToTraderTransport.adminGeneratedKey = transportKey;
    order.marketToTraderTransport.adminNotes = adminNotes || "";
    order.marketToTraderTransport.updatedAt = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Pickup key generated successfully",
      data: {
        orderId: order.orderId,
        adminGeneratedKey: transportKey,
        transporterId,
        transporterName: order.marketToTraderTransport.transporterName,
        transporterMobile: order.marketToTraderTransport.transporterMobile,
      },
    });
  } catch (error) {
    console.error("Error assigning transporter:", error);
    res.status(500).json({
      success: false,
      message: "Failed to assign transporter",
      error: error.message,
    });
  }
};

// Get transporter's accepted orders
exports.getTransporterAcceptedOrders = async (req, res) => {
  try {
    const { transporterId } = req.params;

    const orders = await Order.find({
      "marketToTraderTransport.transporterId": transporterId,
      "marketToTraderTransport.status": { $in: ['accepted', 'in_progress', 'completed'] }
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching transporter orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transporter orders",
      error: error.message,
    });
  }
};

// Admin expires key
exports.expireKey = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.marketToTraderTransport) {
      return res.status(400).json({
        success: false,
        message: "No transport details found",
      });
    }

    // Expire the key by removing it
    order.marketToTraderTransport.adminGeneratedKey = null;
    order.marketToTraderTransport.updatedAt = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Transport key expired successfully",
    });
  } catch (error) {
    console.error("Error expiring key:", error);
    res.status(500).json({
      success: false,
      message: "Failed to expire key",
      error: error.message,
    });
  }
};

// ==================== TRADER APIs ====================

// Get trader's transport orders
exports.getTraderTransportOrders = async (req, res) => {
  try {
    const { traderId } = req.params;

    // Find orders where trader is the owner and eligible for transport
    const orders = await Order.find({
      traderId,
      "traderToAdminPayment.paymentStatus": "paid",
      "traderToAdminPayment.remainingAmount": 0,
      transporterStatus: "completed",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching trader transport orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transport orders",
      error: error.message,
    });
  }
};

// Trader generates delivery key
exports.generateDeliveryKey = async (req, res) => {
  try {
    const { orderId, traderId, deliveryKey } = req.body;

    const order = await Order.findOne({ orderId, traderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or unauthorized",
      });
    }

    // Check eligibility
    if (
      order.traderToAdminPayment.paymentStatus !== "paid" ||
      order.traderToAdminPayment.remainingAmount !== 0 ||
      order.transporterStatus !== "completed"
    ) {
      return res.status(400).json({
        success: false,
        message: "Order is not eligible for transport",
      });
    }

    // Generate key if not provided
    let traderKey = deliveryKey;
    if (!traderKey) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      traderKey = "TRADER";
      for (let i = 0; i < 6; i++) {
        traderKey += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    // Create or update transport details
    if (!order.marketToTraderTransport) {
      order.marketToTraderTransport = {
        status: "pending",
        deliveryKey: traderKey,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } else {
      order.marketToTraderTransport.deliveryKey = traderKey;
      order.marketToTraderTransport.updatedAt = new Date();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Delivery key generated successfully",
      data: {
        orderId: order.orderId,
        deliveryKey: traderKey,
      },
    });
  } catch (error) {
    console.error("Error generating delivery key:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate delivery key",
      error: error.message,
    });
  }
};

// ==================== HELPER APIs ====================

// Get pickup location details
exports.getPickupLocationDetails = async (req, res) => {
  try {
    const { farmerId, marketId } = req.query;

    // Get farmer details
    const farmer = await Farmer.findOne({ farmerId });
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    // Get market details
    const market = await Market.findOne({ _id: marketId });
    if (!market) {
      return res.status(404).json({
        success: false,
        message: "Market not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        farmer: {
          name: farmer.personalInfo.name,
          address: `${farmer.personalInfo.villageGramaPanchayat}, ${farmer.personalInfo.district}, ${farmer.personalInfo.state}`,
        },
        market: {
          name: market.marketName,
          address: `${market.exactAddress}, ${market.district}, ${market.state}`,
        },
        pickupLocation: {
          address: `${market.exactAddress}, ${market.district}, ${market.state}`,
          marketId: market._id,
          marketName: market.marketName,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching pickup location:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch location details",
      error: error.message,
    });
  }
};

// Get delivery location details
exports.getDeliveryLocationDetails = async (req, res) => {
  try {
    const { traderId } = req.params;

    // Since trader and farmer are in same collection, find by traderId
    const trader = await Farmer.findOne({ traderId });
    if (!trader) {
      return res.status(404).json({
        success: false,
        message: "Trader not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        trader: {
          name: trader.personalInfo.name,
          mobile: trader.personalInfo.mobileNo,
          address: trader.personalInfo.address,
          district: trader.personalInfo.district,
          state: trader.personalInfo.state,
        },
        deliveryLocation: {
          address: trader.personalInfo.address,
          traderId: trader.traderId,
          traderName: trader.personalInfo.name,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching delivery location:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch delivery location",
      error: error.message,
    });
  }
};

module.exports = exports;