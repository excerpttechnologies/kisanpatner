const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    mobileNo: { type: String, required: true, unique: true },
    email: { type: String },
    address: { type: String },
    villageGramaPanchayat: { type: String },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    taluk: { type: String, required: true },
    post: { type: String }
  },
  role: { type: String,  },
  farmLocation: {
    latitude: { type: String },
    longitude: { type: String }
  },
  farmLand: {
    total: { type: Number },
    cultivated: { type: Number },
    uncultivated: { type: Number }
  },
  commodities: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category' 
  }],
  nearestMarkets: [{
    name: { type: String }
  }],
  bankDetails: {
    accountHolderName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    branch: { type: String }
  },
  documents: {
    panCard: { type: String },
    aadharFront: { type: String },
    aadharBack: { type: String },
    bankPassbook: { type: String }
  },
  security: {
    referralCode: { type: String },
    mpin: { type: String, required: true },
    password: { type: String, required: true }
  },
  isActive: { type: Boolean, default: true },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', farmerSchema);