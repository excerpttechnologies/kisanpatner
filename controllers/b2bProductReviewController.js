// // controllers/b2bProductReviewController.js
// const B2BProductReview = require("../models/B2BProductReview");
// const B2BOrder = require("../models/B2BOrder");
// const B2BProduct = require("../models/B2BProduct");
// const mongoose = require("mongoose");
// // Add review
// exports.addReview = async (req, res) => {
//   try {
//     const { productId, rating, title, comment, images } = req.body;
//     const b2bUserId = req.user.id;
//     const b2bUserName = req.user.businessName || req.user.name || "User";
//     console.log("Add review request:", {
//       productId,
//       rating,
//       title,
//       comment,
//       images,
//     });
//     // Check if user has purchased this product
//     const hasPurchased = await B2BOrder.findOne({
//       b2bUserId,
//       "items.productId": productId,
//       status: "delivered",
//     });

//     const isVerifiedPurchase = !!hasPurchased;

//     // Check if user already reviewed
//     const existingReview = await B2BProductReview.findOne({
//       productId,
//       b2bUserId,
//     });
//     if (existingReview) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already reviewed this product",
//       });
//     }

//     const review = await B2BProductReview.create({
//       productId,
//       b2bUserId,
//       b2bUserName,
//       rating,
//       title,
//       comment,
//       images: images || [],
//       isVerifiedPurchase,
//     });

//     // Update product average rating
//     await updateProductRating(productId);

//     res.status(201).json({
//       success: true,
//       message: "Review added successfully",
//       data: review,
//     });
//   } catch (error) {
//     console.error("Add review error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Update review
// exports.updateReview = async (req, res) => {
//   try {
//     const { reviewId } = req.params;
//     const { rating, title, comment, images } = req.body;
//     const b2bUserId = req.user.id;

//     const review = await B2BProductReview.findOne({ _id: reviewId, b2bUserId });
//     if (!review) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Review not found" });
//     }

//     if (rating) review.rating = rating;
//     if (title) review.title = title;
//     if (comment) review.comment = comment;
//     if (images) review.images = images;

//     await review.save();

//     // Update product average rating
//     await updateProductRating(review.productId);

//     res.status(200).json({
//       success: true,
//       message: "Review updated successfully",
//       data: review,
//     });
//   } catch (error) {
//     console.error("Update review error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Delete review
// exports.deleteReview = async (req, res) => {
//   try {
//     const { reviewId } = req.params;
//     const b2bUserId = req.user.id;

//     const review = await B2BProductReview.findOne({ _id: reviewId, b2bUserId });
//     if (!review) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Review not found" });
//     }

//     const productId = review.productId;
//     await review.deleteOne();

//     // Update product average rating
//     await updateProductRating(productId);

//     res.status(200).json({
//       success: true,
//       message: "Review deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete review error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get product reviews
// exports.getProductReviews = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { page = 1, limit = 10, rating } = req.query;

//     const query = { productId, status: "active" };
//     if (rating) query.rating = parseInt(rating);

//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const reviews = await B2BProductReview.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await B2BProductReview.countDocuments(query);

//     // Get rating distribution
//     const ratingDistribution = await B2BProductReview.aggregate([
//       {
//         $match: {
//           productId: mongoose.Types.ObjectId(productId),
//           status: "active",
//         },
//       },
//       { $group: { _id: "$rating", count: { $sum: 1 } } },
//       { $sort: { _id: 1 } },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: reviews,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / parseInt(limit)),
//       },
//       ratingDistribution,
//     });
//   } catch (error) {
//     console.error("Get reviews error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Like/Unlike review
// exports.toggleLikeReview = async (req, res) => {
//   try {
//     const { reviewId } = req.params;
//     const b2bUserId = req.user.id;

//     const review = await B2BProductReview.findById(reviewId);
//     if (!review) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Review not found" });
//     }

//     const likeIndex = review.likes.indexOf(b2bUserId);
//     if (likeIndex > -1) {
//       review.likes.splice(likeIndex, 1);
//       await review.save();
//       res
//         .status(200)
//         .json({ success: true, message: "Like removed", liked: false });
//     } else {
//       review.likes.push(b2bUserId);
//       await review.save();
//       res
//         .status(200)
//         .json({ success: true, message: "Like added", liked: true });
//     }
//   } catch (error) {
//     console.error("Toggle like error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Reply to review (admin/seller only)
// exports.replyToReview = async (req, res) => {
//   try {
//     const { reviewId } = req.params;
//     const { comment } = req.body;
//     const b2bUserId = req.user.id;
//     const b2bUserName = req.user.businessName || req.user.name || "Seller";

//     const review = await B2BProductReview.findById(reviewId);
//     if (!review) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Review not found" });
//     }

//     review.replies.push({
//       b2bUserId,
//       b2bUserName,
//       comment,
//     });

//     await review.save();

//     res.status(200).json({
//       success: true,
//       message: "Reply added successfully",
//       data: review,
//     });
//   } catch (error) {
//     console.error("Reply to review error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Helper function to update product rating
// async function updateProductRating(productId) {
//   const result = await B2BProductReview.aggregate([
//     {
//       $match: {
//         productId: mongoose.Types.ObjectId(productId),
//         status: "active",
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         avgRating: { $avg: "$rating" },
//         totalReviews: { $sum: 1 },
//       },
//     },
//   ]);

//   if (result.length > 0) {
//     await B2BProduct.findByIdAndUpdate(productId, {
//       averageRating: Math.round(result[0].avgRating * 10) / 10,
//       totalReviews: result[0].totalReviews,
//     });
//   }
// }













// controllers/b2bProductReviewController.js
const B2BProductReview = require("../models/B2BProductReview");
const B2BOrder = require("../models/B2BOrder");
const B2BProduct = require("../models/B2BProduct");
const mongoose = require("mongoose");

// Add review
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;
    const b2bUserId = req.user.id;
    const b2bUserName = req.user.businessName || req.user.name || "User";
    console.log("Add review request:", {
      productId,
      rating,
      title,
      comment,
    });
    // Check if user has purchased this product
    const hasPurchased = await B2BOrder.findOne({
      b2bUserId,
      "items.productId": productId,
      status: "delivered",
    });

    const isVerifiedPurchase = !!hasPurchased;

    // Check if user already reviewed
    const existingReview = await B2BProductReview.findOne({
      productId,
      b2bUserId,
    });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await B2BProductReview.create({
      productId,
      b2bUserId,
      b2bUserName,
      rating,
      title,
      comment,
      // images: images || [],
      isVerifiedPurchase,
    });

    // Update product average rating
    await updateProductRating(productId);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    console.error("Add review error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, title, comment, images } = req.body;
    const b2bUserId = req.user.id;

    const review = await B2BProductReview.findOne({ _id: reviewId, b2bUserId });
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (comment) review.comment = comment;
    if (images) review.images = images;

    await review.save();

    // Update product average rating
    await updateProductRating(review.productId);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    console.error("Update review error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const b2bUserId = req.user.id;

    const review = await B2BProductReview.findOne({ _id: reviewId, b2bUserId });
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    const productId = review.productId;
    await review.deleteOne();

    // Update product average rating
    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get product reviews
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("Get reviews for productId:", productId);
    const { page = 1, limit = 0, rating } = req.query;

    const query = { productId, status: "active" };
    if (rating) query.rating = parseInt(rating);

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reviews = await B2BProductReview.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await B2BProductReview.countDocuments(query);

    // Get rating distribution
    const ratingDistribution = await B2BProductReview.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
          status: "active",
        },
      },
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
      ratingDistribution,
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Like/Unlike review
exports.toggleLikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const b2bUserId = req.user.id;

    const review = await B2BProductReview.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    const likeIndex = review.likes.indexOf(b2bUserId);
    if (likeIndex > -1) {
      review.likes.splice(likeIndex, 1);
      await review.save();
      res
        .status(200)
        .json({ success: true, message: "Like removed", liked: false });
    } else {
      review.likes.push(b2bUserId);
      await review.save();
      res
        .status(200)
        .json({ success: true, message: "Like added", liked: true });
    }
  } catch (error) {
    console.error("Toggle like error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Reply to review (admin/seller only)
exports.replyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment } = req.body;
    const b2bUserId = req.user.id;
    const b2bUserName = req.user.businessName || req.user.name || "Seller";

    const review = await B2BProductReview.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    review.replies.push({
      b2bUserId,
      b2bUserName,
      comment,
    });

    await review.save();

    res.status(200).json({
      success: true,
      message: "Reply added successfully",
      data: review,
    });
  } catch (error) {
    console.error("Reply to review error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Helper function to update product rating
// async function updateProductRating(productId) {
//   const result = await B2BProductReview.aggregate([
//     {
//       $match: {
//         productId: new mongoose.Types.ObjectId(productId),
//         status: "active",
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         avgRating: { $avg: "$rating" },
//         totalReviews: { $sum: 1 },
//       },
//     },
//   ]);

//   if (result.length > 0) {
//     await B2BProduct.findByIdAndUpdate(productId, {
//       averageRating: Math.round(result[0].avgRating * 10) / 10,
//       totalReviews: result[0].totalReviews,
//     });
//   }
// }

async function updateProductRating(productId) {
  const result = await B2BProductReview.aggregate([
    {
      $match: {
        productId: new mongoose.Types.ObjectId(productId),
        status: "active",
      },
    },
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await B2BProduct.findByIdAndUpdate(productId, {
      averageRating: Math.round(result[0].avgRating * 10) / 10,
      totalReviews: result[0].totalReviews,
    });
  } else {
    await B2BProduct.findByIdAndUpdate(productId, {
      averageRating: 0,
      totalReviews: 0,
    });
  }
}
