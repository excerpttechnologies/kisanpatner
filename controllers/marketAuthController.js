const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');
const { registerSchema, validate } = require('../validators/marketValidators');

exports.register = async (req, res) => {
  try {
    const { mobileNumber, password, mpin, email, role, state, district, taluk, village } = req.body;

    if (await User.exists({ mobileNumber }))
      return res.status(409).json({ success: false, message: 'Mobile number already registered' });

    const [hashedPwd, hashedMpin] = await Promise.all([
      bcrypt.hash(password, 10),
      bcrypt.hash(mpin, 10),
    ]);

    const user = await User.create({
      mobileNumber, role,
      security: { password: hashedPwd, mpin: hashedMpin },
      email, state, district, taluk, village,
    });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      success: true, message: 'Registration successful',
      data: { token, user: user.toSafeObject() },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;
    const user = await User.findOne({ mobileNumber, isActive: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const ok = await bcrypt.compare(password, user.security.password);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ success: true, message: 'Login successful', data: { token, user: user.toSafeObject() } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};
