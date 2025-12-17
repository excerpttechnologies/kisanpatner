const Farmer = require('../models/Farmer');
const bcrypt = require('bcryptjs');
const axios = require('axios');

// In-memory OTP store (use Redis in production)
const otpStore = new Map();


// With this (using your credentials from first code):
const WHATSAPP_TOKEN = 'EAAdzxxobLG4BPU8Lei8DhhuZCjlCthpNQ55ok3LGlpY1PSIzXsOnTrEje2BvKUZCjFPOWlTtJg1TezXPgjp7NrCPN5Nzv6x2BOF7lMQml80v4NNIIWFEZAy5H7ZBZAgk7ZBku0y7QIBIwMsQ9ZCVe6JpbAa9wSz1dHb7xeDJTw7msm7AoxF1YMumg01P1LGBAZDZD';
const WHATSAPP_PHONE_ID = '671028016100461';
const WHATSAPP_API_URL = `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`;
// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendWhatsAppOTP = async (phoneNumber, otp) => {
  try {
    const response = await axios.post(WHATSAPP_API_URL, {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: "login_otp_new",  // Your WhatsApp template name
        language: {
          code: "en_US"
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: otp
              }
            ]
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: [
              {
                type: "text",
                text: otp
              }
            ]
          }
        ]
      }
    }, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('WhatsApp API Error:', error.response?.data || error.message);
    throw new Error('Failed to send OTP via WhatsApp');
  }
};

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { mobileNo, role } = req.body;

    if (!mobileNo) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required'
      });
    }

    // Validate phone number format
    if (!/^[0-9]{10}$/.test(mobileNo)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit mobile number'
      });
    }

    // Check if farmer exists
    const farmer = await Farmer.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true
    });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found. Please register first.'
      });
    }

    // Check role if provided
    if (role && farmer.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account is registered as ${farmer.role}, not ${role}`
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiration (5 minutes)
    const otpData = {
      otp: otp,
      mobileNo: mobileNo,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      attempts: 0
    };
    
    otpStore.set(mobileNo, otpData);

    // Send OTP via WhatsApp
    try {
      await sendWhatsAppOTP(mobileNo, otp);
      
      res.status(200).json({
        success: true,
        message: 'OTP sent successfully to your WhatsApp'
      });
    } catch (whatsappError) {
      // If WhatsApp fails, you might want to fall back to SMS
      console.error('WhatsApp send failed:', whatsappError);
      
      // For development/testing, you can return the OTP in response
      // REMOVE THIS IN PRODUCTION
      res.status(200).json({
        success: true,
        message: 'OTP generated (WhatsApp service unavailable)',
        otp: otp // Remove in production!
      });
    }

  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send OTP'
    });
  }
};

// Verify OTP and Login
exports.verifyOtpLogin = async (req, res) => {
  try {
    const { mobileNo, otp, role } = req.body;

    if (!mobileNo || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and OTP are required'
      });
    }

    // Check if OTP exists
    const otpData = otpStore.get(mobileNo);
    
    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found. Please request a new OTP.'
      });
    }

    // Check if OTP is expired
    if (Date.now() > otpData.expiresAt) {
      otpStore.delete(mobileNo);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.'
      });
    }

    // Check attempts (max 3 attempts)
    if (otpData.attempts >= 3) {
      otpStore.delete(mobileNo);
      return res.status(400).json({
        success: false,
        message: 'Too many failed attempts. Please request a new OTP.'
      });
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      otpData.attempts += 1;
      otpStore.set(mobileNo, otpData);
      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.`
      });
    }

    // OTP is valid, get farmer details
    const farmer = await Farmer.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true
    }).populate('commodities');

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    // Check role if provided
    if (role && farmer.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account is registered as ${farmer.role}, not ${role}`
      });
    }

    // Clear OTP from store
    otpStore.delete(mobileNo);

    // Prepare response data
    const farmerData = farmer.toObject();
    delete farmerData.security.mpin;
    delete farmerData.security.password;

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        id: farmer._id,
        name: farmer.personalInfo.name,
        mobileNo: farmer.personalInfo.mobileNo,
        email: farmer.personalInfo.email,
        role: farmer.role,
        state: farmer.personalInfo.state,
        district: farmer.personalInfo.district
      }
    });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during OTP verification'
    });
  }
};

// Login with MPIN
exports.loginWithMpin = async (req, res) => {
  try {
    const { mobileNo, mpin, role } = req.body;

    if (!mobileNo || !mpin) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and MPIN are required'
      });
    }

    // Validate MPIN format
    if (!/^[0-9]{4}$/.test(mpin)) {
      return res.status(400).json({
        success: false,
        message: 'MPIN must be 4 digits'
      });
    }

    const farmer = await Farmer.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true 
    }).populate('commodities');

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    // Check role if provided
    if (role && farmer.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account is registered as ${farmer.role}, not ${role}`
      });
    }

    // Verify MPIN
    const isMatch = await bcrypt.compare(mpin, farmer.security.mpin);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid MPIN'
      });
    }

    // Prepare response data
    const farmerData = farmer.toObject();
    delete farmerData.security.mpin;
    delete farmerData.security.password;

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        id: farmer._id,
        name: farmer.personalInfo.name,
        mobileNo: farmer.personalInfo.mobileNo,
        email: farmer.personalInfo.email,
        role: farmer.role,
        state: farmer.personalInfo.state,
        district: farmer.personalInfo.district
      }
    });

  } catch (error) {
    console.error('Login with MPIN Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Login with Password
exports.loginWithPassword = async (req, res) => {
  try {
    const { mobileNo, password, role } = req.body;

    if (!mobileNo || !password) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and password are required'
      });
    }

    const farmer = await Farmer.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true 
    }).populate('commodities');

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    // Check role if provided
    if (role && farmer.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account is registered as ${farmer.role}, not ${role}`
      });
    }

    // Verify Password
    const isMatch = await bcrypt.compare(password, farmer.security.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Prepare response data
    const farmerData = farmer.toObject();
    delete farmerData.security.mpin;
    delete farmerData.security.password;

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        id: farmer._id,
        name: farmer.personalInfo.name,
        mobileNo: farmer.personalInfo.mobileNo,
        email: farmer.personalInfo.email,
        role: farmer.role,
        state: farmer.personalInfo.state,
        district: farmer.personalInfo.district
      }
    });

  } catch (error) {
    console.error('Login with Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Clear expired OTPs (run periodically)
exports.clearExpiredOtps = () => {
  const now = Date.now();
  for (const [phone, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(phone);
    }
  }
};

// Run cleanup every 5 minutes
setInterval(exports.clearExpiredOtps, 5 * 60 * 1000);