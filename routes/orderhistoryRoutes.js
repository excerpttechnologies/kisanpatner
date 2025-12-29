const express = require("express");
const router = express.Router();
const orderHistoryController = require("../controllers/orderhistory");

// Get farmer order history
router.get("/farmer/:farmerId", orderHistoryController.getFarmerOrderHistory);

// Get trader order history
router.get("/trader/:traderId", orderHistoryController.getTraderOrderHistory);

// Get single order details
router.get("/details/:orderId", orderHistoryController.getOrderDetails);

// Create Razorpay order for trader payment
router.post(
  "/create-trader-payment",
  orderHistoryController.createTraderPaymentOrder
);

// Verify and update trader payment
router.post(
  "/verify-trader-payment",
  orderHistoryController.verifyTraderPayment
);

module.exports = router;
