// models/B2BAddress.js
const mongoose = require("mongoose");

const b2bAddressSchema = new mongoose.Schema(
  {
    b2bUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BUser",
      required: true,
    },
    fullName: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Valid 10-digit mobile number required"],
    },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, default: "" },
    landmark: { type: String, default: "" },
    city: { type: String, required: true },
    
    state: { type: String, required: true },
    taluk:        { type: String, default: "" },  

    pincode: {
      type: String,
      required: true,
      match: [/^[0-9]{6}$/, "Valid 6-digit pincode required"],
    },
    country: { type: String, default: "India" },
    addressType: {
      type: String,
      enum: ["home", "office", "shop", "other"],
      default: "office",
    },
    isDefault: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "b2baddresses",
  },
);

// Ensure only one default address per user
b2bAddressSchema.pre("save", async function () {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { b2bUserId: this.b2bUserId, _id: { $ne: this._id } },
      { isDefault: false },
    );
  }
});

module.exports = mongoose.model("B2BAddress", b2bAddressSchema);
