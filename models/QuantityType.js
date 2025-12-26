const mongoose = require("mongoose");

const packagingSchema = new mongoose.Schema(
  {
    packageType: {
      type: String,
      required: true,
      trim: true,
      unique: true, // prevents duplicate types
    },
    measurements: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Packaging", packagingSchema);
