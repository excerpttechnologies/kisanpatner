const CartItem    = require('../models/CartItem');
const Product     = require('../models/MarketProduct');
const MarketOrder = require('../models/MarketOrder');
const mongoose    = require('mongoose');

exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const cartItems = await CartItem.find({ userId: req.userId }).populate('productId').session(session);
    if (!cartItems.length) return res.status(400).json({ success: false, message: 'Cart is empty' });

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cartItems) {
      const product = item.productId;
      if (!product || !product.isActive)
        throw new Error(`Product ${product?.name || item.productId} is no longer available`);
      if (product.quantity < item.quantity)
        throw new Error(`Insufficient stock for ${product.name}`);

      // Deduct inventory
      await Product.findByIdAndUpdate(product._id, { $inc: { quantity: -item.quantity } }, { session });

      orderItems.push({
        productId: product._id,
        name:      product.name,
        price:     product.price,
        quantity:  item.quantity,
        unit:      product.unit,
        sellerId:  product.createdBy,
      });
      totalAmount += product.price * item.quantity;
    }

    const [order] = await MarketOrder.create([{
      buyerId: req.userId, items: orderItems, totalAmount,
    }], { session });

    // Clear cart
    await CartItem.deleteMany({ userId: req.userId }, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await MarketOrder.find({ buyerId: req.userId })
      .populate('items.productId', 'name images')
      .sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMySales = async (req, res) => {
  try {
    const orders = await MarketOrder.find({ 'items.sellerId': req.userId })
      .populate('buyerId', 'name mobileNumber')
      .sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['accepted', 'rejected', 'shipped', 'delivered'];
    if (!allowed.includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status' });

    const order = await MarketOrder.findOneAndUpdate(
      { _id: req.params.id, 'items.sellerId': req.userId },
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found or unauthorized' });
    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
