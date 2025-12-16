const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryId: { type: String, unique: true },
  categoryName: { type: String, required: true }
});

// Auto-generate categoryId
CategorySchema.pre("save", async function () {
  if (this.categoryId) return;

  const lastCategory = await mongoose
    .model("Category")
    .findOne()
    .sort({ _id: -1 });

  let nextNumber = 1;

  if (lastCategory?.categoryId) {
    nextNumber =
      parseInt(lastCategory.categoryId.replace("CAT", "")) + 1;
  }

  this.categoryId = "CAT" + String(nextNumber).padStart(3, "0");
});

module.exports = mongoose.model("Category", CategorySchema);
