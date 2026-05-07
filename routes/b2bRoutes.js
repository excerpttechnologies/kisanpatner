// routes/b2bRoutes.js
const express = require("express");
const router = express.Router();

// Middleware for authentication
const authenticateB2BUser = require("../middleware/B2Bauth");

// Controllers
const cartController = require("../controllers/b2bCartController");
const addressController = require("../controllers/b2bAddressController");
const orderController = require("../controllers/b2bOrderController");
const reviewController = require("../controllers/b2bProductReviewController");
const productLikeController = require("../controllers/b2bProductLikeController");

const chatController = require("../controllers/b2bChatController");

// ==================== CART ROUTES ====================
router.post("/cart/add", authenticateB2BUser, cartController.addToCart);
router.get("/cart", authenticateB2BUser, cartController.getCart);
router.put(
  "/cart/:cartItemId",
  authenticateB2BUser,
  cartController.updateCartItem,
);
router.delete(
  "/cart/:cartItemId",
  authenticateB2BUser,
  cartController.removeFromCart,
);
router.delete("/cart", authenticateB2BUser, cartController.clearCart);

// ==================== ADDRESS ROUTES ====================
router.post("/addresses", authenticateB2BUser, addressController.addAddress);
router.get("/addresses", authenticateB2BUser, addressController.getAddresses);
router.get(
  "/addresses/:addressId",
  authenticateB2BUser,
  addressController.getAddress,
);
router.put(
  "/addresses/:addressId",
  authenticateB2BUser,
  addressController.updateAddress,
);
router.delete(
  "/addresses/:addressId",
  authenticateB2BUser,
  addressController.deleteAddress,
);
router.patch(
  "/addresses/:addressId/default",
  authenticateB2BUser,
  addressController.setDefaultAddress,
);

// ==================== ORDER ROUTES ====================
router.post("/orders/create", authenticateB2BUser, orderController.createOrder);
router.post(
  "/orders/verify-payment",
  authenticateB2BUser,
  orderController.verifyPayment,
);
router.get("/orders", authenticateB2BUser, orderController.getMyOrders);
router.get(
  "/orders/:orderId",
  authenticateB2BUser,
  orderController.getOrderDetails,
);
router.post(
  "/orders/:orderId/cancel",
  authenticateB2BUser,
  orderController.cancelOrder,
);
router.get(
  "/payment-history",
  authenticateB2BUser,
  orderController.getPaymentHistory,
);

// ==================== REVIEW ROUTES ====================
router.post("/reviews", authenticateB2BUser, reviewController.addReview);
router.put(
  "/reviews/:reviewId",
  authenticateB2BUser,
  reviewController.updateReview,
);
router.delete(
  "/reviews/:reviewId",
  authenticateB2BUser,
  reviewController.deleteReview,
);
router.get("/products/:productId/reviews", reviewController.getProductReviews);
router.post(
  "/reviews/:reviewId/like",
  authenticateB2BUser,
  reviewController.toggleLikeReview,
);
router.post(
  "/reviews/:reviewId/reply",
  authenticateB2BUser,
  reviewController.replyToReview,
);

// ==================== PRODUCT LIKE ROUTES ====================
// Like/Unlike a product
router.post(
  "/products/:productId/like",
  authenticateB2BUser,
  productLikeController.likeProduct,
);
router.delete(
  "/products/:productId/like",
  authenticateB2BUser,
  productLikeController.unlikeProduct,
);
router.patch(
  "/products/:productId/toggle-like",
  authenticateB2BUser,
  productLikeController.toggleLikeProduct,
);

// Get liked products for current user
router.get(
  "/user/liked-products",
  authenticateB2BUser,
  productLikeController.getLikedProducts,
);

// Get liked products with filters
router.get(
  "/user/liked-products/filter",
  authenticateB2BUser,
  productLikeController.getLikedProductsWithFilters,
);

// Check like status for a product
router.get(
  "/products/:productId/like-status",
  authenticateB2BUser,
  productLikeController.checkLikeStatus,
);

// Get product like statistics
router.get(
  "/products/:productId/like-stats",
  authenticateB2BUser,
  productLikeController.getProductLikeStats,
);

// Bulk like/unlike products
router.post(
  "/products/bulk-like",
  authenticateB2BUser,
  productLikeController.bulkLikeProducts,
);

// ==================== AI CHAT SUPPORT ROUTES ====================
// Chat support endpoints
router.post("/chat/send", authenticateB2BUser, chatController.sendMessage);
router.get("/chat/history", authenticateB2BUser, chatController.getChatHistory);
router.delete(
  "/chat/clear",
  authenticateB2BUser,
  chatController.clearChatHistory,
);
router.post(
  "/chat/end-session",
  authenticateB2BUser,
  chatController.endChatSession,
);
router.get(
  "/chat/suggestions",
  authenticateB2BUser,
  chatController.getSuggestedQuestions,
);

module.exports = router;
