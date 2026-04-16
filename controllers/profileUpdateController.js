const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const allowed = ['name', 'address', 'businessName', 'businessType', 'gstNumber', 'businessLicense', 'email'];
    allowed.forEach(f => { if (req.body[f] != null) user[f] = req.body[f]; });

    if (req.body.bankDetails && typeof req.body.bankDetails === 'object') {
      user.bankDetails = user.bankDetails || {};
      Object.entries(req.body.bankDetails).forEach(([k, v]) => { if (v != null) user.bankDetails[k] = v; });
    }

    await user.save();
    res.json({ success: true, message: 'Profile updated', data: user.toSafeObject() });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ success: false, message: 'Profile update failed' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user.toSafeObject() });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};
