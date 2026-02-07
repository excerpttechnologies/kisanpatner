const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');
const Transporter = require('../models/Transporter');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No authentication token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Find user in either Farmer or Transporter collection
    let user = await Farmer.findById(decoded.userId);
    let userType = 'farmer';

    if (!user) {
      user = await Transporter.findById(decoded.userId);
      userType = 'transporter';
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Add user info to request
    req.user = {
      _id: user._id,
      id: user._id.toString(),
      role: user.role || userType,
      ...user.toObject()
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = auth;