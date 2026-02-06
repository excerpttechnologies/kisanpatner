// const mongoose = require("mongoose");

// const SubCategorySchema = new mongoose.Schema({
//   subCategoryId: { type: String, unique: true },
//   subCategoryName: { type: String, required: true },
//   categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
//    image: { type: String }
//  // main category reference
// });

// // Auto-generate subCategoryId
// SubCategorySchema.pre("save", async function () {
//   if (this.subCategoryId) return;

//   const last = await mongoose.model("SubCategory").findOne().sort({ _id: -1 });

//   let nextNumber = 1;
//   if (last?.subCategoryId) {
//     nextNumber =
//       parseInt(last.subCategoryId.replace("SUB", "")) + 1;
//   }

//   this.subCategoryId = "SUB" + String(nextNumber).padStart(3, "0");
// });

// module.exports = mongoose.model("SubCategory", SubCategorySchema);


const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  subCategoryId: { type: String, unique: true },
  subCategoryName: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
   image: { type: String }
 // main category reference
});

// Auto-generate subCategoryId
SubCategorySchema.pre("save", async function () {
  if (this.subCategoryId) return;

  const last = await mongoose.model("SubCategory").findOne().sort({ _id: -1 });

  let nextNumber = 1;
  if (last?.subCategoryId) {
    nextNumber =
      parseInt(last.subCategoryId.replace("SUB", "")) + 1;
  }

  this.subCategoryId = "SUB" + String(nextNumber).padStart(3, "0");
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);