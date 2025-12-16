const mongoose = require('mongoose');

const TraderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNo: { type: String, required: true, unique: true },
  email: { type: String },
  company: { type: String },
  role: { type: String, default: 'trader' },
  address: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trader', TraderSchema);
