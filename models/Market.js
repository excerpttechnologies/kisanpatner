// const mongoose = require("mongoose");

// const marketSchema = new mongoose.Schema(
//   {
//     marketId: { type: String, unique: true },
//     marketName: { type: String, required: true },
//     pincode: { type: String, required: true },

//     postOffice: String,     // Hoodi
//     district: String,
//     state: String,

//     exactAddress: {
//       type: String,         // Garudacharpalya
//       required: true,
//     },
//     landmark: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Market", marketSchema);
// const mongoose = require("mongoose");

// const marketSchema = new mongoose.Schema(
//   {
//     marketId: { type: String, unique: true },
//     marketName: { type: String, required: true },
//     pincode: { type: String, required: true },
//     postOffice: String,
//     district: String,
//     state: String,
//     exactAddress: {
//       type: String,
//       required: true,
//     },
//     landmark: String,
//   },
//   { timestamps: true }
// );

// // Export the model only if it doesn't already exist
// module.exports =
//   mongoose.models.Market || mongoose.model("Market", marketSchema);



//vps


// const mongoose = require("mongoose");

// const marketSchema = new mongoose.Schema(
//   {
//     marketId: { type: String, unique: true },
//     marketName: { type: String, required: true },
//     pincode: { type: String, required: true },

//     postOffice: String,     // Hoodi
//     district: String,
//     state: String,

//     exactAddress: {
//       type: String,         // Garudacharpalya
//       required: true,
//     },
//     landmark: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Market", marketSchema);
const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
  {
    marketId: { type: String, unique: true },
    marketName: { type: String, required: true },
    pincode: { type: String, required: true },
    postOffice: String,
    district: String,
    state: String,
    exactAddress: {
      type: String,
      required: true,
    },
    landmark: String,
  },
  { timestamps: true }
);

// Export the model only if it doesn't already exist
module.exports =
  mongoose.models.Market || mongoose.model("Market", marketSchema);