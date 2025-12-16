const mongoose = require('mongoose');

// State Model
const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// District Model
const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true
  },
  pincodes: [{
    type: String
  }]
}, { timestamps: true });

// Taluka Model
const talukaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: true
  },
  pincodes: [{
    type: String
  }],
  villages: [{
    name: String
  }]
}, { timestamps: true });

// Category Model
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Vegetables', 'Fruits', 'Livestock', 'Grains']
  },
  description: String,
  icon: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// SubCategory Model
const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  localNames: [{
    language: String,
    name: String
  }],
  season: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Crop Model
const cropSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmerName: {
    type: String,
    required: true
  },
  cropName: {
    type: String,
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  quantity: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'quintal', 'ton', 'litre', 'piece']
    }
  },
  price: {
    value: Number,
    unit: {
      type: String,
      enum: ['per kg', 'per quintal', 'per ton', 'total']
    }
  },
  location: {
    state: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    taluka: {
      type: String,
      required: true
    },
    village: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  images: [{
    url: String,
    caption: String
  }],
  description: String,
  qualityGrade: {
    type: String,
    enum: ['A', 'B', 'C', 'Organic', 'Premium']
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  harvestDate: Date,
  expiryDate: Date,
  isAvailable: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved', 'expired'],
    default: 'available'
  }
}, { timestamps: true });

// User Model (for farmer info)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['farmer', 'buyer', 'admin'],
    default: 'farmer'
  },
  address: {
    state: String,
    district: String,
    taluka: String,
    village: String,
    pincode: String
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Create and export models (avoid overwrite if already compiled)
const State = mongoose.models.State || mongoose.model('State', stateSchema);
const District = mongoose.models.District || mongoose.model('District', districtSchema);
const Taluka = mongoose.models.Taluka || mongoose.model('Taluka', talukaSchema);
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);
const Crop = mongoose.models.Crop || mongoose.model('Crop', cropSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = {
  State,
  District,
  Taluka,
  Category,
  SubCategory,
  Crop,
  User
};