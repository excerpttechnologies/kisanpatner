const express = require("express");
const router = express.Router();
const adminOrderController = require("../controllers/adminordercontroller");

// Get all orders for admin (with filters)
router.get("/orders", adminOrderController.getAllOrdersForAdmin);

// Get single order details
router.get("/orders/:orderId", adminOrderController.getOrderDetails);
router.get('/orders/:orderId/details', adminOrderController.getOrderDetails);
router.patch('/orders/:orderId/update', adminOrderController.updateOrderDetails);
// Confirm transportation and goods
router.post(
  "/orders/:orderId/confirm-transportation",
  adminOrderController.confirmTransportation
);
// Record manual payment to farmer
router.post('/orders/:orderId/farmer-payment', adminOrderController.recordFarmerPayment);

// Update transportation verification
router.patch(
  "/orders/:orderId/verification",
  adminOrderController.updateTransportationVerification
);

module.exports = router;
