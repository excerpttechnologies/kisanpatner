const MarketProduct = require('../models/MarketProduct');
const MarketOrder   = require('../models/MarketOrder');

exports.sellerDashboard = async (req, res) => {
  try {
    const [totalProducts, orders] = await Promise.all([
      MarketProduct.countDocuments({ createdBy: req.userId, isActive: true }),
      MarketOrder.find({ 'items.sellerId': req.userId }).lean(),
    ]);
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter(o => ['shipped', 'delivered'].includes(o.status))
      .reduce((sum, o) => {
        const mine = o.items.filter(i => String(i.sellerId) === String(req.userId));
        return sum + mine.reduce((s, i) => s + i.price * i.quantity, 0);
      }, 0);

    res.json({ success: true, data: { totalProducts, totalOrders, totalRevenue } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.buyerDashboard = async (req, res) => {
  try {
    const orders = await MarketOrder.find({ buyerId: req.userId })
      .sort({ createdAt: -1 }).limit(5)
      .populate('items.productId', 'name images').lean();
    const totalOrders = await MarketOrder.countDocuments({ buyerId: req.userId });
    res.json({ success: true, data: { totalOrders, recentOrders: orders } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
