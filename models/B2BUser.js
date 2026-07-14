



// const mongoose = require("mongoose");

// // ─── Completely separate collection for B2B buyers ────────────────────────────
// // Collection name: b2busers
// // Does NOT affect User model (farmers/traders) in any way

// const b2bUserSchema = new mongoose.Schema(
//   {
//     // ── Mobile (unique within B2B collection only) ───────────────────────────
//     mobileNumber: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       match: [/^[0-9]{10}$/, "Valid 10-digit mobile number required"],
//     },

//     // ── Business Info ────────────────────────────────────────────────────────
//     businessName: { type: String, required: true, trim: true },
//     businessType: {
//       type: String,
//       enum: [
//         "restaurant",
//         "hotel",
//         "retailer",
//         "wholesaler",
//         "caterer",
//         "canteen",
//         "processor",
//         "other",
//       ],
//       required: true,
//     },
//     gstNumber: { type: String, trim: true, default: "" },

//     // ── Contact Info ─────────────────────────────────────────────────────────
//     name: { type: String, trim: true, default: "" },
//     email: { type: String, trim: true, lowercase: true, default: "" },
//     address: { type: String, trim: true, default: "" },

//     // ── Location ─────────────────────────────────────────────────────────────
//     state: { type: String, default: "" },
//     district: { type: String, default: "" },
//     taluk: { type: String, default: "" },
//     village: { type: String, default: "" },

//     // ── Security ─────────────────────────────────────────────────────────────
//     security: {
//       password: { type: String, required: true },
//       mpin: { type: String, required: true },
//       otp: { type: String, default: "" },
//       otpExpiry: { type: Date, default: null },
//     },


//     bankDetails: {
//   accountHolderName: { type: String, default: '' },
//   accountNumber:     { type: String, default: '' },
//   ifscCode:          { type: String, default: '' },
//   bankName:          { type: String, default: '' },
//   branchName:        { type: String, default: '' },
//   upiId:             { type: String, default: '' },
// },
//     // ── Role (always b2b_buyer) ───────────────────────────────────────────────
//     role: { type: String, default: "b2b_buyer", enum: ["b2b_buyer"] },

//     Liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "B2BProduct" }],

//     // ── Status ───────────────────────────────────────────────────────────────
//     isActive: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true, // createdAt, updatedAt
//     collection: "b2busers", // own collection — not mixed with users
//   },
// );

// // ─── toSafeObject — removes sensitive fields before sending to frontend ────────
// b2bUserSchema.methods.toSafeObject = function () {
//   const obj = this.toObject();
//   delete obj.security; // never send password/mpin/otp to frontend
//   delete obj.__v;
//   // Aliases so frontend traderId / b2bUserId / userId all work
//   obj.traderId = obj._id;
//   obj.b2bUserId = obj._id;
//   obj.userId = obj._id;
//   return obj;
// };

// module.exports = mongoose.model("B2BUser", b2bUserSchema);














///11/7/26
const mongoose = require("mongoose");

// ─── Completely separate collection for B2B buyers ────────────────────────────
// Collection name: b2busers
// Does NOT affect User model (farmers/traders) in any way

const b2bUserSchema = new mongoose.Schema(
  {
    // ── Mobile (unique within B2B collection only) ───────────────────────────
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Valid 10-digit mobile number required"],
    },

    // ── Business Info ────────────────────────────────────────────────────────
    businessName: { type: String, required: true, trim: true },
    businessType: {
      type: String,
      enum: [
        "restaurant",
        "hotel",
        "retailer",
        "wholesaler",
        "caterer",
        "canteen",
        "processor",
        "other",
      ],
      required: true,
    },
    gstNumber: { type: String, trim: true, default: "" },

    // ── Contact Info ─────────────────────────────────────────────────────────
    name: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, lowercase: true, default: "" },
    address: { type: String, trim: true, default: "" },

    // ── Location ─────────────────────────────────────────────────────────────
    state: { type: String, default: "" },
    district: { type: String, default: "" },
    taluk: { type: String, default: "" },
    village: { type: String, default: "" },

    // ── KYC Documents (multiple — Aadhar, PAN, GST, Shop License, etc.) ──────
    // THIS WAS MISSING BEFORE — any kyc/kycDocuments data sent to .create()
    // was silently dropped by Mongoose because the schema didn't know about it.
    kycDocuments: [
      {
        docType: {
          type: String,
          enum: ["aadhar", "pan", "gst", "shop_license", "other"],
          required: true,
        },
        docNumber: { type: String, trim: true, required: true },
        documentUrl: { type: String, required: true },
        status: {
          type: String,
          enum: ["pending", "verified", "rejected"],
          default: "pending",
        },
        submittedAt: { type: Date, default: Date.now },
      },
    ],

    // ── Security ─────────────────────────────────────────────────────────────
    security: {
      password: { type: String, required: true },
      mpin: { type: String, required: true },
      otp: { type: String, default: "" },
      otpExpiry: { type: Date, default: null },
    },

    bankDetails: {
      accountHolderName: { type: String, default: '' },
      accountNumber:     { type: String, default: '' },
      ifscCode:          { type: String, default: '' },
      bankName:          { type: String, default: '' },
      branchName:        { type: String, default: '' },
      upiId:             { type: String, default: '' },
    },

    // ── Role (always b2b_buyer) ───────────────────────────────────────────────
    role: { type: String, default: "b2b_buyer", enum: ["b2b_buyer"] },

    Liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "B2BProduct" }],

    // ── Status ───────────────────────────────────────────────────────────────
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true, // createdAt, updatedAt
    collection: "b2busers", // own collection — not mixed with users
  },
);

// ─── toSafeObject — removes sensitive fields before sending to frontend ────────
b2bUserSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.security; // never send password/mpin/otp to frontend
  delete obj.__v;
  // Aliases so frontend traderId / b2bUserId / userId all work
  obj.traderId = obj._id;
  obj.b2bUserId = obj._id;
  obj.userId = obj._id;
  return obj;
};

module.exports = mongoose.model("B2BUser", b2bUserSchema);