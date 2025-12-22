const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  seedId: String,
  seedName: {
    type: String,
    required: true
  },
  seedPrice: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: String
});

const shippingAddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  villageGramaPanchayat: String,
  pincode: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  taluk: String,
  post: String,
  landmark: String
});

const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['razorpay', 'cod'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true  // Removed required: true - will be auto-generated
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  items: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  payment: paymentSchema,
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  subtotal: {
    type: Number,
    required: true
  },
  gst: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Generate unique order ID before saving
orderSchema.pre('save', async function() {
  if (!this.orderId) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Count orders for today to generate unique ID
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);
    
    const count = await this.constructor.countDocuments({
      createdAt: {
        $gte: todayStart,
        $lte: todayEnd
      }
    });
    
    this.orderId = `ORD-${year}${month}${day}-${String(count + 1).padStart(4, '0')}`;
  }
});

module.exports = mongoose.model('CropcareOrder', orderSchema);