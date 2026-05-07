// const mongoose = require('mongoose');

// const farmerSchema = new mongoose.Schema({
// farmerId: { 
//     type: String, 
//     unique: true, 
//     sparse: true  // Add this
//   },
//   traderId: {  // Add this new field
//     type: String,
//     unique: true,
//     sparse: true
//   },
//   personalInfo: {
//     name: { type: String, required: true },
//     mobileNo: { type: String, required: true, unique: true },
//     email: { type: String },
//     address: { type: String },
//     villageGramaPanchayat: { type: String },
//     pincode: { type: String, required: true },
//     state: { type: String, required: true },
//     district: { type: String, required: true },
//     taluk: { type: String, required: true },
//     post: { type: String }
//   },
//   role: { type: String,  },
//   farmLocation: {
//     latitude: { type: String },
//     longitude: { type: String }
//   },
//   farmLand: {
//     total: { type: Number },
//     cultivated: { type: Number },
//     uncultivated: { type: Number }
//   },
//   commodities: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Category' 
//   }],
//  nearestMarkets: [{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Market'
// }],

// // Add subcategories field after commodities
// subcategories: [{ 
//   type: mongoose.Schema.Types.ObjectId, 
//   ref: 'SubCategory' 
// }],
//   bankDetails: {
//     accountHolderName: { type: String },
//     accountNumber: { type: String },
//     ifscCode: { type: String },
//     branch: { type: String }
//   },
//  documents: {
//     panCard: { type: String },
//     aadharFront: { type: String },
//     aadharBack: { type: String },
//     bankPassbook: { type: String },
//     businessLicense: { type: String },  // Add
//     photo: { type: String },  // Add
//     businessNameBoard: { type: String }  // Add
//   },
//   security: {
//     referralCode: { type: String },
//     mpin: { type: String, required: true },
//     password: { type: String, required: true }
//   },
// registrationStatus: {
//   type: String,
//   enum: ['pending', 'approved', 'rejected'],
//   default: 'pending'
// },
// isActive: { 
//   type: Boolean, 
//   default: false  // Change from true to false
// },
//   registeredAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Farmer', farmerSchema);



// //vps
// const mongoose = require('mongoose');

// const farmerSchema = new mongoose.Schema({
// farmerId: {
//     type: String,
//     unique: true,
//     sparse: true  // Add this
//   },
//   traderId: {  // Add this new field
//     type: String,
//     unique: true,
//     sparse: true
//   },
//   personalInfo: {
//     name: { type: String, required: true },
//     mobileNo: { type: String, required: true, unique: true },
//     email: { type: String },
//     address: { type: String },
//     villageGramaPanchayat: { type: String },
//     pincode: { type: String, required: false },
//     state: { type: String, required: false },
//     district: { type: String, required: false },
//     taluk: { type: String, required: false },
//     post: { type: String }
//   },
//   role: { type: String,  },
//   farmLocation: {
//     latitude: { type: String },
//     longitude: { type: String }
//   },
//   farmLand: {
//     total: { type: Number },
//     cultivated: { type: Number },
//     uncultivated: { type: Number }
//   },
//   commodities: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   }],
//  nearestMarkets: [{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Market'
// }],

// // Add subcategories field after commodities
// subcategories: [{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'SubCategory'
// }],
//   bankDetails: {
//     accountHolderName: { type: String },
//     accountNumber: { type: String },
//     ifscCode: { type: String },
//     branch: { type: String }
//   },
//  documents: {
//     panCard: { type: String },
//     aadharFront: { type: String },
//     aadharBack: { type: String },
//     bankPassbook: { type: String },
//     businessLicense: { type: String },  // Add
//     photo: { type: String },  // Add
//     businessNameBoard: { type: String }  // Add
//   },
//   security: {
//     referralCode: { type: String },
//     mpin: { type: String, required: true },
//     password: { type: String, required: true }
//   },
// registrationStatus: {
//   type: String,
//   enum: ['pending', 'approved', 'rejected'],
//   default: 'pending'
// },
// isActive: {
//   type: Boolean,
//   default: false  // Change from true to false
// },
//   registeredAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Farmer', farmerSchema);
















//updated by sagar
const mongoose = require('mongoose');

const documentFileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  originalName: { type: String },
  size: { type: Number },
  mimeType: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

const farmerSchema = new mongoose.Schema({
  farmerId: { type: String, unique: true, sparse: true },
  traderId: { type: String, unique: true, sparse: true },
  personalInfo: {
    name: { type: String, required: true },
    mobileNo: { type: String, required: true, unique: true },
    email: { type: String },
    address: { type: String },
    villageGramaPanchayat: { type: String },
    pincode: { type: String },
    state: { type: String },
    district: { type: String },
    taluk: { type: String },
    post: { type: String }
  },
  role: { type: String, enum: ['farmer', 'trader'], required: true },
  farmLocation: {
    latitude: { type: String },
    longitude: { type: String }
  },
  farmLand: {
    total: { type: Number, default: 0 },
    cultivated: { type: Number, default: 0 },
    uncultivated: { type: Number, default: 0 }
  },
  commodities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  nearestMarkets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Market' }],
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
  bankDetails: {
    accountHolderName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    branch: { type: String },
    bankName: { type: String },
    upiId: { type: String }
  },
  documents: {
    panCard: [documentFileSchema],
    aadharFront: [documentFileSchema],
    aadharBack: [documentFileSchema],
    bankPassbook: [documentFileSchema],
    businessLicense: [documentFileSchema],
    photo: [documentFileSchema],
    businessNameBoard: [documentFileSchema]
  },
  security: {
    referralCode: { type: String },
    mpin: { type: String, required: true },
    password: { type: String, required: true }
  },
  // Trader-specific fields
  companyName: { type: String },
  companyType: { type: String },
  agreements: {
    agreeToAPMC: { type: Boolean, default: false },
    agreeToFairTrade: { type: Boolean, default: false },
    agreeToMaintainRecords: { type: Boolean, default: false }
  },
  registrationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isActive: { type: Boolean, default: false },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', farmerSchema);