

// const mongoose = require("mongoose");

// const productItemSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: String,
//       required: true,
//     },
//     farmerId: {
//       type: String,
//       required: true,
//     },
//     grade: {
//       type: String,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     pricePerUnit: {
//       type: Number,
//       required: true,
//     },
//     deliveryDate: {
//       type: Date,
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//      nearestMarket: {  // 🔥 ADD THIS FIELD
//       type: String,
//       //required: true,
//     },
//   },
//   { _id: true }
// );



// const paymentRecordSchema = new mongoose.Schema(
//   {
//     amount: {
//       type: Number,
//       required: true,
//     },
//     paidDate: {
//       type: Date,
//       default: Date.now,
//     },
//     paymentMethod: {
//       type: String,
//       enum: ['cash', 'bank_transfer', 'upi', 'cheque', 'razorpay', 'other'],
//       default: 'cash'
//     },
//     paymentReference: String,
//     paymentNotes: String,
//     paidBy: String,
//     paidByName: String,
//     razorpayPaymentId: String,
//     razorpayOrderId: String,
//     razorpaySignature: String,
//     isReadByTrader: {
//       type: Boolean,
//       default: false
//     },
//     traderNotificationReadAt: Date
//   },
//   { _id: true }
// );

// const traderToAdminPaymentSchema = new mongoose.Schema(
//   {
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paidAmount: {
//       type: Number,
//       default: 0,
//     },
//     remainingAmount: {
//       type: Number,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "partial", "paid"],
//       default: "pending",
//     },
//     paymentHistory: [paymentRecordSchema],
//     fees: {
//       labourFee: { type: Number, default: 0 },
//       transportFee: { type: Number, default: 0 }
//     },
//      lastStatusChangeReadByTrader: {
//       type: Boolean,
//       default: false
//     },
//     lastStatusChangeDate: Date
//   },
//   { _id: false }
// );

// const adminToFarmerPaymentSchema = new mongoose.Schema(
//   {
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paidAmount: {
//       type: Number,
//       default: 0,
//     },
//     remainingAmount: {
//       type: Number,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "partial", "paid"],
//       default: "pending",
//     },
//     paymentHistory: [paymentRecordSchema],
//     fees: {
//       labourFee: { type: Number, default: 0 },
//       transportFee: { type: Number, default: 0 },
//       advanceAmount: { type: Number, default: 0 }
//     }
//   },
//   { _id: false }
// );

// const transporterDetailsSchema = new mongoose.Schema(
//   {
//     transporterId: {
//       type: String,
//       required: true,
//     },
//     transporterName: {
//       type: String,
//       required: true,
//     },
//     transporterMobile: String,
//     transporterEmail: String,
//     vehicleType: String,
//     vehicleNumber: String,
//     vehicleCapacity: String,
//     driverName: String,
//     driverMobile: String,
//     acceptedAt: {
//       type: Date,
//       default: Date.now,
//     },
//     // VERIFICATION FIELDS
//     transporterReached: {
//       type: Boolean,
//       default: false,
//     },
//     goodsConditionCorrect: {
//       type: Boolean,
//       default: false,
//     },
//     quantityCorrect: {
//       type: Boolean,
//       default: false,
//     },
//     adminNotes: {
//       type: String,
//       default: "",
//     },
//     verifiedBy: {
//       type: String,
//       default: "",
//     },
//     verifiedByName: {
//       type: String,
//       default: "",
//     },
//     verifiedAt: {
//       type: Date,
//     },
//   },
//   { _id: false }
// );

// const orderSchema = new mongoose.Schema({
//   orderId: {
//     type: String,
//    // unique: true,
//   },
//   traderId: {
//     type: String,
//     required: true,
//   },
//   traderName: {
//     type: String,
//     required: true,
//   },
//   traderMobile: String,
//   traderEmail: String,
//   farmerId: {
//     type: String,
//     required: true,
//   },
//   farmerName: String,
//   farmerMobile: String,
//   farmerEmail: String,
//   productItems: [productItemSchema],
//   traderToAdminPayment: traderToAdminPaymentSchema,
//   adminToFarmerPayment: adminToFarmerPaymentSchema,
//   traderAcceptedStatus: {
//     type: Boolean,
//     default: true,
//   },
//   farmerAcceptedStatus: {
//     type: Boolean,
//     default: false,
//   },
//   adminPickupKey: { type: String },

// traderDeliveryKey: { type: String },
//   transporterStatus: {
//     type: String,
//     enum: ["pending", "accepted", "rejected", "completed"],
//     default: "pending",
//   },
//   transporterDetails: transporterDetailsSchema,
//   orderStatus: {
//     type: String,
//     enum: ["pending", "processing", "in_transit", "completed", "cancelled"],
//     default: "pending",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   nearestMarket: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Market",
// },


// adminPickupKey: { type: String },

// traderDeliveryKey: { type: String },

// deliveryStatus: {
//   type: String,
//   enum: ["pending", "in-transit", "delivered"],
//   default: "pending",
// },

// transporterStatus: {
//   type: String,
//   enum: ["pending", "accepted", "approved", "started", "completed"],
//   default: "pending",
// },

// transporterDetails: transporterDetailsSchema,

// });




// // Auto-generate orderId before saving
// orderSchema.pre("save", async function () {
//   if (!this.orderId) {
//     const Order = mongoose.model("Order");
//     const count = await Order.countDocuments();
//     this.orderId = `ORD${String(count + 1).padStart(6, "0")}`;
//   }

//   this.updatedAt = Date.now();
// });

// // Create indexes
// // orderSchema.index({ orderId: 1 });
// orderSchema.index({ traderId: 1 });
// orderSchema.index({ farmerId: 1 });
// orderSchema.index({ orderStatus: 1 });
// orderSchema.index({ transporterStatus: 1 });
// orderSchema.index({ createdAt: -1 });

// module.exports = mongoose.model("Order", orderSchema);



//vps

// const mongoose = require("mongoose");

// const productItemSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: String,
//       required: true,
//     },
//     farmerId: {
//       type: String,
//       required: true,
//     },
//     grade: {
//       type: String,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     pricePerUnit: {
//       type: Number,
//       required: true,
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//   },
//   { _id: true }
// );

// const paymentRecordSchema = new mongoose.Schema(
//   {
//     amount: {
//       type: Number,
//       required: true,
//     },
//     paidDate: {
//       type: Date,
//       default: Date.now,
//     },
//     razorpayPaymentId: String,
//     razorpayOrderId: String,
//     razorpaySignature: String,
//   },
//   { _id: true }
// );

// const traderToAdminPaymentSchema = new mongoose.Schema(
//   {
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paidAmount: {
//       type: Number,
//       default: 0,
//     },
//     remainingAmount: {
//       type: Number,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "partial", "paid"],
//       default: "pending",
//     },
//     paymentHistory: [paymentRecordSchema],
//   },
//   { _id: false }
// );

// const orderSchema = new mongoose.Schema({
//   orderId: {
//     type: String,
//     unique: true,
//   },
//   traderId: {
//     type: String,
//     required: true,
//   },
//   traderName: {
//     type: String,
//     required: true,
//   },
//   traderMobile: String,
//   traderEmail: String,
//   productItems: [productItemSchema],
//   traderToAdminPayment: traderToAdminPaymentSchema,
//   traderAcceptedStatus: {
//     type: Boolean,
//     default: true,
//   },
//   farmerAcceptedStatus: {
//     type: Boolean,
//     default: false,
//   },
//   orderStatus: {
//     type: String,
//     enum: ["pending", "processing", "completed", "cancelled"],
//     default: "pending",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Auto-generate orderId before saving
// orderSchema.pre("save", async function () {
//   if (!this.orderId) {
//     const Order = mongoose.model("Order");
//     const count = await Order.countDocuments();
//     this.orderId = `ORD${String(count + 1).padStart(6, "0")}`;
//   }

//   this.updatedAt = Date.now();
// });

// // Create indexes
// orderSchema.index({ orderId: 1 });
// orderSchema.index({ traderId: 1 });
// orderSchema.index({ orderStatus: 1 });
// orderSchema.index({ createdAt: -1 });

// module.exports = mongoose.model("Order", orderSchema);

// const mongoose = require("mongoose");

// const productItemSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: String,
//       required: true,
//     },
//     farmerId: {
//       type: String,
//       required: true,
//     },
//     grade: {
//       type: String,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     pricePerUnit: {
//       type: Number,
//       required: true,
//     },
//     deliveryDate: {
//       type: Date,
//       //required: true,
//     },

//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//   },
//   { _id: true }
// );

// const paymentRecordSchema = new mongoose.Schema(
//   {
//     amount: {
//       type: Number,
//       required: true,
//     },
//     paidDate: {
//       type: Date,
//       default: Date.now,
//     },
//     razorpayPaymentId: String,
//     razorpayOrderId: String,
//     razorpaySignature: String,
//   },
//   { _id: true }
// );

// const traderToAdminPaymentSchema = new mongoose.Schema(
//   {
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paidAmount: {
//       type: Number,
//       default: 0,
//     },
//     remainingAmount: {
//       type: Number,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "partial", "paid"],
//       default: "pending",
//     },
//     paymentHistory: [paymentRecordSchema],
//   },
//   { _id: false }
// );

// // NEW: Admin to Farmer Payment Schema
// const adminToFarmerPaymentSchema = new mongoose.Schema(
//   {
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paidAmount: {
//       type: Number,
//       default: 0,
//     },
//     remainingAmount: {
//       type: Number,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "partial", "paid"],
//       default: "pending",
//     },
//     paymentHistory: [paymentRecordSchema],
//   },
//   { _id: false }
// );

// const orderSchema = new mongoose.Schema({
//   orderId: {
//     type: String,
//     unique: true,
//   },
//   traderId: {
//     type: String,
//     required: true,
//   },
//   traderName: {
//     type: String,
//     required: true,
//   },
//   traderMobile: String,
//   traderEmail: String,
//   farmerId: {
//     type: String,
//     required: true,
//   },
//   farmerName: String,
//   farmerMobile: String,
//   farmerEmail: String,
//   productItems: [productItemSchema],
//   traderToAdminPayment: traderToAdminPaymentSchema,
//   adminToFarmerPayment: adminToFarmerPaymentSchema, // NEW
//   traderAcceptedStatus: {
//     type: Boolean,
//     default: true,
//   },
//   farmerAcceptedStatus: {
//     type: Boolean,
//     default: false,
//   },
//   orderStatus: {
//     type: String,
//     enum: ["pending", "processing", "completed", "cancelled"],
//     default: "pending",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// orderSchema.pre("save", async function () {
//   if (!this.orderId) {
//     const Order = mongoose.model("Order");
//     const count = await Order.countDocuments();
//     this.orderId = `ORD${String(count + 1).padStart(6, "0")}`;
//   }

//   this.updatedAt = Date.now();
// });

// // Create indexes
// orderSchema.index({ orderId: 1 });
// orderSchema.index({ traderId: 1 });
// orderSchema.index({ farmerId: 1 });
// orderSchema.index({ orderStatus: 1 });
// orderSchema.index({ createdAt: -1 });

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");
const marketToTraderTransportSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  transporterId: String,
  transporterName: String,
  transporterMobile: String,
  pickupLocation: {
    address: String,
    marketId: String,
    marketName: String
  },
  deliveryLocation: {
    address: String,
    traderId: String,
    traderName: String
  },
  pickupKey: String, // Admin generated
  deliveryKey: String, // Trader generated
  pickupKeyEnteredAt: Date,
  deliveryKeyEnteredAt: Date,
  journeyStartedAt: Date,
  journeyCompletedAt: Date,
  adminSelectedTransporter: String,
  adminGeneratedKey: String,
  transporterNotes: String,
  adminNotes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const productItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    farmerId: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: Date,
    },
    totalAmount: {
      type: Number,
      required: true,
    },quantitySentByFarmer: {
      type: Number,
      default: 0,
    },
    farmerMarketTransportStatus: {
      type: Boolean,
      default: false, // false = not sent, true = sent
    },
    farmerSentDate: {
      type: Date,
    },
    farmerNotes: {
      type: String,
      default: "",
    },
     nearestMarket: {  // 🔥 ADD THIS FIELD
      type: String,
      //required: true,
    },
  },
  { _id: true }
);



const paymentRecordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    paidDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'bank_transfer', 'upi', 'cheque', 'razorpay', 'other'],
      default: 'cash'
    },
    paymentReference: String,
    paymentNotes: String,
    paidBy: String,
    paidByName: String,
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String,
    isReadByTrader: {
      type: Boolean,
      default: false
    },
    traderNotificationReadAt: Date
  },
  { _id: true }
);

const traderToAdminPaymentSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending",
    },
    paymentHistory: [paymentRecordSchema],
    fees: {
      labourFee: { type: Number, default: 0 },
      transportFee: { type: Number, default: 0 }
    },
     lastStatusChangeReadByTrader: {
      type: Boolean,
      default: false
    },
    lastStatusChangeDate: Date
  },
  { _id: false }
);

const adminToFarmerPaymentSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending",
    },
    paymentHistory: [paymentRecordSchema],
    fees: {
      labourFee: { type: Number, default: 0 },
      transportFee: { type: Number, default: 0 },
      advanceAmount: { type: Number, default: 0 }
    }
  },
  { _id: false }
);

const transporterDetailsSchema = new mongoose.Schema(
  {
    transporterId: {
      type: String,
      required: true,
    },
    transporterName: {
      type: String,
      required: true,
    },
    transporterMobile: String,
    transporterEmail: String,
    vehicleType: String,
    vehicleNumber: String,
    vehicleCapacity: String,
    driverName: String,
    driverMobile: String,
    acceptedAt: {
      type: Date,
      default: Date.now,
    },
    // VERIFICATION FIELDS
    transporterReached: {
      type: Boolean,
      default: false,
    },
    goodsConditionCorrect: {
      type: Boolean,
      default: false,
    },
    quantityCorrect: {
      type: Boolean,
      default: false,
    },
    adminNotes: {
      type: String,
      default: "",
    },
    verifiedBy: {
      type: String,
      default: "",
    },
    verifiedByName: {
      type: String,
      default: "",
    },
    verifiedAt: {
      type: Date,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
   // unique: true,
  },
  traderId: {
    type: String,
    required: true,
  },
  traderName: {
    type: String,
    required: true,
  },
  traderMobile: String,
  traderEmail: String,
  farmerId: {
    type: String,
    required: true,
  },
  farmerName: String,
  farmerMobile: String,
  farmerEmail: String,
  productItems: [productItemSchema],
  traderToAdminPayment: traderToAdminPaymentSchema,
  adminToFarmerPayment: adminToFarmerPaymentSchema,
  marketToTraderTransport: marketToTraderTransportSchema,
  traderAcceptedStatus: {
    type: Boolean,
    default: true,
  },
  farmerAcceptedStatus: {
    type: Boolean,
    default: false,
  },
  adminPickupKey: { type: String },

traderDeliveryKey: { type: String },
  transporterStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
  transporterDetails: transporterDetailsSchema,
  orderStatus: {
    type: String,
    enum: ["pending", "processing", "in_transit", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  nearestMarket: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Market",
},


adminPickupKey: { type: String },

traderDeliveryKey: { type: String },

deliveryStatus: {
  type: String,
  enum: ["pending", "in-transit", "delivered"],
  default: "pending",
},

transporterStatus: {
  type: String,
  enum: ["pending", "accepted", "approved", "started", "completed"],
  default: "pending",
},
markettotradertransport:{
  type: String,
    enum: ["pending", "accept", "rejected", "completed"],
    default: "pending",
  },
transporterDetails: transporterDetailsSchema,

});




// Auto-generate orderId before saving
orderSchema.pre("save", async function () {
  if (!this.orderId) {
    const Order = mongoose.model("Order");
    const count = await Order.countDocuments();
    this.orderId = `ORD${String(count + 1).padStart(6, "0")}`;
  }

  this.updatedAt = Date.now();
});

// Create indexes
// orderSchema.index({ orderId: 1 });
orderSchema.index({ traderId: 1 });
orderSchema.index({ farmerId: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ transporterStatus: 1 });
orderSchema.index({ "marketToTraderTransport.status": 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);