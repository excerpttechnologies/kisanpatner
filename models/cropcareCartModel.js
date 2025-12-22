// const mongoose = require('mongoose');

// const cartItemSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'Product'
//   },
//   productName: {
//     type: String,
//     required: true
//   },
//   seedId: {
//     type: String,
//     required: true
//   },
//   seedName: {
//     type: String,
//     required: true
//   },
//   seedPrice: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//     default: 1
//   },
//   image: {
//     type: String
//   },
//   addedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const cartSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true
//   },
//   items: [cartItemSchema],
//   subtotal: {
//     type: Number,
//     default: 0
//   },
//   gst: {
//     type: Number,
//     default: 0
//   },
//   shipping: {
//     type: Number,
//     default: 0
//   },
//   total: {
//     type: Number,
//     default: 0
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// // Calculate totals before saving
// cartSchema.pre('save', function(next) {
//   this.subtotal = this.items.reduce((sum, item) => {
//     return sum + (item.seedPrice * item.quantity);
//   }, 0);
  
//   this.gst = this.subtotal * 0.18; // 18% GST
//   this.shipping = this.subtotal > 500 ? 0 : 50; // Free shipping above ₹500
//   this.total = this.subtotal + this.gst + this.shipping;
//   this.updatedAt = Date.now();
//   next();
// });

// // Update the model name to CropCareCart
// const CropCareCart = mongoose.model('CropCareCart', cartSchema);
// module.exports = CropCareCart;





const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  seedId: String,
  seedName: String,
  seedPrice: Number,
  quantity: { type: Number, default: 1 },
  image: String,
  addedAt: { type: Date, default: Date.now }
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
  subtotal: { type: Number, default: 0 },
  gst: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
}, { timestamps: true });

// NO PRE-SAVE HOOK - calculations done in controller

const CropCareCart = mongoose.model('CropCareCart', cartSchema);
module.exports = CropCareCart;