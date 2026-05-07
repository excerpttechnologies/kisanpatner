// models/B2BPaymentHistory.js
const mongoose = require("mongoose");

const b2bPaymentHistorySchema = new mongoose.Schema(
  {
    b2bUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BUser",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BOrder",
      required: true,
    },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["created", "attempted", "success", "failed"],
      default: "created",
    },
    paymentMethod: { type: String },
    errorMessage: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
    refundStatus: {
      type: String,
      enum: ["none", "pending", "completed", "failed"],
      default: "none",
    },
    refundAmount: { type: Number, default: 0 },
    refundId: { type: String },
  },
  {
    timestamps: true,
    collection: "b2bpaymenthistories",
  },
);

b2bPaymentHistorySchema.index({ b2bUserId: 1 });
b2bPaymentHistorySchema.index({ orderId: 1 });
b2bPaymentHistorySchema.index({ razorpayOrderId: 1 });

module.exports = mongoose.model("B2BPaymentHistory", b2bPaymentHistorySchema);
