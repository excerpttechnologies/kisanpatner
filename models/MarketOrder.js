const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'MarketProduct' },
  name:      String,
  price:     Number,
  quantity:  Number,
  unit:      String,
  sellerId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const orderSchema = new mongoose.Schema({
  buyerId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:       [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'shipped', 'delivered'],
    default: 'pending',
  },
}, { timestamps: true });

orderSchema.index({ buyerId: 1 });
orderSchema.index({ 'items.sellerId': 1 });

module.exports = mongoose.model('MarketOrder', orderSchema);
