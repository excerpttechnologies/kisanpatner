// const mongoose = require('mongoose');

// // ─── B2B Product Model ────────────────────────────────────────────────────────
// // Separate collection: b2bproducts
// // Used for /api/b2b-products endpoint
// // Posted by farmers/sellers for B2B buyers to purchase

// const b2bProductSchema = new mongoose.Schema(
//   {
//     productName:  { type: String, required: true, trim: true },
//     description:  { type: String, trim: true, default: '' },

//     // Category refs — stored as ObjectId + denormalized name for fast reads
//     categoryId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
//     categoryName:     { type: String, default: '' },
//     subCategoryId:    { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
//     subCategoryName:  { type: String, default: '' },

//     // Images — paths like /api/b2b-products/image/filename.png
//     images: [{ type: String }],

//     // Pricing & stock
//     price:    { type: Number, required: true, min: 0 },
//     quantity: { type: Number, required: true, min: 0 },
//     unit:     { type: String, default: 'kg' },

//     // Location
//     taluk:    { type: String, default: '' },
//     district: { type: String, default: '' },
//     state:    { type: String, default: '' },

//     // Seller info
//     postedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'B2BUser', required: true },
//     postedByName: { type: String, default: '' },

//     // Status
//     status:             { type: String, enum: ['active', 'inactive', 'sold'], default: 'active' },
//     verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
//     isActive:           { type: Boolean, default: true },
//     viewCount:          { type: Number, default: 0 },
//   },
//   {
//     timestamps: true,
//     collection: 'b2bproducts',
//   }
// );

// // Text search index
// b2bProductSchema.index({ productName: 'text', description: 'text' });
// b2bProductSchema.index({ categoryId: 1 });
// b2bProductSchema.index({ subCategoryId: 1 });
// b2bProductSchema.index({ isActive: 1, status: 1 });

// module.exports = mongoose.model('B2BProduct', b2bProductSchema);


const mongoose = require("mongoose");

// ─── B2B Product Model ────────────────────────────────────────────────────────
// Separate collection: b2bproducts
// Used for /api/b2b-products endpoint
// Posted by farmers/sellers for B2B buyers to purchase

const b2bProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },

    // Category refs — stored as ObjectId + denormalized name for fast reads
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    categoryName: { type: String, default: "" },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    subCategoryName: { type: String, default: "" },

    // Images — paths like /api/b2b-products/image/filename.png
    images: [{ type: String }],

    // Pricing & stock
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, default: "kg" },

    // Location
    taluk: { type: String, default: "" },
    district: { type: String, default: "" },
    state: { type: String, default: "" },

    // Seller info
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BUser",
      required: true,
    },
    postedByName: { type: String, default: "" },

    // Status
    status: {
      type: String,
      enum: ["active", "inactive", "sold"],
      default: "active",
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    isActive: { type: Boolean, default: true },
    viewCount: { type: Number, default: 0 },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
    Likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "B2BUser" }],
  },

 

  {
    timestamps: true,
    collection: "b2bproducts",
  },
);

// Text search index
b2bProductSchema.index({ productName: "text", description: "text" });
b2bProductSchema.index({ categoryId: 1 });
b2bProductSchema.index({ subCategoryId: 1 });
b2bProductSchema.index({ isActive: 1, status: 1 });

module.exports = mongoose.model("B2BProduct", b2bProductSchema);
