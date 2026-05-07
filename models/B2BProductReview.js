// models/B2BProductReview.js
const mongoose = require("mongoose");

const b2bProductReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BProduct",
      required: true,
    },
    b2bUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BUser",
      required: true,
    },
    b2bUserName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true, maxlength: 100 },
    comment: { type: String, required: true, trim: true, maxlength: 1000 },
    images: [{ type: String }], // Images uploaded for review
    isVerifiedPurchase: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "B2BUser" }],
    replies: [
      {
        b2bUserId: { type: mongoose.Schema.Types.ObjectId, ref: "B2BUser" },
        b2bUserName: { type: String },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["active", "hidden", "reported"],
      default: "active",
    },
  },
  {
    timestamps: true,
    collection: "b2bproductreviews",
  },
);

// Ensure one review per user per product
b2bProductReviewSchema.index({ productId: 1, b2bUserId: 1 }, { unique: true });
b2bProductReviewSchema.index({ productId: 1, rating: -1 });
b2bProductReviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model("B2BProductReview", b2bProductReviewSchema);
