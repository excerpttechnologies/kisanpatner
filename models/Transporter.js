
// // models/Transporter.js
// const mongoose = require('mongoose');

// const vehicleSchema = new mongoose.Schema({
//   // Vehicle Details
//   vehicleType: { 
//     type: String,
//     enum: ['Pickup Van', 'Bolero', 'Tata Ace', 'Mini Truck', 'Lorry', 'Truck', 'Container', 'Trailer', 'Other'],
//     required: true
//   },
//   vehicleCapacity: {
//     value: { type: Number, required: true },
//     unit: { 
//       type: String,
//       enum: ['kg', 'ton', 'quintal', 'boxes'],
//       default: 'kg'
//     }
//   },
//   vehicleNumber: { type: String, required: true, unique: true },
  
//   // Vehicle Documents
//   vehicleDocuments: {
//     rcBook: { type: String, required: true }, // File path
//     insuranceDoc: { type: String },
//     pollutionCert: { type: String },
//     permitDoc: { type: String }
//   },
  
//   // Driver Details for this specific vehicle
//   driverInfo: {
//     driverName: { type: String },
//     driverMobileNo: { type: String },
//     driverAge: { type: Number },
//     driverLicense: { type: String }, // File path
//     driverPhoto: { type: String } // File path
//   },
  
//   // Vehicle status and metadata
//   isActive: { type: Boolean, default: true },
//   addedAt: { type: Date, default: Date.now },
//   primaryVehicle: { type: Boolean, default: false }
// });

// const transporterSchema = new mongoose.Schema({
//   transporterId: {
//   type: String,
//   unique: true
// },

//   personalInfo: {
//     name: { type: String, required: true },
//     mobileNo: { type: String, required: true, unique: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     villageGramaPanchayat: { type: String },
//     pincode: { type: String, required: true },
//     state: { type: String, required: true },
//     district: { type: String, required: true },
//     taluk: { type: String, required: true },
//     post: { type: String },
//     location: { type: String }
//   },
  
//   role: { 
//     type: String, 
//     required: true,
//     enum: ['transport'],
//     default: 'transport'
//   },
  
//   // Transport specific fields - Now with array of vehicles
//   transportInfo: {
//     // Flag to indicate if this is a company with multiple vehicles
//     isCompany: { type: Boolean, default: false },
    
//     // Array of vehicles owned/operated by this transporter
//     vehicles: [vehicleSchema],
    
//     // For backward compatibility - keep single vehicle info for existing users
//     // These fields will be used when vehicles array is empty or for primary vehicle
//     vehicleType: { 
//       type: String,
//       enum: ['Pickup Van', 'Bolero', 'Tata Ace', 'Mini Truck', 'Lorry', 'Truck', 'Container', 'Trailer', 'Other']
//     },
//     vehicleCapacity: {
//       value: { type: Number },
//       unit: { 
//         type: String,
//         enum: ['kg', 'ton', 'quintal', 'boxes'],
//         default: 'kg'
//       }
//     },
//     vehicleNumber: { type: String },
    
//     // Vehicle Documents for backward compatibility
//     vehicleDocuments: {
//       rcBook: { type: String },
//       insuranceDoc: { type: String },
//       pollutionCert: { type: String },
//       permitDoc: { type: String }
//     },
    
//     // Driver Details for backward compatibility
//     driverInfo: {
//       driverName: { type: String },
//       driverMobileNo: { type: String },
//       driverAge: { type: Number },
//       driverLicense: { type: String },
//       driverPhoto: { type: String }
//     }
//   },
  
//   // Bank Details
//   bankDetails: {
//     accountHolderName: { type: String, required: true },
//     bankName: { type: String, required: true },
//     accountNumber: { type: String, required: true },
//     ifscCode: { type: String, required: true },
//     branch: { type: String },
//     upiId: { type: String }
//   },
  
//   // Common Documents (shared across vehicles)
//   documents: {
//     panCard: { type: String },
//     aadharFront: { type: String },
//     aadharBack: { type: String },
//     bankPassbook: { type: String }
//   },
  
//   // Security
//   security: {
//     referralCode: { type: String },
//     mpin: { type: String, required: true },
//     password: { type: String, required: true }
//   },
  
//   // Transporter status and metrics
//   isActive: { type: Boolean, default: true },
//   registeredAt: { type: Date, default: Date.now },
//   lastLogin: { type: Date },
//   rating: { type: Number, default: 0, min: 0, max: 5 },
//   totalTrips: { type: Number, default: 0 },
  
//   // Additional fields for multi-vehicle support
//   maxVehicles: { type: Number, default: 10 }, // Maximum vehicles allowed
//   vehicleCount: { type: Number, default: 0 } // Current number of vehicles
// });

// // Index for vehicle number search across all vehicles
// transporterSchema.index({ 'transportInfo.vehicles.vehicleNumber': 1 });

// transporterSchema.pre('save', function() {
//   if (this.transportInfo && this.transportInfo.vehicles) {
//     this.vehicleCount = this.transportInfo.vehicles.length;
//   }
//   return Promise.resolve(); // Return resolved promise
// });

// // Method to add a new vehicle
// transporterSchema.methods.addVehicle = function(vehicleData) {
//   if (!this.transportInfo.vehicles) {
//     this.transportInfo.vehicles = [];
//   }
  
//   // Check if vehicle already exists
//   const existingVehicle = this.transportInfo.vehicles.find(
//     v => v.vehicleNumber === vehicleData.vehicleNumber
//   );
  
//   if (existingVehicle) {
//     throw new Error('Vehicle with this number already exists');
//   }
  
//   // Check vehicle limit
//   if (this.transportInfo.vehicles.length >= this.maxVehicles) {
//     throw new Error(`Maximum vehicle limit (${this.maxVehicles}) reached`);
//   }
  
//   // If this is the first vehicle, mark it as primary
//   if (this.transportInfo.vehicles.length === 0) {
//     vehicleData.primaryVehicle = true;
//   }
  
//   this.transportInfo.vehicles.push(vehicleData);
//   return this;
// };

// // Method to remove a vehicle
// transporterSchema.methods.removeVehicle = function(vehicleNumber) {
//   const vehicleIndex = this.transportInfo.vehicles.findIndex(
//     v => v.vehicleNumber === vehicleNumber
//   );
  
//   if (vehicleIndex === -1) {
//     throw new Error('Vehicle not found');
//   }
  
//   const removedVehicle = this.transportInfo.vehicles[vehicleIndex];
//   this.transportInfo.vehicles.splice(vehicleIndex, 1);
  
//   // If we removed the primary vehicle and there are other vehicles,
//   // make the first remaining vehicle primary
//   if (removedVehicle.primaryVehicle && this.transportInfo.vehicles.length > 0) {
//     this.transportInfo.vehicles[0].primaryVehicle = true;
//   }
  
//   return removedVehicle;
// };

// // Method to get primary vehicle
// transporterSchema.methods.getPrimaryVehicle = function() {
//   return this.transportInfo.vehicles.find(v => v.primaryVehicle) || 
//          this.transportInfo.vehicles[0] || 
//          null;
// };

// // Method to set a vehicle as primary
// transporterSchema.methods.setPrimaryVehicle = function(vehicleNumber) {
//   // Reset all vehicles' primary status
//   this.transportInfo.vehicles.forEach(vehicle => {
//     vehicle.primaryVehicle = false;
//   });
  
//   // Set the specified vehicle as primary
//   const vehicle = this.transportInfo.vehicles.find(v => v.vehicleNumber === vehicleNumber);
//   if (vehicle) {
//     vehicle.primaryVehicle = true;
//   } else {
//     throw new Error('Vehicle not found');
//   }
  
//   return this;
// };

// module.exports = mongoose.model('Transporter', transporterSchema);



//vps

// // models/Transporter.js
// const mongoose = require('mongoose');

// const transporterSchema = new mongoose.Schema({
//   personalInfo: {
//     name: { type: String, required: true },
//     mobileNo: { type: String, required: true, unique: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     villageGramaPanchayat: { type: String },
//     pincode: { type: String, required: true },
//     state: { type: String, required: true },
//     district: { type: String, required: true },
//     taluk: { type: String, required: true },
//     post: { type: String },
//     location: { type: String }
//   },

//   role: {
//     type: String,
//     required: true,
//     enum: ['transport'],
//     default: 'transport'
//   },

//   // Transport specific fields
//   transportInfo: {
//     // Vehicle Details
//     vehicleType: {
//       type: String,
//       enum: ['Pickup Van', 'Bolero', 'Tata Ace', 'Mini Truck', 'Lorry', 'Truck', 'Container', 'Trailer', 'Other'],
//       required: true
//     },
//     vehicleCapacity: {
//       value: { type: Number, required: true },
//       unit: {
//         type: String,
//         enum: ['kg', 'ton', 'quintal', 'boxes'],
//         default: 'kg'
//       }
//     },
//     vehicleNumber: { type: String, required: true, unique: true },

//     // Vehicle Documents
//     vehicleDocuments: {
//       rcBook: { type: String, required: true }, // File path
//       insuranceDoc: { type: String },
//       pollutionCert: { type: String },
//       permitDoc: { type: String }
//     },

//     // Driver Details (for transport companies)
//     isCompany: { type: Boolean, default: false },
//     driverInfo: {
//       driverName: { type: String },
//       driverMobileNo: { type: String },
//       driverAge: { type: Number },
//       driverLicense: { type: String }, // File path
//       driverPhoto: { type: String } // File path
//     }
//   },

//   // Bank Details
//   bankDetails: {
//     accountHolderName: { type: String, required: true },
//     bankName: { type: String, required: true },
//     accountNumber: { type: String, required: true },
//     ifscCode: { type: String, required: true },
//     branch: { type: String },
//     upiId: { type: String }
//   },

//   // Documents
//   documents: {
//     panCard: { type: String },
//     aadharFront: { type: String },
//     aadharBack: { type: String },
//     bankPassbook: { type: String },
//     rcBook: { type: String },
//     insuranceDoc: { type: String },
//     pollutionCert: { type: String },
//     permitDoc: { type: String },
//     driverLicense: { type: String }
//   },

//   // Security
//   security: {
//     referralCode: { type: String },
//     mpin: { type: String, required: true },
//     password: { type: String, required: true }
//   },

//   isActive: { type: Boolean, default: true },
//   registeredAt: { type: Date, default: Date.now },
//   lastLogin: { type: Date },
//   rating: { type: Number, default: 0, min: 0, max: 5 },
//   totalTrips: { type: Number, default: 0 }
// });

// module.exports = mongoose.model('Transporter', transporterSchema);




















// // models/Transporter.js
// const mongoose = require('mongoose');

// const vehicleSchema = new mongoose.Schema({
//   // Vehicle Details
//   vehicleType: {
//     type: String,
//     enum: ['Pickup Van', 'Bolero', 'Tata Ace', 'Mini Truck', 'Lorry', 'Truck', 'Container', 'Trailer', 'Other'],
//     required: true
//   },
//   vehicleCapacity: {
//     value: { type: Number, required: true },
//     unit: {
//       type: String,
//       enum: ['kg', 'ton', 'quintal', 'boxes'],
//       default: 'kg'
//     }
//   },
//   vehicleNumber: { type: String, required: true, unique: true },

//   // Vehicle Documents
//   vehicleDocuments: {
//     rcBook: { type: String, required: true }, // File path
//     insuranceDoc: { type: String },
//     pollutionCert: { type: String },
//     permitDoc: { type: String }
//   },

//   // Driver Details for this specific vehicle
//   driverInfo: {
//     driverName: { type: String },
//     driverMobileNo: { type: String },
//     driverAge: { type: Number },
//     driverLicense: { type: String }, // File path
//     driverPhoto: { type: String } // File path
//   },

//   // Vehicle status and metadata
//   isActive: { type: Boolean, default: true },
//   addedAt: { type: Date, default: Date.now },
//   primaryVehicle: { type: Boolean, default: false }
// });

// const transporterSchema = new mongoose.Schema({
//   transporterId: {
//   type: String,
//   unique: true
// },

//   personalInfo: {
//     name: { type: String, required: true },
//     mobileNo: { type: String, required: true, unique: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     villageGramaPanchayat: { type: String },
//     pincode: { type: String, required: true },
//     state: { type: String, required: true },
//     district: { type: String, required: true },
//     taluk: { type: String, required: true },
//     post: { type: String },
//     location: { type: String }
//   },

//   role: {
//     type: String,
//     required: true,
//     enum: ['transport'],
//     default: 'transport'
//   },

//   // Transport specific fields - Now with array of vehicles
//   transportInfo: {
//     // Flag to indicate if this is a company with multiple vehicles
//     isCompany: { type: Boolean, default: false },

//     // Array of vehicles owned/operated by this transporter
//     vehicles: [vehicleSchema],

//     // For backward compatibility - keep single vehicle info for existing users
//     // These fields will be used when vehicles array is empty or for primary vehicle
//     vehicleType: {
//       type: String,
//       enum: ['Pickup Van', 'Bolero', 'Tata Ace', 'Mini Truck', 'Lorry', 'Truck', 'Container', 'Trailer', 'Other']
//     },
//     vehicleCapacity: {
//       value: { type: Number },
//       unit: {
//         type: String,
//         enum: ['kg', 'ton', 'quintal', 'boxes'],
//         default: 'kg'
//       }
//     },
//     vehicleNumber: { type: String },

//     // Vehicle Documents for backward compatibility
//     vehicleDocuments: {
//       rcBook: { type: String },
//       insuranceDoc: { type: String },
//       pollutionCert: { type: String },
//       permitDoc: { type: String }
//     },

//     // Driver Details for backward compatibility
//     driverInfo: {
//       driverName: { type: String },
//       driverMobileNo: { type: String },
//       driverAge: { type: Number },
//       driverLicense: { type: String },
//       driverPhoto: { type: String }
//     }
//   },

//   // Bank Details
//   bankDetails: {
//     accountHolderName: { type: String, required: true },
//     bankName: { type: String, required: true },
//     accountNumber: { type: String, required: true },
//     ifscCode: { type: String, required: true },
//     branch: { type: String },
//     upiId: { type: String }
//   },

//   // Common Documents (shared across vehicles)
//   documents: {
//     panCard: { type: String },
//     aadharFront: { type: String },
//     aadharBack: { type: String },
//     bankPassbook: { type: String }
//   },

//   // Security
//   security: {
//     referralCode: { type: String },
//     mpin: { type: String, required: true },
//     password: { type: String, required: true }
//   },

//   // Transporter status and metrics
//   isActive: { type: Boolean, default: true },
//   registeredAt: { type: Date, default: Date.now },
//   lastLogin: { type: Date },
//   rating: { type: Number, default: 0, min: 0, max: 5 },
//   totalTrips: { type: Number, default: 0 },

//   // Additional fields for multi-vehicle support
//   maxVehicles: { type: Number, default: 10 }, // Maximum vehicles allowed
//   vehicleCount: { type: Number, default: 0 } // Current number of vehicles
// });

// // Index for vehicle number search across all vehicles
// transporterSchema.index({ 'transportInfo.vehicles.vehicleNumber': 1 });

// transporterSchema.pre('save', function() {
//   if (this.transportInfo && this.transportInfo.vehicles) {
//     this.vehicleCount = this.transportInfo.vehicles.length;
//   }
//   return Promise.resolve(); // Return resolved promise
// });

// // Method to add a new vehicle
// transporterSchema.methods.addVehicle = function(vehicleData) {
//   if (!this.transportInfo.vehicles) {
//     this.transportInfo.vehicles = [];
//   }

//   // Check if vehicle already exists
//   const existingVehicle = this.transportInfo.vehicles.find(
//     v => v.vehicleNumber === vehicleData.vehicleNumber
//   );

//   if (existingVehicle) {
//     throw new Error('Vehicle with this number already exists');
//   }

//   // Check vehicle limit
//   if (this.transportInfo.vehicles.length >= this.maxVehicles) {
//     throw new Error(`Maximum vehicle limit (${this.maxVehicles}) reached`);
//   }

//   // If this is the first vehicle, mark it as primary
//   if (this.transportInfo.vehicles.length === 0) {
//     vehicleData.primaryVehicle = true;
//   }

//   this.transportInfo.vehicles.push(vehicleData);
//   return this;
// };

// // Method to remove a vehicle
// transporterSchema.methods.removeVehicle = function(vehicleNumber) {
//   const vehicleIndex = this.transportInfo.vehicles.findIndex(
//     v => v.vehicleNumber === vehicleNumber
//   );

//   if (vehicleIndex === -1) {
//     throw new Error('Vehicle not found');
//   }

//   const removedVehicle = this.transportInfo.vehicles[vehicleIndex];
//   this.transportInfo.vehicles.splice(vehicleIndex, 1);

//   // If we removed the primary vehicle and there are other vehicles,
//   // make the first remaining vehicle primary
//   if (removedVehicle.primaryVehicle && this.transportInfo.vehicles.length > 0) {
//     this.transportInfo.vehicles[0].primaryVehicle = true;
//   }

//   return removedVehicle;
// };

// // Method to get primary vehicle
// transporterSchema.methods.getPrimaryVehicle = function() {
//   return this.transportInfo.vehicles.find(v => v.primaryVehicle) ||
//          this.transportInfo.vehicles[0] ||
//          null;
// };

// // Method to set a vehicle as primary
// transporterSchema.methods.setPrimaryVehicle = function(vehicleNumber) {
//   // Reset all vehicles' primary status
//   this.transportInfo.vehicles.forEach(vehicle => {
//     vehicle.primaryVehicle = false;
//   });

//   // Set the specified vehicle as primary
//   const vehicle = this.transportInfo.vehicles.find(v => v.vehicleNumber === vehicleNumber);
//   if (vehicle) {
//     vehicle.primaryVehicle = true;
//   } else {
//     throw new Error('Vehicle not found');
//   }

//   return this;
// };

// module.exports = mongoose.model('Transporter', transporterSchema);
















//updated by sagar

// models/Transporter.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    enum: ['Pickup Van', 'Bolero', 'Tata Ace', 'Mini Truck', 'Lorry', 'Truck', 'Container', 'Trailer', 'Other'],
    required: true
  },
  vehicleCapacity: {
    value: { type: Number },
    unit: {
      type: String,
      enum: ['kg', 'ton', 'quintal', 'boxes'],
      default: 'kg'
    }
  },
  vehicleNumber: { type: String, required: true, unique: true },

  vehicleDocuments: {
    rcBook:        { type: String },
    insuranceDoc:  { type: String },
    pollutionCert: { type: String },
    permitDoc:     { type: String }
  },

  driverInfo: {
    driverName:     { type: String },
    driverMobileNo: { type: String },
    driverAge:      { type: Number },
    driverLicense:  { type: String },
    driverPhoto:    { type: String }
  },

  isActive:       { type: Boolean, default: true },
  addedAt:        { type: Date,    default: Date.now },
  primaryVehicle: { type: Boolean, default: false }
});

const transporterSchema = new mongoose.Schema({
  transporterId: {
    type:   String,
    unique: true
  },

  personalInfo: {
    name:      { type: String, required: true },
    mobileNo:  { type: String, required: true, unique: true },
    email:     { type: String },
    address:   { type: String },          // ← was required, now optional
    villageGramaPanchayat: { type: String },
    villageId:  { type: String },
    pincode:    { type: String },         // ← was required, now optional
    state:      { type: String },         // ← was required, now optional
    stateId:    { type: String },
    district:   { type: String },         // ← was required, now optional
    districtId: { type: String },
    taluk:      { type: String },         // ← was required, now optional
    talukId:    { type: String },
    post:       { type: String },
    location:   { type: String }
  },

  role: {
    type:     String,
    required: true,
    enum:     ['transport'],
    default:  'transport'
  },

  transportInfo: {
    isCompany: { type: Boolean, default: false },

    vehicles: [vehicleSchema],

    // Backward-compat single-vehicle fields
    vehicleType: {
      type: String,
      enum: ['Pickup Van', 'Bolero', 'Tata Ace', 'Mini Truck', 'Lorry', 'Truck', 'Container', 'Trailer', 'Other']
    },
    vehicleCapacity: {
      value: { type: Number },
      unit: {
        type:    String,
        enum:    ['kg', 'ton', 'quintal', 'boxes'],
        default: 'kg'
      }
    },
    vehicleNumber: { type: String },

    vehicleDocuments: {
      rcBook:        { type: String },
      insuranceDoc:  { type: String },
      pollutionCert: { type: String },
      permitDoc:     { type: String }
    },

    driverInfo: {
      driverName:     { type: String },
      driverMobileNo: { type: String },
      driverAge:      { type: Number },
      driverLicense:  { type: String },
      driverPhoto:    { type: String }
    }
  },

  // ── Bank details – all optional (frontend does not send these at registration)
  bankDetails: {
    accountHolderName: { type: String },   // ← was required
    bankName:          { type: String },   // ← was required
    accountNumber:     { type: String },   // ← was required
    ifscCode:          { type: String },   // ← was required
    branch:            { type: String },
    upiId:             { type: String }
  },

  // Nearest markets & mandis from frontend
  nearestMarkets: [{ type: String }],
  mandis:         [{ type: String }],

  documents: {
    panCard:       { type: String },
    aadharFront:   { type: String },
    aadharBack:    { type: String },
    bankPassbook:  { type: String },
    rcBook:        { type: String },
    insuranceDoc:  { type: String },
    pollutionCert: { type: String },
    permitDoc:     { type: String },
    driverLicense: { type: String }
  },

  security: {
    referralCode: { type: String },
    mpin:         { type: String, required: true },
    password:     { type: String, required: true }
  },

  isActive:     { type: Boolean, default: true },
  registeredAt: { type: Date,    default: Date.now },
  lastLogin:    { type: Date },
  rating:       { type: Number,  default: 0, min: 0, max: 5 },
  totalTrips:   { type: Number,  default: 0 },
  maxVehicles:  { type: Number,  default: 10 },
  vehicleCount: { type: Number,  default: 0 }
});

transporterSchema.index({ 'transportInfo.vehicles.vehicleNumber': 1 });

transporterSchema.pre('save', function () {
  if (this.transportInfo && this.transportInfo.vehicles) {
    this.vehicleCount = this.transportInfo.vehicles.length;
  }
  return Promise.resolve();
});

transporterSchema.methods.addVehicle = function (vehicleData) {
  if (!this.transportInfo.vehicles) this.transportInfo.vehicles = [];

  const existingVehicle = this.transportInfo.vehicles.find(
    v => v.vehicleNumber === vehicleData.vehicleNumber
  );
  if (existingVehicle) throw new Error('Vehicle with this number already exists');

  if (this.transportInfo.vehicles.length >= this.maxVehicles) {
    throw new Error(`Maximum vehicle limit (${this.maxVehicles}) reached`);
  }

  if (this.transportInfo.vehicles.length === 0) vehicleData.primaryVehicle = true;

  this.transportInfo.vehicles.push(vehicleData);
  return this;
};

transporterSchema.methods.removeVehicle = function (vehicleNumber) {
  const idx = this.transportInfo.vehicles.findIndex(v => v.vehicleNumber === vehicleNumber);
  if (idx === -1) throw new Error('Vehicle not found');

  const removed = this.transportInfo.vehicles[idx];
  this.transportInfo.vehicles.splice(idx, 1);

  if (removed.primaryVehicle && this.transportInfo.vehicles.length > 0) {
    this.transportInfo.vehicles[0].primaryVehicle = true;
  }
  return removed;
};

transporterSchema.methods.getPrimaryVehicle = function () {
  return (
    this.transportInfo.vehicles.find(v => v.primaryVehicle) ||
    this.transportInfo.vehicles[0] ||
    null
  );
};

transporterSchema.methods.setPrimaryVehicle = function (vehicleNumber) {
  this.transportInfo.vehicles.forEach(v => { v.primaryVehicle = false; });
  const vehicle = this.transportInfo.vehicles.find(v => v.vehicleNumber === vehicleNumber);
  if (!vehicle) throw new Error('Vehicle not found');
  vehicle.primaryVehicle = true;
  return this;
};

module.exports = mongoose.model('Transporter', transporterSchema);