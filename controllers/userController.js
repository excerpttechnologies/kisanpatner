// User profile controller
exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    const p = user.personalInfo || {};

    return res.json({
      success: true,
      data: {
        id: user._id,
        name: p.name || '',
        email: p.email || '',
        mobileNo: p.mobileNo || '',
        address: p.address || '',
        villageGramaPanchayat: p.villageGramaPanchayat || '',
        pincode: p.pincode || '',
        state: p.state || '',
        district: p.district || '',
        taluk: p.taluk || '',
        post: p.post || '',
        role: user.role || ''
      }
    });
  } catch (err) {
    console.error('getProfile error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body || {};
    const allowed = ['name', 'email', 'mobileNo', 'address', 'villageGramaPanchayat', 'pincode', 'state', 'district', 'taluk', 'post'];

    allowed.forEach((field) => {
      if (updates[field] !== undefined) {
        req.user.personalInfo = req.user.personalInfo || {};
        req.user.personalInfo[field] = updates[field];
      }
    });

    await req.user.save();

    return res.json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    console.error('updateProfile error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};