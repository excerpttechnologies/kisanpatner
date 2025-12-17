// const mongoose = require('mongoose');

// const farmerSchema = new mongoose.Schema({
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
//   nearestMarkets: [{
//     name: { type: String }
//   }],
//   bankDetails: {
//     accountHolderName: { type: String },
//     accountNumber: { type: String },
//     ifscCode: { type: String },
//     branch: { type: String }
//   },
//   documents: {
//     panCard: { type: String },
//     aadharFront: { type: String },
//     aadharBack: { type: String },
//     bankPassbook: { type: String }
//   },
//   security: {
//     referralCode: { type: String },
//     mpin: { type: String, required: true },
//     password: { type: String, required: true }
//   },
//   isActive: { type: Boolean, default: true },
//   registeredAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Farmer', farmerSchema);




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Common fields for all roles
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
    post: { type: String },
    location: { type: String } // For transport: Coordinates/Landmark
  },
  
  role: { 
    type: String, 
    required: true,
    enum: ['farmer', 'trader', 'transport'],
    default: 'farmer'
  },
  
  // Farmer specific fields
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
  
  // Transport specific fields
  transportInfo: {
    // Vehicle Details
    vehicleType: { 
      type: String,
      enum: ['Pickup Van', 'Bolero', 'Tata Ace', 'Mini Truck', 'Lorry', 'Truck', 'Container', 'Trailer', 'Other']
    },
    vehicleCapacity: {
      value: { type: Number },
      unit: { 
        type: String,
        enum: ['kg', 'ton', 'quintal', 'boxes']
      }
    },
    vehicleNumber: { type: String },
    
    // Vehicle Documents
    vehicleDocuments: {
      rcBook: { type: String }, // File path
      insuranceDoc: { type: String },
      pollutionCert: { type: String },
      permitDoc: { type: String }
    },
    
    // Driver Details (for transport companies)
    isCompany: { type: Boolean, default: false },
    driverInfo: {
      driverName: { type: String },
      driverMobileNo: { type: String },
      driverAge: { type: Number },
      driverLicense: { type: String }, // File path
      driverPhoto: { type: String } // File path
    }
  },
  
  // Bank Details (common for all, but transport may have additional)
  bankDetails: {
    accountHolderName: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    branch: { type: String },
    upiId: { type: String } // For transport
  },
  
  // Documents (common structure, different files for different roles)
  documents: {
    panCard: { type: String },
    aadharFront: { type: String },
    aadharBack: { type: String },
    bankPassbook: { type: String },
    // Transport specific documents
    rcBook: { type: String },
    insuranceDoc: { type: String },
    pollutionCert: { type: String },
    permitDoc: { type: String },
    driverLicense: { type: String }
  },
  
  // Security (common for all)
  security: {
    referralCode: { type: String },
    mpin: { type: String, required: true },
    password: { type: String, required: true }
  },
  
  isActive: { type: Boolean, default: true },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);