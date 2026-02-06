const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = process.env.JWT_SECRET || 'supersecret';

// Prepare user response with all necessary fields
const prepareUserResponse = (user) => {
  const responseData = {
    id: user._id,
    name: user.personalInfo.name,
    mobileNo: user.personalInfo.mobileNo,
    email: user.personalInfo.email,
    role: user.role,
    state: user.personalInfo.state,
    district: user.personalInfo.district
  };

  // Add role-specific fields
  if (user.role === 'farmer') {
    responseData.farmerId = user.farmerId;
  } else if (user.role === 'trader') {
    responseData.traderId = user.farmerId;
  } else if (user.role === 'transport' || user.role === 'transporter') {
    responseData.vehicleType = user.transportInfo?.vehicleType;
    responseData.vehicleNumber = user.transportInfo?.vehicleNumber;
  }

  return responseData;
};

// Simple login endpoint to issue JWT (mobileNo + mpin/password)
router.post('/login', async (req, res) => {
  try {
    const { mobileNo, mpin, password } = req.body;
    if (!mobileNo) return res.status(400).json({ success: false, message: 'mobileNo required' });

    const user = await Farmer.findOne({ 'personalInfo.mobileNo': mobileNo, isActive: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    let match = false;
    if (mpin) match = await bcrypt.compare(mpin, user.security.mpin);
    else if (password) match = await bcrypt.compare(password, user.security.password);
    else return res.status(400).json({ success: false, message: 'Provide mpin or password' });

    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '7d' });

    return res.json({ success: true, token, data: prepareUserResponse(user) });
  } catch (err) {
    console.error('auth/login error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;