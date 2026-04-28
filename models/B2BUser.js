const mongoose = require('mongoose');

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
      match: [/^[0-9]{10}$/, 'Valid 10-digit mobile number required'],
    },

    // ── Business Info ────────────────────────────────────────────────────────
    businessName: { type: String, required: true, trim: true },
    businessType: {
      type: String,
      enum: ['restaurant', 'hotel', 'retailer', 'wholesaler', 'caterer', 'canteen', 'processor', 'other'],
      required: true,
    },
    gstNumber: { type: String, trim: true, default: '' },

    // ── Contact Info ─────────────────────────────────────────────────────────
    name:    { type: String, trim: true, default: '' },
    email:   { type: String, trim: true, lowercase: true, default: '' },
    address: { type: String, trim: true, default: '' },

    // ── Location ─────────────────────────────────────────────────────────────
    state:    { type: String, default: '' },
    district: { type: String, default: '' },
    taluk:    { type: String, default: '' },
    village:  { type: String, default: '' },

    // ── Security ─────────────────────────────────────────────────────────────
    security: {
      password:  { type: String, required: true },
      mpin:      { type: String, required: true },
      otp:       { type: String, default: '' },
      otpExpiry: { type: Date,   default: null },
    },

    // ── Role (always b2b_buyer) ───────────────────────────────────────────────
    role: { type: String, default: 'b2b_buyer', enum: ['b2b_buyer'] },

    // ── Status ───────────────────────────────────────────────────────────────
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,           // createdAt, updatedAt
    collection: 'b2busers',     // own collection — not mixed with users
  }
);

// ─── toSafeObject — removes sensitive fields before sending to frontend ────────
b2bUserSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.security;   // never send password/mpin/otp to frontend
  delete obj.__v;
  // Aliases so frontend traderId / b2bUserId / userId all work
  obj.traderId  = obj._id;
  obj.b2bUserId = obj._id;
  obj.userId    = obj._id;
  return obj;
};

module.exports = mongoose.model('B2BUser', b2bUserSchema);