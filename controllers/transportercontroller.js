const Order = require("../models/order");
const Product = require("../models/product");
const Market = require("../models/market");

// Get eligible orders for transporter (both statuses true + future delivery date)
exports.getEligibleOrdersForTransporter = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    // Find orders where both trader and farmer have accepted
    const orders = await Order.find({
      traderAcceptedStatus: true,
      farmerAcceptedStatus: true,
      // Handle both old documents (no field) and new documents (pending status)
      $or: [
        { transporterStatus: "pending" },
        { transporterStatus: { $exists: false } },
        { transporterStatus: null },
      ],
      orderStatus: { $nin: ["cancelled", "completed"] }, // Exclude completed/cancelled
    }).sort({ createdAt: -1 });

    // Filter orders with future delivery dates and enrich with product/market details
    const eligibleOrders = [];

    for (const order of orders) {
      // Check if any product item has a future delivery date
      const hasFutureDelivery = order.productItems.some((item) => {
        if (item.deliveryDate) {
          const deliveryDate = new Date(item.deliveryDate);
          deliveryDate.setHours(0, 0, 0, 0);
          return deliveryDate >= today;
        }
        return false;
      });

      if (!hasFutureDelivery) {
        continue; // Skip orders with past delivery dates
      }

      // Fetch product details for each item
      const enrichedProductItems = await Promise.all(
        order.productItems.map(async (item) => {
          const product = await Product.findOne({ productId: item.productId })
            .populate("categoryId", "categoryName")
            .populate("subCategoryId", "subCategoryName");

          let marketDetails = null;
          if (product && product.nearestMarket) {
            marketDetails = await Market.findOne({
              marketName: product.nearestMarket,
            });
          }

          return {
            ...item.toObject(),
            productName: product ? product.cropBriefDetails : "Unknown",
            categoryName: product?.categoryId?.categoryName || "N/A",
            subCategoryName: product?.subCategoryId?.subCategoryName || "N/A",
            nearestMarket: product?.nearestMarket || "N/A",
            marketDetails: marketDetails
              ? {
                  marketName: marketDetails.marketName,
                  pincode: marketDetails.pincode,
                  postOffice: marketDetails.postOffice,
                  district: marketDetails.district,
                  state: marketDetails.state,
                  exactAddress: marketDetails.exactAddress,
                  landmark: marketDetails.landmark,
                }
              : null,
          };
        })
      );

      eligibleOrders.push({
        ...order.toObject(),
        productItems: enrichedProductItems,
      });
    }

    res.status(200).json({
      success: true,
      count: eligibleOrders.length,
      data: eligibleOrders,
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

// Accept order by transporter
exports.acceptOrderByTransporter = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      transporterId,
      transporterName,
      transporterMobile,
      transporterEmail,
      vehicleType,
      vehicleNumber,
      vehicleCapacity,
      driverName,
      driverMobile,
    } = req.body;

    // Validate required fields
    if (!transporterId || !transporterName) {
      return res.status(400).json({
        success: false,
        message: "Transporter ID and name are required",
      });
    }

    if (!vehicleType || !vehicleNumber) {
      return res.status(400).json({
        success: false,
        message: "Vehicle type and number are required",
      });
    }

    // Find the order
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order is eligible
    if (!order.traderAcceptedStatus || !order.farmerAcceptedStatus) {
      return res.status(400).json({
        success: false,
        message: "Order must be accepted by both trader and farmer first",
      });
    }

    // Check if already accepted by another transporter
    if (order.transporterStatus === "accepted") {
      return res.status(400).json({
        success: false,
        message: "Order already accepted by another transporter",
      });
    }

    // Update order with transporter details
    order.transporterStatus = "accepted";
    order.transporterDetails = {
      transporterId,
      transporterName,
      transporterMobile: transporterMobile || "",
      transporterEmail: transporterEmail || "",
      vehicleType,
      vehicleNumber,
      vehicleCapacity: vehicleCapacity || "",
      driverName: driverName || "",
      driverMobile: driverMobile || "",
      acceptedAt: new Date(),
    };
    order.orderStatus = "in_transit";
    order.updatedAt = Date.now();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order accepted successfully",
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

// Reject order by transporter
exports.rejectOrderByTransporter = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { transporterId, rejectionReason } = req.body;

    // Validate transporter ID
    if (!transporterId) {
      return res.status(400).json({
        success: false,
        message: "Transporter ID is required",
      });
    }

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if already accepted
    if (order.transporterStatus === "accepted") {
      return res.status(400).json({
        success: false,
        message: "Cannot reject an already accepted order",
      });
    }

    order.transporterStatus = "rejected";
    order.updatedAt = Date.now();

    // Optionally store rejection reason
    if (rejectionReason) {
      order.rejectionReason = rejectionReason;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order rejected successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error rejecting order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject order",
      error: error.message,
    });
  }
};

// Get transporter's accepted orders
exports.getTransporterOrders = async (req, res) => {
  try {
    const { transporterId } = req.params;
    console.log("transport", transporterId);
    if (!transporterId) {
      return res.status(400).json({
        success: false,
        message: "Transporter ID is required",
      });
    }

    // Find orders accepted by this specific transporter
    const orders = await Order.find({
      "transporterDetails.transporterId": transporterId,
      transporterStatus: "accepted",
    }).sort({ createdAt: -1 });

    // Enrich with product and market details
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const enrichedProductItems = await Promise.all(
          order.productItems.map(async (item) => {
            const product = await Product.findOne({
              productId: item.productId,
            })
              .populate("categoryId", "categoryName")
              .populate("subCategoryId", "subCategoryName");

            let marketDetails = null;
            if (product && product.nearestMarket) {
              marketDetails = await Market.findOne({
                marketName: product.nearestMarket,
              });
            }

            return {
              ...item.toObject(),
              productName: product ? product.cropBriefDetails : "Unknown",
              categoryName: product?.categoryId?.categoryName || "N/A",
              subCategoryName: product?.subCategoryId?.subCategoryName || "N/A",
              nearestMarket: product?.nearestMarket || "N/A",
              marketDetails: marketDetails
                ? {
                    marketName: marketDetails.marketName,
                    pincode: marketDetails.pincode,
                    postOffice: marketDetails.postOffice,
                    district: marketDetails.district,
                    state: marketDetails.state,
                    exactAddress: marketDetails.exactAddress,
                    landmark: marketDetails.landmark,
                  }
                : null,
            };
          })
        );

        return {
          ...order.toObject(),
          productItems: enrichedProductItems,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: enrichedOrders.length,
      data: enrichedOrders,
    });
  } catch (error) {
    console.error("Error fetching transporter orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Mark order as completed (optional - for future use)
exports.completeOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { transporterId } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Verify this transporter owns the order
    if (order.transporterDetails?.transporterId !== transporterId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to complete this order",
      });
    }

    if (order.transporterStatus !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Order must be accepted before marking as completed",
      });
    }

    order.transporterStatus = "completed";
    order.orderStatus = "completed";
    order.updatedAt = Date.now();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order marked as completed",
      data: order,
    });
  } catch (error) {
    console.error("Error completing order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to complete order",
      error: error.message,
    });
  }
};

module.exports = exports;
