const CartItem = require('../models/CartItem');
const Product  = require('../models/MarketProduct');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    if (product.quantity < quantity)
      return res.status(400).json({ success: false, message: 'Insufficient stock' });

    // Upsert cart item
    const item = await CartItem.findOneAndUpdate(
      { userId: req.userId, productId },
      { $set: { quantity } },
      { upsert: true, new: true }
    );
    res.status(201).json({ success: true, message: 'Added to cart', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.find({ userId: req.userId })
      .populate({
        path: 'productId',
        populate: [
          { path: 'categoryId',    select: 'categoryName image' },
          { path: 'subCategoryId', select: 'subCategoryName image' },
        ],
      })
      .lean();
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await CartItem.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
