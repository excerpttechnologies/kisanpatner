// const mongoose = require('mongoose');

// const stageSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   status: { type: String, enum: ['pending','in_progress','completed'], default: 'pending' },
//   startDate: Date,
//   endDate: Date,
//   photos: [String],
//   uploadDate: Date
// });

// const trackingSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true }, // e.g. "Tracking (Regular - Naati)"
//   cropName: String,
//   farmerId: String,
//   cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
//   stages: [stageSchema],
//   currentStageIndex: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Tracking', trackingSchema);



const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['pending','in_progress','completed'], default: 'pending' },
  startDate: Date,
  endDate: Date,
  photos: [String],
  uploadDate: Date
});

const trackingSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. "Tracking (Regular - Naati)"
  cropName: String,
  farmerId: String,
  cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
  stages: [stageSchema],
  currentStageIndex: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tracking', trackingSchema);