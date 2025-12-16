const mongoose = require('mongoose');

const qualitySchema = new mongoose.Schema({
  grade: {
    type: String,
    enum: ['A', 'B'],
    required: true
  },
  pricePerPack: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const requirementSchema = new mongoose.Schema({
  postedBy: {
    type: String,
    default: 'guest'
  },
  userType: {
    type: String,
    enum: ['Trader', 'Farmer'],
    default: 'Trader'
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  farmingType: {
    type: String,
    required: true
  },
  variety: {
    type: String,
    default: ''
  },
  packType: {
    type: String,
    required: true
  },
  weightPerPack: {
    type: Number,
    required: true,
    min: 0.1
  },
  qualities: [qualitySchema],
  requirementDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Fulfilled', 'Expired', 'Cancelled'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Requirement = mongoose.model('Requirement', requirementSchema);

module.exports = Requirement;