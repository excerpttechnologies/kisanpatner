const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'MarketProduct', required: true },
  quantity:  { type: Number, required: true, min: 1 },
}, { timestamps: true });

cartItemSchema.index({ userId: 1 });

module.exports = mongoose.model('CartItem', cartItemSchema);
