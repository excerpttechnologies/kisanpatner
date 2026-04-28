const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: String, required: true, unique: true, trim: true,
    match: [/^[0-9]{10}$/, '10 digits required'],
  },
  role: { type: String, enum: ['farmer', 'trader'], required: true },
  security: {
    password: { type: String, required: true },
    mpin:     { type: String, required: true },
  },
  email:    { type: String, trim: true, lowercase: true },
  state:    String,
  district: String,
  taluk:    String,
  village:  String,
  // Profile fields (filled later via PUT /api/profile/update)
  name:            String,
  address:         String,
  businessName:    String,
  businessType:    String,
  businessLicense: String,
  gstNumber:       String,
  bankDetails: {
    accountHolderName: String,
    accountNumber:     String,
    ifscCode:          String,
    branch:            String,
    bankName:          String,
  },
  documents: {
    photo:       String,
    aadharFront: String,
    aadharBack:  String,
    panCard:     String,
    bankPassbook: String,
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.security;
  return obj;
};

module.exports = mongoose.model('User', userSchema);









