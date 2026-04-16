const Product = require('../models/MarketProduct');

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, createdBy: req.userId });
    res.status(201).json({ success: true, message: 'Product created', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/products/my
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.userId, isActive: true })
      .populate('categoryId', 'categoryName image')
      .populate('subCategoryId', 'subCategoryName image')
      .lean();
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/products  (buyer listing with filters)
exports.listProducts = async (req, res) => {
  try {
    const { categoryId, subCategoryId, district, taluk, search, page = 1, limit = 20, sort } = req.query;
    const filter = { isActive: true };
    if (categoryId)    filter.categoryId    = categoryId;
    if (subCategoryId) filter.subCategoryId = subCategoryId;
    if (district)      filter['location.district'] = district;
    if (taluk)         filter['location.taluk']    = taluk;
    if (search)        filter.$text = { $search: search };

    const sortOpt = sort === 'price_asc' ? { price: 1 } : sort === 'price_desc' ? { price: -1 } : { createdAt: -1 };
    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOpt).skip(skip).limit(Number(limit))
        .populate('categoryId', 'categoryName image')
        .populate('subCategoryId', 'subCategoryName image')
        .populate('createdBy', 'name mobileNumber')
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true, data: products,
      meta: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Product not found or unauthorized' });
    res.json({ success: true, message: 'Product updated', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/products/:id  (soft delete)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      { isActive: false },
      { new: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Product not found or unauthorized' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
