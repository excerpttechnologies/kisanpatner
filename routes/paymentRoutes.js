const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentcontroller");

// ONLY ONE ROUTE - Create Razorpay order
router.post("/create-razorpay-order", paymentController.createRazorpayOrder);

module.exports = router;
