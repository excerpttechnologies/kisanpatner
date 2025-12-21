const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmingType: {
    type: String,
    required: true
  },
  seedType: {
    type: String,
    required: true
  },
  acres: {
    type: Number,
    required: true
  },
  sowingDate: {
    type: Date,
    required: true
  },
  farmerId: {
    type: String,
    required: true
  },
  trackingId: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

cropSchema.index({ farmerId: 1, createdAt: -1 });

module.exports = mongoose.model('Crop', cropSchema);
