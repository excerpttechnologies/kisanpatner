// const bcrypt = require('bcryptjs');
// const jwt    = require('jsonwebtoken');
// const User   = require('../models/User');
// const { registerSchema, validate } = require('../validators/marketValidators');

// exports.register = async (req, res) => {
//   try {
//     const { mobileNumber, password, mpin, email, role, state, district, taluk, village } = req.body;

//     if (await User.exists({ mobileNumber }))
//       return res.status(409).json({ success: false, message: 'Mobile number already registered' });

//     const [hashedPwd, hashedMpin] = await Promise.all([
//       bcrypt.hash(password, 10),
//       bcrypt.hash(mpin, 10),
//     ]);

//     const user = await User.create({
//       mobileNumber, role,
//       security: { password: hashedPwd, mpin: hashedMpin },
//       email, state, district, taluk, village,
//     });

//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

//     res.status(201).json({
//       success: true, message: 'Registration successful',
//       data: { token, user: user.toSafeObject() },
//     });
//   } catch (err) {
//     console.error('Register error:', err);
//     res.status(500).json({ success: false, message: 'Registration failed' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { mobileNumber, password } = req.body;
//     const user = await User.findOne({ mobileNumber, isActive: true });
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });

//     const ok = await bcrypt.compare(password, user.security.password);
//     if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
//     res.json({ success: true, message: 'Login successful', data: { token, user: user.toSafeObject() } });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Login failed' });
//   }
// };









// //updated by sagar
// const bcrypt = require('bcryptjs');
// const jwt    = require('jsonwebtoken');
// const User   = require('../models/User');
// const B2BUser = require('../models/B2BUser');  // ← new B2B model

// const { registerSchema, validate } = require('../validators/marketValidators');

// exports.register = async (req, res) => {
//   try {
//     const { mobileNumber, password, mpin, email, role, state, district, taluk, village } = req.body;

//     if (await User.exists({ mobileNumber }))
//       return res.status(409).json({ success: false, message: 'Mobile number already registered' });

//     const [hashedPwd, hashedMpin] = await Promise.all([
//       bcrypt.hash(password, 10),
//       bcrypt.hash(mpin, 10),
//     ]);

//     const user = await User.create({
//       mobileNumber, role,
//       security: { password: hashedPwd, mpin: hashedMpin },
//       email, state, district, taluk, village,
//     });

//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

//     res.status(201).json({
//       success: true, message: 'Registration successful',
//       data: { token, user: user.toSafeObject() },
//     });
//   } catch (err) {
//     console.error('Register error:', err);
//     res.status(500).json({ success: false, message: 'Registration failed' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { mobileNumber, password } = req.body;
//     const user = await User.findOne({ mobileNumber, isActive: true });
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });

//     const ok = await bcrypt.compare(password, user.security.password);
//     if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
//     res.json({ success: true, message: 'Login successful', data: { token, user: user.toSafeObject() } });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Login failed' });
//   }
// };











// // ════════════════════════════════════════════════════════════════════════════════
// // NEW B2B FUNCTIONS — uses B2BUser model (b2busers collection)
// // Does NOT touch User model or any farmer/trader functionality
// // ════════════════════════════════════════════════════════════════════════════════
 
// // POST /api/b2b/register
// exports.b2bRegister = async (req, res) => {
//   try {
//     const {
//       mobileNumber, password, mpin,
//       businessName, businessType, gstNumber,
//       name, email, state, district, taluk, village,
//     } = req.body;
 
//     // ── Validate required fields ───────────────────────────────────────────
//     if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber))
//       return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required' });
//     if (!businessName?.trim())
//       return res.status(400).json({ success: false, message: 'Business name is required' });
//     if (!businessType)
//       return res.status(400).json({ success: false, message: 'Business type is required' });
//     if (!password || password.length < 6)
//       return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
//     if (!mpin || !/^[0-9]{4}$/.test(mpin))
//       return res.status(400).json({ success: false, message: 'MPIN must be exactly 4 digits' });
 
//     // ── Check duplicate in B2B collection only ─────────────────────────────
//     const existing = await B2BUser.findOne({ mobileNumber });
//     if (existing)
//       return res.status(409).json({ success: false, message: 'This mobile number is already registered. Please login.' });
 
//     // ── Hash password and MPIN ─────────────────────────────────────────────
//     const [hashedPwd, hashedMpin] = await Promise.all([
//       bcrypt.hash(password, 10),
//       bcrypt.hash(mpin, 10),
//     ]);
 
//     // ── Create B2B user ────────────────────────────────────────────────────
//     const user = await B2BUser.create({
//       mobileNumber,
//       businessName: businessName.trim(),
//       businessType,
//       gstNumber:    gstNumber?.trim() || '',
//       name:         name?.trim()      || businessName.trim(),
//       email:        email?.trim()     || '',
//       state:        state             || '',
//       district:     district          || '',
//       taluk:        taluk             || '',
//       village:      village           || '',
//       security: {
//         password: hashedPwd,
//         mpin:     hashedMpin,
//       },
//       role:     'b2b_buyer',
//       isActive: true,
//     });
 
//     const token = signToken(user);
 
//     return res.status(201).json({
//       success: true,
//       message: 'Registration successful! Welcome to KisanPatner B2B.',
//       data: { token, user: user.toSafeObject() },
//     });
 
//   } catch (err) {
//     console.error('B2B Register error:', err);
//     if (err.code === 11000)
//       return res.status(409).json({ success: false, message: 'This mobile number is already registered.' });
//     return res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
//   }
// };
 
// // POST /api/b2b/send-otp
// exports.b2bSendOtp = async (req, res) => {
//   try {
//     const { mobileNumber } = req.body;
 
//     if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber))
//       return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required' });
 
//     // Check user exists in B2B collection
//     const user = await B2BUser.findOne({ mobileNumber, isActive: true });
//     if (!user)
//       return res.status(404).json({ success: false, message: 'No B2B account found. Please register first.' });
 
//     const otp = generateOTP();
//     otpStore.set(`b2b_${mobileNumber}`, {
//       otp,
//       expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
//       attempts: 0,
//     });
 
//     try {
//       await sendWhatsAppOTP(mobileNumber, otp);
//       return res.json({ success: true, message: 'OTP sent successfully to your WhatsApp' });
//     } catch (whatsappErr) {
//       console.error('WhatsApp send failed:', whatsappErr.message);
//       // Dev fallback
//       return res.json({ success: true, message: 'OTP generated', otp });
//     }
 
//   } catch (err) {
//     console.error('B2B Send OTP error:', err);
//     return res.status(500).json({ success: false, message: 'Failed to send OTP' });
//   }
// };
 
// // POST /api/b2b/verify-otp-login
// exports.b2bVerifyOtpLogin = async (req, res) => {
//   try {
//     const { mobileNumber, otp } = req.body;
 
//     if (!mobileNumber || !otp)
//       return res.status(400).json({ success: false, message: 'Mobile number and OTP are required' });
 
//     const otpData = otpStore.get(`b2b_${mobileNumber}`);
//     if (!otpData)
//       return res.status(400).json({ success: false, message: 'OTP not found. Please request a new OTP.' });
//     if (Date.now() > otpData.expiresAt) {
//       otpStore.delete(`b2b_${mobileNumber}`);
//       return res.status(400).json({ success: false, message: 'OTP expired. Please request a new OTP.' });
//     }
//     if (otpData.attempts >= 3) {
//       otpStore.delete(`b2b_${mobileNumber}`);
//       return res.status(400).json({ success: false, message: 'Too many attempts. Please request a new OTP.' });
//     }
//     if (otpData.otp !== otp) {
//       otpData.attempts += 1;
//       otpStore.set(`b2b_${mobileNumber}`, otpData);
//       return res.status(400).json({
//         success: false,
//         message: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.`,
//       });
//     }
 
//     const user = await B2BUser.findOne({ mobileNumber, isActive: true });
//     if (!user)
//       return res.status(404).json({ success: false, message: 'User not found' });
 
//     otpStore.delete(`b2b_${mobileNumber}`);
//     const token = signToken(user);
 
//     return res.json({
//       success: true,
//       message: 'Login successful!',
//       data: { token, user: user.toSafeObject() },
//     });
 
//   } catch (err) {
//     console.error('B2B Verify OTP error:', err);
//     return res.status(500).json({ success: false, message: 'Login failed' });
//   }
// };
 
// // POST /api/b2b/login-mpin
// exports.b2bLoginMpin = async (req, res) => {
//   try {
//     const { mobileNumber, mpin } = req.body;
 
//     if (!mobileNumber || !mpin)
//       return res.status(400).json({ success: false, message: 'Mobile number and MPIN are required' });
//     if (!/^[0-9]{4}$/.test(mpin))
//       return res.status(400).json({ success: false, message: 'MPIN must be 4 digits' });
 
//     const user = await B2BUser.findOne({ mobileNumber, isActive: true });
//     if (!user)
//       return res.status(404).json({ success: false, message: 'No B2B account found with this mobile number.' });
 
//     const ok = await bcrypt.compare(mpin, user.security.mpin);
//     if (!ok)
//       return res.status(401).json({ success: false, message: 'Invalid MPIN.' });
 
//     const token = signToken(user);
//     return res.json({
//       success: true,
//       message: 'Login successful!',
//       data: { token, user: user.toSafeObject() },
//     });
 
//   } catch (err) {
//     console.error('B2B Login MPIN error:', err);
//     return res.status(500).json({ success: false, message: 'Login failed' });
//   }
// };
 
// // POST /api/b2b/login-password
// exports.b2bLoginPassword = async (req, res) => {
//   try {
//     const { mobileNumber, password } = req.body;
 
//     if (!mobileNumber || !password)
//       return res.status(400).json({ success: false, message: 'Mobile number and password are required' });
 
//     const user = await B2BUser.findOne({ mobileNumber, isActive: true });
//     if (!user)
//       return res.status(404).json({ success: false, message: 'No B2B account found with this mobile number.' });
 
//     const ok = await bcrypt.compare(password, user.security.password);
//     if (!ok)
//       return res.status(401).json({ success: false, message: 'Invalid password.' });
 
//     const token = signToken(user);
//     return res.json({
//       success: true,
//       message: 'Login successful!',
//       data: { token, user: user.toSafeObject() },
//     });
 
//   } catch (err) {
//     console.error('B2B Login Password error:', err);
//     return res.status(500).json({ success: false, message: 'Login failed' });
//   }
// };
 
// // GET /api/b2b/profile/:id
// exports.b2bGetProfile = async (req, res) => {
//   try {
//     const user = await B2BUser.findById(req.params.id).select('-security -__v');
//     if (!user)
//       return res.status(404).json({ success: false, message: 'B2B user not found' });
//     return res.json({ success: true, data: user.toSafeObject() });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: 'Failed to fetch profile' });
//   }
// };
 
// // PUT /api/b2b/profile/:id
// exports.b2bUpdateProfile = async (req, res) => {
//   try {
//     const {
//       name, email, address, gstNumber,
//       businessName, businessType,
//       state, district, taluk, village,
//     } = req.body;
 
//     const user = await B2BUser.findById(req.params.id);
//     if (!user)
//       return res.status(404).json({ success: false, message: 'B2B user not found' });
 
//     // Update only provided fields
//     if (name)         user.name         = name.trim();
//     if (email)        user.email        = email.trim();
//     if (address)      user.address      = address.trim();
//     if (gstNumber !== undefined) user.gstNumber = gstNumber.trim();
//     if (businessName) user.businessName = businessName.trim();
//     if (businessType) user.businessType = businessType;
//     if (state)        user.state        = state;
//     if (district)     user.district     = district;
//     if (taluk)        user.taluk        = taluk;
//     if (village)      user.village      = village;
 
//     await user.save();
//     return res.json({ success: true, message: 'Profile updated successfully', data: user.toSafeObject() });
 
//   } catch (err) {
//     console.error('B2B Update Profile error:', err);
//     return res.status(500).json({ success: false, message: 'Failed to update profile' });
//   }
// };
 
// // POST /api/b2b/change-password
// exports.b2bChangePassword = async (req, res) => {
//   try {
//     const { mobileNumber, currentPassword, newPassword } = req.body;
 
//     if (!mobileNumber || !currentPassword || !newPassword)
//       return res.status(400).json({ success: false, message: 'All fields are required' });
//     if (newPassword.length < 6)
//       return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
 
//     const user = await B2BUser.findOne({ mobileNumber });
//     if (!user)
//       return res.status(404).json({ success: false, message: 'User not found' });
 
//     const ok = await bcrypt.compare(currentPassword, user.security.password);
//     if (!ok)
//       return res.status(401).json({ success: false, message: 'Current password is incorrect' });
 
//     user.security.password = await bcrypt.hash(newPassword, 10);
//     await user.save();
 
//     return res.json({ success: true, message: 'Password changed successfully' });
 
//   } catch (err) {
//     console.error('B2B Change Password error:', err);
//     return res.status(500).json({ success: false, message: 'Failed to change password' });
//   }
// };
 
// // OTP cleanup
// setInterval(() => {
//   const now = Date.now();
//   for (const [key, data] of otpStore.entries()) {
//     if (now > data.expiresAt) otpStore.delete(key);
//   }
// }, 5 * 60 * 1000);





//updated by sagar

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const axios  = require('axios');
const User   = require('../models/User');       // ← farmer/trader — UNTOUCHED
const B2BUser = require('../models/B2BUser');  // ← new B2B model

// ─── WhatsApp OTP config (same as existing authcontroller.js) ─────────────────
const WHATSAPP_TOKEN    = process.env.WHATSAPP_TOKEN    || '';
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID || '938666512664917';
const WHATSAPP_API_URL  = `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`;

// ─── OTP store (in-memory) ────────────────────────────────────────────────────
const otpStore = new Map();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendWhatsAppOTP = async (phoneNumber, otp) => {
  await axios.post(
    WHATSAPP_API_URL,
    {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'template',
      template: {
        name: 'login_otp_new',
        language: { code: 'en_US' },
        components: [
          { type: 'body', parameters: [{ type: 'text', text: otp }] },
          { type: 'button', sub_type: 'url', index: '0', parameters: [{ type: 'text', text: otp }] },
        ],
      },
    },
    { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' } }
  );
};

const signToken = (user) =>
  jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

// ════════════════════════════════════════════════════════════════════════════════
// EXISTING FUNCTIONS — COMPLETELY UNTOUCHED (farmer/trader)
// ════════════════════════════════════════════════════════════════════════════════

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

// ════════════════════════════════════════════════════════════════════════════════
// NEW B2B FUNCTIONS — uses B2BUser model (b2busers collection)
// Does NOT touch User model or any farmer/trader functionality
// ════════════════════════════════════════════════════════════════════════════════

// POST /api/b2b/register
exports.b2bRegister = async (req, res) => {
  try {
    const {
      mobileNumber, password, mpin,
      businessName, businessType, gstNumber,
      name, email, state, district, taluk, village,
    } = req.body;

    // ── Validate required fields ───────────────────────────────────────────
    if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber))
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required' });
    if (!businessName?.trim())
      return res.status(400).json({ success: false, message: 'Business name is required' });
    if (!businessType)
      return res.status(400).json({ success: false, message: 'Business type is required' });
    if (!password || password.length < 6)
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    if (!mpin || !/^[0-9]{4}$/.test(mpin))
      return res.status(400).json({ success: false, message: 'MPIN must be exactly 4 digits' });

    // ── Check duplicate in B2B collection only ─────────────────────────────
    const existing = await B2BUser.findOne({ mobileNumber });
    if (existing)
      return res.status(409).json({ success: false, message: 'This mobile number is already registered. Please login.' });

    // ── Hash password and MPIN ─────────────────────────────────────────────
    const [hashedPwd, hashedMpin] = await Promise.all([
      bcrypt.hash(password, 10),
      bcrypt.hash(mpin, 10),
    ]);

    // ── Create B2B user ────────────────────────────────────────────────────
    const user = await B2BUser.create({
      mobileNumber,
      businessName: businessName.trim(),
      businessType,
      gstNumber:    gstNumber?.trim() || '',
      name:         name?.trim()      || businessName.trim(),
      email:        email?.trim()     || '',
      state:        state             || '',
      district:     district          || '',
      taluk:        taluk             || '',
      village:      village           || '',
      security: {
        password: hashedPwd,
        mpin:     hashedMpin,
      },
      role:     'b2b_buyer',
      isActive: true,
    });

    const token = signToken(user);

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to KisanPatner B2B.',
      data: { token, user: user.toSafeObject() },
    });

  } catch (err) {
    console.error('B2B Register error:', err);
    if (err.code === 11000)
      return res.status(409).json({ success: false, message: 'This mobile number is already registered.' });
    return res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
  }
};

// POST /api/b2b/send-otp
exports.b2bSendOtp = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber))
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required' });

    // Check user exists in B2B collection
    const user = await B2BUser.findOne({ mobileNumber, isActive: true });
    if (!user)
      return res.status(404).json({ success: false, message: 'No B2B account found. Please register first.' });

    const otp = generateOTP();
    otpStore.set(`b2b_${mobileNumber}`, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
      attempts: 0,
    });

    try {
      await sendWhatsAppOTP(mobileNumber, otp);
      return res.json({ success: true, message: 'OTP sent successfully to your WhatsApp' });
    } catch (whatsappErr) {
      console.error('WhatsApp send failed:', whatsappErr.message);
      // Dev fallback
      return res.json({ success: true, message: 'OTP generated', otp });
    }

  } catch (err) {
    console.error('B2B Send OTP error:', err);
    return res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

// POST /api/b2b/verify-otp-login
exports.b2bVerifyOtpLogin = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp)
      return res.status(400).json({ success: false, message: 'Mobile number and OTP are required' });

    const otpData = otpStore.get(`b2b_${mobileNumber}`);
    if (!otpData)
      return res.status(400).json({ success: false, message: 'OTP not found. Please request a new OTP.' });
    if (Date.now() > otpData.expiresAt) {
      otpStore.delete(`b2b_${mobileNumber}`);
      return res.status(400).json({ success: false, message: 'OTP expired. Please request a new OTP.' });
    }
    if (otpData.attempts >= 3) {
      otpStore.delete(`b2b_${mobileNumber}`);
      return res.status(400).json({ success: false, message: 'Too many attempts. Please request a new OTP.' });
    }
    if (otpData.otp !== otp) {
      otpData.attempts += 1;
      otpStore.set(`b2b_${mobileNumber}`, otpData);
      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.`,
      });
    }

    const user = await B2BUser.findOne({ mobileNumber, isActive: true });
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    otpStore.delete(`b2b_${mobileNumber}`);
    const token = signToken(user);

    return res.json({
      success: true,
      message: 'Login successful!',
      data: { token, user: user.toSafeObject() },
    });

  } catch (err) {
    console.error('B2B Verify OTP error:', err);
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
};

// POST /api/b2b/login-mpin
exports.b2bLoginMpin = async (req, res) => {
  try {
    const { mobileNumber, mpin } = req.body;

    if (!mobileNumber || !mpin)
      return res.status(400).json({ success: false, message: 'Mobile number and MPIN are required' });
    if (!/^[0-9]{4}$/.test(mpin))
      return res.status(400).json({ success: false, message: 'MPIN must be 4 digits' });

    const user = await B2BUser.findOne({ mobileNumber, isActive: true });
    if (!user)
      return res.status(404).json({ success: false, message: 'No B2B account found with this mobile number.' });

    const ok = await bcrypt.compare(mpin, user.security.mpin);
    if (!ok)
      return res.status(401).json({ success: false, message: 'Invalid MPIN.' });

    const token = signToken(user);
    return res.json({
      success: true,
      message: 'Login successful!',
      data: { token, user: user.toSafeObject() },
    });

  } catch (err) {
    console.error('B2B Login MPIN error:', err);
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
};

// POST /api/b2b/login-password
exports.b2bLoginPassword = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber || !password)
      return res.status(400).json({ success: false, message: 'Mobile number and password are required' });

    const user = await B2BUser.findOne({ mobileNumber, isActive: true });
    if (!user)
      return res.status(404).json({ success: false, message: 'No B2B account found with this mobile number.' });

    const ok = await bcrypt.compare(password, user.security.password);
    if (!ok)
      return res.status(401).json({ success: false, message: 'Invalid password.' });

    const token = signToken(user);
    return res.json({
      success: true,
      message: 'Login successful!',
      data: { token, user: user.toSafeObject() },
    });

  } catch (err) {
    console.error('B2B Login Password error:', err);
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
};

// GET /api/b2b/profile/:id
exports.b2bGetProfile = async (req, res) => {
  try {
    const user = await B2BUser.findById(req.params.id).select('-security -__v');
    if (!user)
      return res.status(404).json({ success: false, message: 'B2B user not found' });
    return res.json({ success: true, data: user.toSafeObject() });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

// PUT /api/b2b/profile/:id
exports.b2bUpdateProfile = async (req, res) => {
  try {
    const {
      name, email, address, gstNumber,
      businessName, businessType,
      state, district, taluk, village,
    } = req.body;

    const user = await B2BUser.findById(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: 'B2B user not found' });

    // Update only provided fields
    if (name)         user.name         = name.trim();
    if (email)        user.email        = email.trim();
    if (address)      user.address      = address.trim();
    if (gstNumber !== undefined) user.gstNumber = gstNumber.trim();
    if (businessName) user.businessName = businessName.trim();
    if (businessType) user.businessType = businessType;
    if (state)        user.state        = state;
    if (district)     user.district     = district;
    if (taluk)        user.taluk        = taluk;
    if (village)      user.village      = village;

    await user.save();
    return res.json({ success: true, message: 'Profile updated successfully', data: user.toSafeObject() });

  } catch (err) {
    console.error('B2B Update Profile error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};

// POST /api/b2b/change-password
exports.b2bChangePassword = async (req, res) => {
  try {
    const { mobileNumber, currentPassword, newPassword } = req.body;

    if (!mobileNumber || !currentPassword || !newPassword)
      return res.status(400).json({ success: false, message: 'All fields are required' });
    if (newPassword.length < 6)
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });

    const user = await B2BUser.findOne({ mobileNumber });
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    const ok = await bcrypt.compare(currentPassword, user.security.password);
    if (!ok)
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });

    user.security.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ success: true, message: 'Password changed successfully' });

  } catch (err) {
    console.error('B2B Change Password error:', err);
    return res.status(500).json({ success: false, message: 'Failed to change password' });
  }
};

// OTP cleanup
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of otpStore.entries()) {
    if (now > data.expiresAt) otpStore.delete(key);
  }
}, 5 * 60 * 1000);