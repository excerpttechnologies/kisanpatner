const express = require("express");
const router = express.Router();
const orderController = require("../controllers/ordercontroller");
const Order = require("../models/order");
const markettotradertransport = require("../controllers/markettotradertransport");

// =============================
// ✅ STATIC ROUTES FIRST
// =============================

// Get pending orders for farmer (trader accepted, farmer not accepted)
router.get('/farmer-pending/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;

    // Get existing pending orders
    const pendingOrders = await Order.find({
      farmerId: farmerId,
      traderAcceptedStatus: true,
      farmerAcceptedStatus: false
    }).sort({ createdAt: -1 });

    // GET PRODUCTS WITH PENDING PURCHASE HISTORY
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
      pendingPurchases: productsWithPendingPurchases
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

// Get all orders (admin)
router.get("/", orderController.getAllOrders);

// =============================
// ✅ TRANSPORT ROUTES
// (ALWAYS ABOVE PARAM ROUTES)
// =============================

router.get("/market-to-trader/eligible", markettotradertransport.getEligibleOrdersForTransporter);
router.post("/market-to-trader/accept", markettotradertransport.acceptTransportOffer);
router.post("/market-to-trader/reject", markettotradertransport.rejectTransportOffer);
router.post("/market-to-trader/start-journey", markettotradertransport.startJourney);
router.post("/market-to-trader/complete-journey", markettotradertransport.completeJourney);
router.get("/market-to-trader/admin", markettotradertransport.getAdminTransportOrders);
router.post("/market-to-trader/admin/assign", markettotradertransport.assignTransporter);
router.post("/market-to-trader/admin/expire-key", markettotradertransport.expireKey);
router.get("/trader/:traderId/transport", markettotradertransport.getTraderTransportOrders);
router.post("/market-to-trader/trader/generate-key", markettotradertransport.generateDeliveryKey);
router.get("/locations/pickup", markettotradertransport.getPickupLocationDetails);
router.get("/locations/delivery/:traderId", markettotradertransport.getDeliveryLocationDetails);
router.get("/transporter/:transporterId/accepted", markettotradertransport.getTransporterAcceptedOrders);

// =============================
// ✅ PARAM ROUTES LAST (VERY IMPORTANT)
// =============================

// Transporter actions on an order
router.post("/:orderId/transporter-accept", orderController.transporterAcceptOrder);
router.post("/:orderId/admin-select-transporter", orderController.adminSelectTransporter);
router.post("/:orderId/start-journey", orderController.transporterStartJourney);
router.post("/:orderId/complete-delivery", orderController.completeDeliveryByTransporter);

// Payment routes
router.post("/:orderId/payment", orderController.addPaymentToOrder);
router.post("/:orderId/farmer-payment", orderController.addAdminToFarmerPayment);
router.post("/:orderId/generate-trader-key", orderController.generateTraderDeliveryKey);
router.put("/:orderId/admin-update-payment", orderController.adminUpdatePaymentStatus);

// Update order status
router.patch("/:orderId/status", orderController.updateOrderStatus);

// Get single order by orderId (KEEP THIS LAST among GET /:orderId routes)
router.get("/:orderId", orderController.getOrderById);

module.exports = router;
