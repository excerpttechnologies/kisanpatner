const Order = require("../models/order");
const Product = require("../models/product");

// Try to load Market model
let Market;
try {
  Market = require("../models/Market");
} catch (error) {
  console.warn("Market model not found");
  Market = null;
}

// Get all orders for admin
exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    const { status, transporterStatus, search } = req.query;

    let filter = {};

    if (status) {
      filter.orderStatus = status;
    }

    if (transporterStatus) {
      filter.transporterStatus = transporterStatus;
    }

    if (search) {
      filter.$or = [
        { orderId: { $regex: search, $options: "i" } },
        { traderName: { $regex: search, $options: "i" } },
        { farmerName: { $regex: search, $options: "i" } },
      ];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    // Enrich with product details
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
            if (Market && product && product.nearestMarket) {
              try {
                marketDetails = await Market.findOne({
                  marketName: product.nearestMarket,
                });
              } catch (error) {
                console.error("Error fetching market details:", error);
              }
            }

            return {
              ...item.toObject(),
              productName: product ? product.cropBriefDetails : "Unknown",
              categoryName: product?.categoryId?.categoryName || "N/A",
              nearestMarket: product?.nearestMarket || "N/A",
              marketDetails: marketDetails
                ? {
                    marketName: marketDetails.marketName,
                    pincode: marketDetails.pincode,
                    district: marketDetails.district,
                    state: marketDetails.state,
                    exactAddress: marketDetails.exactAddress,
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
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get single order details
// exports.getOrderDetails = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findOne({ orderId });

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Enrich with product details
//     const enrichedProductItems = await Promise.all(
//       order.productItems.map(async (item) => {
//         const product = await Product.findOne({
//           productId: item.productId,
//         })
//           .populate("categoryId", "categoryName")
//           .populate("subCategoryId", "subCategoryName");

//         let marketDetails = null;
//         if (Market && product && product.nearestMarket) {
//           try {
//             marketDetails = await Market.findOne({
//               marketName: product.nearestMarket,
//             });
//           } catch (error) {
//             console.error("Error fetching market details:", error);
//           }
//         }

//         return {
//           ...item.toObject(),
//           productName: product ? product.cropBriefDetails : "Unknown",
//           categoryName: product?.categoryId?.categoryName || "N/A",
//           nearestMarket: product?.nearestMarket || "N/A",
//           marketDetails: marketDetails
//             ? {
//                 marketName: marketDetails.marketName,
//                 pincode: marketDetails.pincode,
//                 district: marketDetails.district,
//                 state: marketDetails.state,
//                 exactAddress: marketDetails.exactAddress,
//               }
//             : null,
//         };
//       })
//     );

//     res.status(200).json({
//       success: true,
//       data: {
//         ...order.toObject(),
//         productItems: enrichedProductItems,
//       },
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

// Confirm transportation and goods
exports.confirmTransportation = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      transporterReached,
      goodsConditionCorrect,
      quantityCorrect,
      adminNotes,
      adminId,
      adminName,
    } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if transporter has accepted
    if (order.transporterStatus !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Order must be accepted by transporter first",
      });
    }

    // Add transportation confirmation details
    if (!order.transporterDetails) {
      return res.status(400).json({
        success: false,
        message: "Transporter details not found",
      });
    }

    // Add confirmation details to transporter object
    order.transporterDetails.transporterReached = transporterReached || false;
    order.transporterDetails.goodsConditionCorrect =
      goodsConditionCorrect || false;
    order.transporterDetails.quantityCorrect = quantityCorrect || false;
    order.transporterDetails.adminNotes = adminNotes || "";
    order.transporterDetails.verifiedBy = adminId || "";
    order.transporterDetails.verifiedByName = adminName || "";
    order.transporterDetails.verifiedAt = new Date();

    // Update order status if all checks pass
    if (transporterReached && goodsConditionCorrect && quantityCorrect) {
      order.transporterStatus = "completed";
      order.orderStatus = "completed";
    }

    order.updatedAt = Date.now();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Transportation confirmation updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error confirming transportation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to confirm transportation",
      error: error.message,
    });
  }
};

// Update transportation verification
exports.updateTransportationVerification = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      transporterReached,
      goodsConditionCorrect,
      quantityCorrect,
      adminNotes,
      adminId,
      adminName,
    } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.transporterDetails) {
      return res.status(400).json({
        success: false,
        message: "Transporter details not found",
      });
    }

    // Update verification fields
    if (transporterReached !== undefined) {
      order.transporterDetails.transporterReached = transporterReached;
    }
    if (goodsConditionCorrect !== undefined) {
      order.transporterDetails.goodsConditionCorrect = goodsConditionCorrect;
    }
    if (quantityCorrect !== undefined) {
      order.transporterDetails.quantityCorrect = quantityCorrect;
    }
    if (adminNotes !== undefined) {
      order.transporterDetails.adminNotes = adminNotes;
    }

    order.transporterDetails.verifiedBy = adminId || "";
    order.transporterDetails.verifiedByName = adminName || "";
    order.transporterDetails.verifiedAt = new Date();

    // Check if all verifications are complete
    const allVerified =
      order.transporterDetails.transporterReached &&
      order.transporterDetails.goodsConditionCorrect &&
      order.transporterDetails.quantityCorrect;

    if (allVerified) {
      order.transporterStatus = "completed";
      order.orderStatus = "completed";
    }

    order.updatedAt = Date.now();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Verification updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error updating verification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update verification",
      error: error.message,
    });
  }
};






// Get single order details with product grades
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findOne({ orderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Fetch product details with all grades for each product item
    const productItemsWithGrades = await Promise.all(
      order.productItems.map(async (item) => {
        const product = await Product.findOne({ productId: item.productId });
        
        return {
          ...item.toObject(),
          availableGrades: product ? product.gradePrices.map(gp => ({
            grade: gp.grade,
            pricePerUnit: gp.pricePerUnit,
            availableQty: gp.totalQty
          })) : []
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        ...order.toObject(),
        productItems: productItemsWithGrades
      }
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order details'
    });
  }
};

// Update order with new grade and fees
// exports.updateOrderDetails = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const {
//       productItems, // Array with updated grades, quantities, prices
//       farmerLabourFee,
//       traderLabourFee,
//       farmerTransportFee,
//       traderTransportFee,
//       advanceAmount
//     } = req.body;

//     const order = await Order.findOne({ orderId });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }

//     // Calculate totals
//     let productTotal = 0;
    
//     // Update product items
//     order.productItems = productItems.map(item => {
//       const itemTotal = item.pricePerUnit * item.quantity;
//       productTotal += itemTotal;
      
//       return {
//         ...item,
//         totalAmount: itemTotal
//       };
//     });

//     // Calculate Farmer Payment (Product Total - Labour - Transport)
//     const farmerTotal = productTotal - (farmerLabourFee || 0) - (farmerTransportFee || 0);
//     const farmerRemaining = farmerTotal - (advanceAmount || 0);

//     // Calculate Trader Payment (Product Total + Labour + Transport)
//     const traderTotal = productTotal + (traderLabourFee || 0) + (traderTransportFee || 0);

//     // Update adminToFarmerPayment
//     order.adminToFarmerPayment = {
//       totalAmount: farmerTotal,
//       paidAmount: advanceAmount || 0,
//       remainingAmount: farmerRemaining,
//       paymentStatus: farmerRemaining === 0 ? 'paid' : (advanceAmount > 0 ? 'partial' : 'pending'),
//       paymentHistory: advanceAmount > 0 ? [{
//         amount: advanceAmount,
//         paidDate: new Date(),
//         paymentType: 'advance'
//       }] : [],
//       fees: {
//         labourFee: farmerLabourFee || 0,
//         transportFee: farmerTransportFee || 0,
//         advanceAmount: advanceAmount || 0
//       }
//     };

//     // Update traderToAdminPayment
//     order.traderToAdminPayment = {
//       totalAmount: traderTotal,
    
//       remainingAmount: traderTotal,
//       paymentStatus: 'pending',
//       paymentHistory: [],
//       fees: {
//         labourFee: traderLabourFee || 0,
//         transportFee: traderTransportFee || 0
//       }
//     };

//     order.updatedAt = new Date();
    
//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: 'Order updated successfully',
//       data: order
//     });
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating order'
//     });
//   }
// };


exports.updateOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      productItems,
      farmerLabourFee,
      traderLabourFee,
      farmerTransportFee,
      traderTransportFee,
      advanceAmount
    } = req.body;

    const order = await Order.findOne({ orderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Calculate totals
    let productTotal = 0;
    
    // Update product items
    order.productItems = productItems.map(item => {
      const itemTotal = item.pricePerUnit * item.quantity;
      productTotal += itemTotal;
      
      return {
        ...item,
        totalAmount: itemTotal
      };
    });

    // ============ TRADER TO ADMIN PAYMENT ============
    // Get existing paid amount from payment history
    const existingTraderPaidAmount = order.traderToAdminPayment.paidAmount || 0;
    
    // Calculate new trader total
    const newTraderTotal = productTotal + (traderLabourFee || 0) + (traderTransportFee || 0);
    
    // Calculate remaining = newTotal - alreadyPaid
    const traderRemaining = newTraderTotal - existingTraderPaidAmount;
    
    // Determine payment status
    let traderPaymentStatus = 'pending';
    if (existingTraderPaidAmount >= newTraderTotal) {
      traderPaymentStatus = 'paid';
    } else if (existingTraderPaidAmount > 0) {
      traderPaymentStatus = 'partial';
    }

    // Update traderToAdminPayment (PRESERVE paymentHistory)
    order.traderToAdminPayment = {
      totalAmount: newTraderTotal,
      paidAmount: existingTraderPaidAmount,
      remainingAmount: Math.max(0, traderRemaining), // Don't go negative
      paymentStatus: traderPaymentStatus,
      paymentHistory: order.traderToAdminPayment.paymentHistory || [], // PRESERVE
      fees: {
        labourFee: traderLabourFee || 0,
        transportFee: traderTransportFee || 0
      }
    };

    // ============ ADMIN TO FARMER PAYMENT ============
    // Get existing farmer paid amount
    const existingFarmerPaidAmount = order.adminToFarmerPayment?.paidAmount || 0;
    
    // Calculate new farmer total
    const newFarmerTotal = productTotal - (farmerLabourFee || 0) - (farmerTransportFee || 0);
    
    // If advance is provided, use it; otherwise use existing paid amount
    const farmerPaidAmount = advanceAmount !== undefined ? advanceAmount : existingFarmerPaidAmount;
    const farmerRemaining = newFarmerTotal - farmerPaidAmount;
    
    // Determine farmer payment status
    let farmerPaymentStatus = 'pending';
    if (farmerPaidAmount >= newFarmerTotal) {
      farmerPaymentStatus = 'paid';
    } else if (farmerPaidAmount > 0) {
      farmerPaymentStatus = 'partial';
    }

    // Update adminToFarmerPayment
    order.adminToFarmerPayment = {
      totalAmount: newFarmerTotal,
      paidAmount: farmerPaidAmount,
      remainingAmount: Math.max(0, farmerRemaining),
      paymentStatus: farmerPaymentStatus,
      paymentHistory: order.adminToFarmerPayment?.paymentHistory || [],
      fees: {
        labourFee: farmerLabourFee || 0,
        transportFee: farmerTransportFee || 0,
        advanceAmount: farmerPaidAmount
      }
    };

    order.updatedAt = new Date();
    
    // Mark as modified for nested objects
    order.markModified('traderToAdminPayment');
    order.markModified('adminToFarmerPayment');
    
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order'
    });
  }
};

// Record manual payment from admin to farmer
exports.recordFarmerPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      amount,
      paymentMethod,
      paymentReference,
      paymentNotes,
      paidBy,
      paidByName
    } = req.body;

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment amount'
      });
    }

    const order = await Order.findOne({ orderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (!order.adminToFarmerPayment) {
      return res.status(400).json({
        success: false,
        message: 'No farmer payment details found'
      });
    }

    // Check if payment exceeds remaining amount
    if (amount > order.adminToFarmerPayment.remainingAmount) {
      return res.status(400).json({
        success: false,
        message: `Payment amount (${amount}) exceeds remaining amount (${order.adminToFarmerPayment.remainingAmount})`
      });
    }

    // Create payment record
    const paymentRecord = {
      amount: parseFloat(amount),
      paidDate: new Date(),
      paymentMethod: paymentMethod || 'cash',
      paymentReference: paymentReference || '',
      paymentNotes: paymentNotes || '',
      paidBy: paidBy || '',
      paidByName: paidByName || 'Admin'
    };

    // Update payment details
    const newPaidAmount = order.adminToFarmerPayment.paidAmount + parseFloat(amount);
    const newRemainingAmount = order.adminToFarmerPayment.totalAmount - newPaidAmount;

    // Determine payment status
    let paymentStatus = 'pending';
    if (newRemainingAmount === 0) {
      paymentStatus = 'paid';
    } else if (newPaidAmount > 0) {
      paymentStatus = 'partial';
    }

    // Update the payment object
    order.adminToFarmerPayment.paidAmount = newPaidAmount;
    order.adminToFarmerPayment.remainingAmount = newRemainingAmount;
    order.adminToFarmerPayment.paymentStatus = paymentStatus;
    
    // Add to payment history
    if (!order.adminToFarmerPayment.paymentHistory) {
      order.adminToFarmerPayment.paymentHistory = [];
    }
    order.adminToFarmerPayment.paymentHistory.push(paymentRecord);

    order.updatedAt = new Date();
    
    // Mark as modified for nested objects
    order.markModified('adminToFarmerPayment');
    
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully',
      data: {
        orderId: order.orderId,
        paymentRecord,
        updatedPayment: order.adminToFarmerPayment
      }
    });
  } catch (error) {
    console.error('Error recording farmer payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error recording payment',
      error: error.message
    });
  }
};
module.exports = exports;
