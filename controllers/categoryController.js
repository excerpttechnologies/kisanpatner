// const Category = require("../models/category");

// exports.addCategory = async (req, res) => {
//   try {
//     const { categoryName } = req.body;
//     console.log(categoryName);

//     const newCategory = new Category({ categoryName });
//     await newCategory.save();

//     res.json({
//       success: true,
//       message: "Category added successfully",
//       data: newCategory,
//     });
//   } catch (err) {
//     console.error("CATEGORY SAVE ERROR:", err);   // <-- ADD THIS
//     res.status(500).json({ success: false, message: err.message });  // <-- SHOW REAL ERROR
//   }
// };


const Category = require("../models/category");

// ADD
exports.addCategory = async (req, res) => {
  try {
    const newCat = new Category({ categoryName: req.body.categoryName });
    await newCat.save();
    res.json({ success: true, message: "Category added", data: newCat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  const list = await Category.find().sort({ categoryId: 1 });
  res.json({ success: true, data: list });
};

// UPDATE
exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { categoryName: req.body.categoryName },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
