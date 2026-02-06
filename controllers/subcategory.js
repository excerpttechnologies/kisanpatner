const SubCategory = require("../models/subcategory");

// ADD
exports.addSubCategory = async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;

    const newSub = new SubCategory({
      subCategoryName,
      categoryId,
      image: req.file ? req.file.filename : null
    });

    await newSub.save();

    res.json({ success: true, message: "Sub Category added", data: newSub });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
exports.getAllSub = async (req, res) => {
  try {
    const list = await SubCategory.find().sort({ subCategoryId: 1 });
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY CATEGORY
exports.getByCategory = async (req, res) => {
  try {
    const list = await SubCategory.find({ categoryId: req.params.categoryId });
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ categoryId: req.params.categoryId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: subCategories
    });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subcategories',
      error: error.message
    });
  }
};

// UPDATE
// exports.updateSub = async (req, res) => {
//   try {
//     const updated = await SubCategory.findByIdAndUpdate(
//       req.params.id,
//       { subCategoryName: req.body.subCategoryName },
//       { new: true }
//     );

//     res.json({ success: true, data: updated });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };\\


//kavana code


exports.updateSub = async (req, res) => {
  try {
    const updateData = {
      subCategoryName: req.body.subCategoryName,
    };

    // update image only if new one uploaded
    if (req.file && req.file.filename) {
      updateData.image = req.file.filename;
    }

    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, data: updated });

  } catch (err) {
    console.error("UPDATE SUB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// DELETE
exports.deleteSub = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Sub Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
