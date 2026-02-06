const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');

const SECRET = process.env.JWT_SECRET || 'supersecret';

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, SECRET);
    if (!payload || !payload.id) {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }

    const user = await Farmer.findById(payload.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message || err);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};