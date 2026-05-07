// // const mongoose = require('mongoose');

// // // ─── Simple B2B Cart ──────────────────────────────────────────────────────────
// // // Completely separate from other carts
// // // productId refs admin-created B2B products

// // const b2bCartSchema = new mongoose.Schema(
// //   {
// //     b2bUserId: {
// //       type:     mongoose.Schema.Types.ObjectId,
// //       ref:      'B2BUser',
// //       required: true,
// //     },
// //     productId: {
// //       type:     mongoose.Schema.Types.ObjectId,
// //       required: true,
// //       // Admin B2B products collection
// //     },
// //     productName:  { type: String, default: '' },
// //     price:        { type: Number, default: 0 },
// //     quantity:     { type: Number, required: true, min: 1 },
// //     unit:         { type: String, default: 'kg' },
// //     image:        { type: String, default: '' },
// //     categoryName: { type: String, default: '' },
// //   },
// //   {
// //     timestamps: true,
// //     collection: 'b2bcarts',
// //   }
// // );

// // // One entry per user per product
// // b2bCartSchema.index({ b2bUserId: 1, productId: 1 }, { unique: true });

// // module.exports = mongoose.model('B2BCart', b2bCartSchema);










// // models/B2BCart.js
// const mongoose = require("mongoose");

// const b2bCartSchema = new mongoose.Schema(
//   {
//     b2bUserId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "B2BUser",
//       required: true,
//     },
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "B2BProduct",
//       required: true,
//     },
//     productName: { type: String, default: "" },
//     price: { type: Number, default: 0 },
//     quantity: { type: Number, required: true, min: 1 },
//     maxQuantity: { type: Number, default: 0 }, // Store available stock
//     unit: { type: String, default: "kg" },
//     image: { type: String, default: "" },
//     categoryName: { type: String, default: "" },
//   },
//   {
//     timestamps: true,
//     collection: "b2bcarts",
//   },
// );

// // One entry per user per product
// b2bCartSchema.index({ b2bUserId: 1, productId: 1 }, { unique: true });

// module.exports = mongoose.model("B2BCart", b2bCartSchema);










// models/B2BCart.js
const mongoose = require("mongoose");

const b2bCartSchema = new mongoose.Schema(
  {
    b2bUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BUser",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BProduct",
      required: true,
    },
    productName: { type: String, default: "" },
    price: { type: Number, default: 0 },
    quantity: { type: Number, required: true, min: 1 },
    maxQuantity: { type: Number, default: 0 }, // Store available stock
    unit: { type: String, default: "kg" },
    image: { type: String, default: "" },
    categoryName: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "b2bcarts",
  },
);

// One entry per user per product
b2bCartSchema.index({ b2bUserId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("B2BCart", b2bCartSchema);







