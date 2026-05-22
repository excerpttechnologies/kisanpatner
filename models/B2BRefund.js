// models/B2BRefund.js - Fix the pre-save middleware

const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema(
  {
    refundId: { type: String, unique: true, required: true },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BOrder",
      required: true,
    },
    b2bUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BUser",
      required: true,
    },

    // Payment details
    razorpayPaymentId: { type: String, required: true },
    razorpayRefundId: { type: String },

    // Staff/Admin details
    approvedBy: { type: String, default: "" },
    processedBy: { type: String, default: "" },
    staffRemarks: { type: String, default: "" },

    // Refund details
    amount: { type: Number, required: true },
    refundAmount: { type: Number, required: true },
    reason: { type: String, required: true },
    description: { type: String },
    refundType: { type: String, enum: ["full", "partial"], default: "full" },

    // Refund items
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "B2BProduct" },
        productName: { type: String },
        quantity: { type: Number },
        price: { type: Number },
        subtotal: { type: Number },
        reason: { type: String },
      },
    ],

    // Status
    status: {
      type: String,
      enum: [
        "requested",
        "approved",
        "processing",
        "completed",
        "rejected",
        "cancelled",
        "failed",
      ],
      default: "requested",
    },

    // Transaction details
    transactionId: { type: String },
    refundMode: {
      type: String,
      enum: ["razorpay", "bank_transfer", "wallet", "manual"],
      default: "razorpay",
    },

    // Timestamps
    requestedAt: { type: Date, default: Date.now },
    approvedAt: { type: Date },
    processedAt: { type: Date },
    completedAt: { type: Date },

    // Remarks
    userRemarks: { type: String },
    adminRemarks: { type: String },

    // Error tracking
    errorMessage: { type: String },
    retryCount: { type: Number, default: 0 },

    // Metadata
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
);

// Indexes
refundSchema.index({ refundId: 1 });
refundSchema.index({ orderId: 1 });
refundSchema.index({ b2bUserId: 1 });
refundSchema.index({ status: 1 });
refundSchema.index({ createdAt: -1 });

refundSchema.pre("save", async function () {
  if (!this.refundId) {
    const date = new Date();

    const year = date.getFullYear().toString().slice(-2);

    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    this.refundId = `REF${year}${month}${random}`;
  }
});

module.exports =
  mongoose.models.B2BRefund || mongoose.model("B2BRefund", refundSchema);
