// const express = require("express");
// const router = express.Router();
// const orderController = require("../controllers/ordercontroller");

// // Create new order
// router.post("/create", orderController.createOrder);

// // Get trader's orders
// router.get("/trader/:traderId", orderController.getTraderOrders);

// // Get single order by orderId
// router.get("/:orderId", orderController.getOrderById);

// // Add payment to existing order
// router.post("/:orderId/payment", orderController.addPaymentToOrder);

// // Update farmer acceptance status
// router.patch("/:orderId/farmer-status", orderController.updateFarmerStatus);

// // Update order status
// router.patch("/:orderId/status", orderController.updateOrderStatus);

// // Get all orders (admin)
// router.get("/", orderController.getAllOrders);

// module.exports = router;

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/ordercontroller");
const Order = require("../models/order");
// Get pending orders for farmer (trader accepted, farmer not accepted)
// router.get('/farmer-pending/:farmerId', async (req, res) => {
//   try {
//     const { farmerId } = req.params;
    
//     const pendingOrders = await Order.find({
//       farmerId: farmerId,
//       traderAcceptedStatus: true,
//       farmerAcceptedStatus: false
//     }).sort({ createdAt: -1 });
    
//     res.json({
//       success: true,
//       orders: pendingOrders
//     });
//   } catch (error) {
//     console.error('Error fetching pending orders:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch pending orders'
//     });
//   }
// });

router.get('/farmer-pending/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    
    // Get existing pending orders
    const pendingOrders = await Order.find({
      farmerId: farmerId,
      traderAcceptedStatus: true,
      farmerAcceptedStatus: false
    }).sort({ createdAt: -1 });
    
    // 🔥 GET PRODUCTS WITH PENDING PURCHASE HISTORY
    const Product = require('../models/product');
    
    const productsWithPendingPurchases = await Product.find({
      farmerId: farmerId,
      'gradePrices.purchaseHistory.orderCreated': false
    })
    .populate('categoryId')
    .populate('subCategoryId');
    
    res.json({
      success: true,
      orders: pendingOrders,
      pendingPurchases: productsWithPendingPurchases // 🔥 NEW FIELD
    });
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending orders'
    });
  }
});
// Create new order (Trader side)
router.post("/create", orderController.createOrder);

// Farmer accepts order
router.post("/farmer-accept", orderController.farmerAcceptOrder);

// Get trader's orders
router.get("/trader/:traderId", orderController.getTraderOrders);

// Get farmer's orders
router.get("/farmer/:farmerId", orderController.getFarmerOrders);
router.post("/:orderId/transporter-accept",orderController.transporterAcceptOrder);

router.post(
  "/:orderId/admin-select-transporter",
  orderController.adminSelectTransporter
);

router.post("/:orderId/start-journey", orderController.transporterStartJourney);

router.post( "/:orderId/complete-delivery",
  orderController.completeDeliveryByTransporter
);

// Get single order by orderId
router.get("/:orderId", orderController.getOrderById);

// Add payment to existing order (Trader to Admin)
router.post("/:orderId/payment", orderController.addPaymentToOrder);

// Add payment from Admin to Farmer
router.post(
  "/:orderId/farmer-payment",
  orderController.addAdminToFarmerPayment
);


//new route
router.post("/:orderId/generate-trader-key", orderController.generateTraderDeliveryKey);
router.put("/:orderId/admin-update-payment", orderController.adminUpdatePaymentStatus);

// Update order status
router.patch("/:orderId/status", orderController.updateOrderStatus);

// Get all orders (admin)
router.get("/", orderController.getAllOrders);

module.exports = router;
