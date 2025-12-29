const express = require("express");
const router = express.Router();
const adminOrderController = require("../controllers/adminordercontroller");

// Get all orders for admin (with filters)
router.get("/orders", adminOrderController.getAllOrdersForAdmin);

// Get single order details
router.get("/orders/:orderId", adminOrderController.getOrderDetails);

// Confirm transportation and goods
router.post(
  "/orders/:orderId/confirm-transportation",
  adminOrderController.confirmTransportation
);

// Update transportation verification
router.patch(
  "/orders/:orderId/verification",
  adminOrderController.updateTransportationVerification
);

module.exports = router;
