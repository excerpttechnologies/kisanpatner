const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  categoryId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategoryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  price:        { type: Number, required: true, min: 0 },
  quantity:     { type: Number, required: true, min: 0 },
  unit:         { type: String, enum: ['kg', 'quintal', 'ton'], default: 'kg' },
  description:  String,
  images:       [String],
  location: {
    state: String, district: String, taluk: String, village: String,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive:  { type: Boolean, default: true },
}, { timestamps: true });

productSchema.index({ categoryId: 1 });
productSchema.index({ 'location.district': 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('MarketProduct', productSchema);
