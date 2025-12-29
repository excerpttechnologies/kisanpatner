const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    commissionPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commission", commissionSchema);
