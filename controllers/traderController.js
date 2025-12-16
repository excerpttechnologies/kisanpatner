const Trader = require('../models/Trader');

exports.createTrader = async (req, res) => {
  try {
    const { name, mobileNo, email, company, address } = req.body;
    const existing = await Trader.findOne({ mobileNo });
    if (existing) return res.status(400).json({ success: false, message: 'Trader already exists' });

    const trader = new Trader({ name, mobileNo, email, company, address });
    await trader.save();
    res.json({ success: true, data: trader });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getTrader = async (req, res) => {
  try {
    const trader = await Trader.findById(req.params.id);
    if (!trader) return res.status(404).json({ success: false, message: 'Trader not found' });
    res.json({ success: true, data: trader });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
