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

// Create new order (Trader side)
router.post("/create", orderController.createOrder);

// Farmer accepts order
router.post("/farmer-accept", orderController.farmerAcceptOrder);

// Get trader's orders
router.get("/trader/:traderId", orderController.getTraderOrders);

// Get farmer's orders
router.get("/farmer/:farmerId", orderController.getFarmerOrders);

// Get single order by orderId
router.get("/:orderId", orderController.getOrderById);

// Add payment to existing order (Trader to Admin)
router.post("/:orderId/payment", orderController.addPaymentToOrder);

// Add payment from Admin to Farmer
router.post(
  "/:orderId/farmer-payment",
  orderController.addAdminToFarmerPayment
);

// Update order status
router.patch("/:orderId/status", orderController.updateOrderStatus);

// Get all orders (admin)
router.get("/", orderController.getAllOrders);

module.exports = router;
