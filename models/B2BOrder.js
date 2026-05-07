// const mongoose = require('mongoose');

// // ─── Simple B2B Order ─────────────────────────────────────────────────────────
// // Completely separate from other orders

// const b2bOrderItemSchema = new mongoose.Schema({
//   productId:   { type: mongoose.Schema.Types.ObjectId },
//   productName: { type: String },
//   price:       { type: Number },
//   quantity:    { type: Number },
//   unit:        { type: String },
//   image:       { type: String },
//   categoryName:{ type: String },
//   subtotal:    { type: Number },
// });

// const b2bOrderSchema = new mongoose.Schema(
//   {
//     b2bUserId: {
//       type:     mongoose.Schema.Types.ObjectId,
//       ref:      'B2BUser',
//       required: true,
//     },
//     items:       [b2bOrderItemSchema],
//     totalAmount: { type: Number, required: true },
//     status: {
//       type:    String,
//       enum:    ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
//       default: 'pending',
//     },
//   },
//   {
//     timestamps: true,
//     collection: 'b2borders',
//   }
// );

// b2bOrderSchema.index({ b2bUserId: 1 });

// module.exports = mongoose.model('B2BOrder', b2bOrderSchema);







// models/B2BOrder.js
const mongoose = require("mongoose");

const b2bOrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "B2BProduct",
    required: true,
  },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unit: { type: String, default: "kg" },
  image: { type: String, default: "" },
  categoryName: { type: String, default: "" },
  subtotal: { type: Number, required: true },
});

const paymentDetailsSchema = new mongoose.Schema({
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  amount: { type: Number },
  currency: { type: String, default: "INR" },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  paymentMethod: { type: String, default: "razorpay" },
  paidAt: { type: Date },
});

const b2bOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true }, // Human readable order ID
    b2bUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BUser",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BAddress",
      required: true,
    },
    addressSnapshot: {
      fullName: String,
      phoneNumber: String,
      addressLine1: String,
      addressLine2: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    items: [b2bOrderItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "pending",
    },
    statusHistory: [
      {
        status: { type: String },
        note: { type: String },
        updatedBy: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    paymentDetails: paymentDetailsSchema,
    trackingDetails: {
      courierName: { type: String },
      trackingNumber: { type: String },
      trackingUrl: { type: String },
      estimatedDelivery: { type: Date },
    },
    cancellationReason: { type: String },
    notes: { type: String },
  },
  {
    timestamps: true,
    collection: "b2borders",
  },
);

// Generate order ID before saving
b2bOrderSchema.pre("save", async function () {
  if (!this.orderId) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    this.orderId = `B2B${year}${month}${random}`;
  }
});

// Add status change to history
b2bOrderSchema.methods.updateStatus = async function (
  newStatus,
  note = "",
  updatedBy = "system",
) {
  this.statusHistory.push({
    status: newStatus,
    note: note,
    updatedBy: updatedBy,
    timestamp: new Date(),
  });
  this.status = newStatus;
  await this.save();
};

b2bOrderSchema.index({ b2bUserId: 1 });
b2bOrderSchema.index({ orderId: 1 });
b2bOrderSchema.index({ status: 1 });
b2bOrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("B2BOrder", b2bOrderSchema);


