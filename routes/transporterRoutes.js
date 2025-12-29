const express = require("express");
const router = express.Router();
const transporterController = require("../controllers/transportercontroller");

// Get eligible orders for transporter (both accepted + future delivery)
router.get(
  "/eligible-orders",
  transporterController.getEligibleOrdersForTransporter
);

// Accept order by transporter
router.post("/:orderId/accept", transporterController.acceptOrderByTransporter);

// Reject order by transporter
router.post("/:orderId/reject", transporterController.rejectOrderByTransporter);

// Get transporter's accepted orders
router.get(
  "/:transporterId/orders",
  transporterController.getTransporterOrders
);

module.exports = router;
