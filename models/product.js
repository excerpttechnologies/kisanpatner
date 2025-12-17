const mongoose = require('mongoose');

const gradePriceSchema = new mongoose.Schema({
  grade: {
    type: String,
    enum: ['A Grade', 'B Grade', 'All Mixed Grades'],
    required: true
  },
  pricePerUnit: {
    type: Number,
    required: true
  },
  totalQty: {
    type: Number,
    required: true
  }
});

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true
  },
  cropBriefDetails: {
    type: String,
    required: true
  },
  farmingType: {
    type: String,
    required: true
  },
  typeOfSeeds: {
    type: String,
    required: true
  },
  packagingType: {
    type: String,
    enum: ['KGs', 'box', 'crate', 'bunches', 'bag', 'sack', 'quanttal', 'ton'],
    required: true
  },
  packageMeasurement: {
    type: String,
    required: true
  },
  unitMeasurement: {
    type: String
  },
  gradePrices: [gradePriceSchema],
  deliveryDate: {
    type: Date,
    required: true
  },
  deliveryTime: {
    type: String,
    required: true
  },
  nearestMarket: {
    type: String,
    required: true
  },
  cropPhotos: [{
    type: String // Store file paths or URLs
  }],
  farmLocation: {
    lat: String,
    lng: String
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate productId before saving
productSchema.pre('save', async function() {
  if (!this.productId) {
    const Product = mongoose.model('Product');
    const count = await Product.countDocuments();
    this.productId = `PROD${String(count + 1).padStart(5, '0')}`;
  }
  this.updatedAt = Date.now();
});

// Create indexes
productSchema.index({ productId: 1 });
productSchema.index({ categoryId: 1 });
productSchema.index({ subCategoryId: 1 });
productSchema.index({ status: 1 });

module.exports = mongoose.model('Product', productSchema);