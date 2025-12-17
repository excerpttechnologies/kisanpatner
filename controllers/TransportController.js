// // controllers/transporterController.js
// const Transporter = require('../models/Transporter');
// const bcrypt = require('bcryptjs');
// const axios = require('axios');

// // In-memory OTP store (use Redis in production)
// const otpStore = new Map();

// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const WHATSAPP_TOKEN = 'EAAdzxxobLG4BPU8Lei8DhhuZCjlCthpNQ55ok3LGlpY1PSIzXsOnTrEje2BvKUZCjFPOWlTtJg1TezXPgjp7NrCPN5Nzv6x2BOF7lMQml80v4NNIIWFEZAy5H7ZBZAgk7ZBku0y7QIBIwMsQ9ZCVe6JpbAa9wSz1dHb7xeDJTw7msm7AoxF1YMumg01P1LGBAZDZD';
// const WHATSAPP_PHONE_ID = '671028016100461';
// const WHATSAPP_API_URL = `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`;

// const sendWhatsAppOTP = async (phoneNumber, otp) => {
//   try {
//     const response = await axios.post(WHATSAPP_API_URL, {
//       messaging_product: "whatsapp",
//       to: phoneNumber,
//       type: "template",
//       template: {
//         name: "login_otp_new",
//         language: {
//           code: "en_US"
//         },
//         components: [
//           {
//             type: "body",
//             parameters: [
//               {
//                 type: "text",
//                 text: otp
//               }
//             ]
//           },
//           {
//             type: "button",
//             sub_type: "url",
//             index: "0",
//             parameters: [
//               {
//                 type: "text",
//                 text: otp
//               }
//             ]
//           }
//         ]
//       }
//     }, {
//       headers: {
//         'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.error('WhatsApp API Error:', error.response?.data || error.message);
//     throw new Error('Failed to send OTP via WhatsApp');
//   }
// };

// // Send OTP for transporter
// exports.sendOtp = async (req, res) => {
//   try {
//     const { mobileNo } = req.body;

//     if (!mobileNo) {
//       return res.status(400).json({
//         success: false,
//         message: 'Mobile number is required'
//       });
//     }

//     // Validate phone number format
//     if (!/^[0-9]{10}$/.test(mobileNo)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter a valid 10-digit mobile number'
//       });
//     }

//     // Check if transporter exists
//     const transporter = await Transporter.findOne({ 
//       'personalInfo.mobileNo': mobileNo,
//       isActive: true
//     });

//     if (!transporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found. Please register first.'
//       });
//     }

//     // Generate OTP
//     const otp = generateOTP();
    
//     // Store OTP with expiration (5 minutes)
//     const otpData = {
//       otp: otp,
//       mobileNo: mobileNo,
//       expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
//       attempts: 0
//     };
    
//     otpStore.set(mobileNo, otpData);

//     // Send OTP via WhatsApp
//     try {
//       await sendWhatsAppOTP(mobileNo, otp);
      
//       res.status(200).json({
//         success: true,
//         message: 'OTP sent successfully to your WhatsApp'
//       });
//     } catch (whatsappError) {
//       console.error('WhatsApp send failed:', whatsappError);
      
//       // For development/testing
//       res.status(200).json({
//         success: true,
//         message: 'OTP generated (WhatsApp service unavailable)',
//         otp: otp // Remove in production!
//       });
//     }

//   } catch (error) {
//     console.error('Send OTP Error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to send OTP'
//     });
//   }
// };

// // Verify OTP and Login for transporter
// exports.verifyOtpLogin = async (req, res) => {
//   try {
//     const { mobileNo, otp } = req.body;

//     if (!mobileNo || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: 'Mobile number and OTP are required'
//       });
//     }

//     // Check if OTP exists
//     const otpData = otpStore.get(mobileNo);
    
//     if (!otpData) {
//       return res.status(400).json({
//         success: false,
//         message: 'OTP not found. Please request a new OTP.'
//       });
//     }

//     // Check if OTP is expired
//     if (Date.now() > otpData.expiresAt) {
//       otpStore.delete(mobileNo);
//       return res.status(400).json({
//         success: false,
//         message: 'OTP has expired. Please request a new OTP.'
//       });
//     }

//     // Check attempts (max 3 attempts)
//     if (otpData.attempts >= 3) {
//       otpStore.delete(mobileNo);
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new OTP.'
//       });
//     }

//     // Verify OTP
//     if (otpData.otp !== otp) {
//       otpData.attempts += 1;
//       otpStore.set(mobileNo, otpData);
//       return res.status(400).json({
//         success: false,
//         message: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.`
//       });
//     }

//     // OTP is valid, get transporter details
//     const transporter = await Transporter.findOne({ 
//       'personalInfo.mobileNo': mobileNo,
//       isActive: true
//     });

//     if (!transporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found'
//       });
//     }

//     // Update last login
//     transporter.lastLogin = new Date();
//     await transporter.save();

//     // Clear OTP from store
//     otpStore.delete(mobileNo);

//     // Prepare response data
//     const transporterData = transporter.toObject();
//     delete transporterData.security.mpin;
//     delete transporterData.security.password;

//     res.status(200).json({
//       success: true,
//       message: 'Login successful!',
//       data: {
//         id: transporter._id,
//         name: transporter.personalInfo.name,
//         mobileNo: transporter.personalInfo.mobileNo,
//         email: transporter.personalInfo.email,
//         role: transporter.role,
//         state: transporter.personalInfo.state,
//         district: transporter.personalInfo.district,
//         vehicleType: transporter.transportInfo?.vehicleType,
//         vehicleNumber: transporter.transportInfo?.vehicleNumber,
//         rating: transporter.rating,
//         totalTrips: transporter.totalTrips
//       }
//     });

//   } catch (error) {
//     console.error('Verify OTP Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during OTP verification'
//     });
//   }
// };

// // Login with MPIN for transporter
// exports.loginWithMpin = async (req, res) => {
//   try {
//     const { mobileNo, mpin } = req.body;

//     if (!mobileNo || !mpin) {
//       return res.status(400).json({
//         success: false,
//         message: 'Mobile number and MPIN are required'
//       });
//     }

//     // Validate MPIN format
//     if (!/^[0-9]{4}$/.test(mpin)) {
//       return res.status(400).json({
//         success: false,
//         message: 'MPIN must be 4 digits'
//       });
//     }

//     const transporter = await Transporter.findOne({ 
//       'personalInfo.mobileNo': mobileNo,
//       isActive: true 
//     });

//     if (!transporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found'
//       });
//     }

//     // Verify MPIN
//     const isMatch = await bcrypt.compare(mpin, transporter.security.mpin);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid MPIN'
//       });
//     }

//     // Update last login
//     transporter.lastLogin = new Date();
//     await transporter.save();

//     // Prepare response data
//     const transporterData = transporter.toObject();
//     delete transporterData.security.mpin;
//     delete transporterData.security.password;

//     res.status(200).json({
//       success: true,
//       message: 'Login successful!',
//       data: {
//         id: transporter._id,
//         name: transporter.personalInfo.name,
//         mobileNo: transporter.personalInfo.mobileNo,
//         email: transporter.personalInfo.email,
//         role: transporter.role,
//         state: transporter.personalInfo.state,
//         district: transporter.personalInfo.district,
//         vehicleType: transporter.transportInfo?.vehicleType,
//         vehicleNumber: transporter.transportInfo?.vehicleNumber,
//         rating: transporter.rating,
//         totalTrips: transporter.totalTrips
//       }
//     });

//   } catch (error) {
//     console.error('Login with MPIN Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during login'
//     });
//   }
// };

// // Login with Password for transporter
// exports.loginWithPassword = async (req, res) => {
//   try {
//     const { mobileNo, password } = req.body;

//     if (!mobileNo || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Mobile number and password are required'
//       });
//     }

//     const transporter = await Transporter.findOne({ 
//       'personalInfo.mobileNo': mobileNo,
//       isActive: true 
//     });

//     if (!transporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found'
//       });
//     }

//     // Verify Password
//     const isMatch = await bcrypt.compare(password, transporter.security.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid password'
//       });
//     }

//     // Update last login
//     transporter.lastLogin = new Date();
//     await transporter.save();

//     // Prepare response data
//     const transporterData = transporter.toObject();
//     delete transporterData.security.mpin;
//     delete transporterData.security.password;

//     res.status(200).json({
//       success: true,
//       message: 'Login successful!',
//       data: {
//         id: transporter._id,
//         name: transporter.personalInfo.name,
//         mobileNo: transporter.personalInfo.mobileNo,
//         email: transporter.personalInfo.email,
//         role: transporter.role,
//         state: transporter.personalInfo.state,
//         district: transporter.personalInfo.district,
//         vehicleType: transporter.transportInfo?.vehicleType,
//         vehicleNumber: transporter.transportInfo?.vehicleNumber,
//         rating: transporter.rating,
//         totalTrips: transporter.totalTrips
//       }
//     });

//   } catch (error) {
//     console.error('Login with Password Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during login'
//     });
//   }
// };

// // Register transporter
// exports.registerTransporter = async (req, res) => {
//   try {
//     const {
//       name,
//       mobileNo,
//       email,
//       address,
//       village,
//       gramPanchayat,
//       pincode,
//       state,
//       district,
//       taluk,
//       post,
//       location,
//       vehicleType,
//       vehicleCapacity,
//       capacityUnit,
//       vehicleNumber,
//       isCompany,
//       driverName,
//       driverMobileNo,
//       driverAge,
//       accountHolderName,
//       bankName,
//       accountNo,
//       ifscCode,
//       upiId,
//       referralCode,
//       mpin,
//       password
//     } = req.body;

//     // Check if transporter already exists with this mobile number
//     const existingTransporter = await Transporter.findOne({ 'personalInfo.mobileNo': mobileNo });
//     if (existingTransporter) {
//       return res.status(400).json({
//         success: false,
//         message: 'Transporter with this mobile number already exists'
//       });
//     }

//     // Check if vehicle number already exists
//     const existingVehicle = await Transporter.findOne({ 'transportInfo.vehicleNumber': vehicleNumber });
//     if (existingVehicle) {
//       return res.status(400).json({
//         success: false,
//         message: 'Vehicle number already registered'
//       });
//     }

//     // Hash MPIN and password
//     const hashedMpin = await bcrypt.hash(mpin, 10);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Handle file uploads
//     const rcBookPath = req.files?.rcBook ? req.files.rcBook[0].path : null;
//     const insuranceDocPath = req.files?.insuranceDoc ? req.files.insuranceDoc[0].path : null;
//     const pollutionCertPath = req.files?.pollutionCert ? req.files.pollutionCert[0].path : null;
//     const permitDocPath = req.files?.permitDoc ? req.files.permitDoc[0].path : null;
//     const driverLicensePath = req.files?.driverLicense ? req.files.driverLicense[0].path : null;
//     const driverPhotoPath = req.files?.driverPhoto ? req.files.driverPhoto[0].path : null;
//     const panCardPath = req.files?.panCard ? req.files.panCard[0].path : null;
//     const aadharFrontPath = req.files?.aadharFront ? req.files.aadharFront[0].path : null;
//     const aadharBackPath = req.files?.aadharBack ? req.files.aadharBack[0].path : null;
//     const bankPassbookPath = req.files?.bankPassbook ? req.files.bankPassbook[0].path : null;

//     // Create transporter object
//     const transporterData = {
//       personalInfo: {
//         name,
//         mobileNo,
//         email,
//         address,
//         villageGramaPanchayat: village || gramPanchayat,
//         pincode,
//         state,
//         district,
//         taluk,
//         post,
//         location
//       },
//       transportInfo: {
//         vehicleType,
//         vehicleCapacity: {
//           value: vehicleCapacity,
//           unit: capacityUnit
//         },
//         vehicleNumber,
//         vehicleDocuments: {
//           rcBook: rcBookPath,
//           insuranceDoc: insuranceDocPath,
//           pollutionCert: pollutionCertPath,
//           permitDoc: permitDocPath
//         },
//         isCompany: isCompany === 'true' || isCompany === true,
//         driverInfo: (isCompany === 'true' || isCompany === true) ? {
//           driverName,
//           driverMobileNo,
//           driverAge,
//           driverLicense: driverLicensePath,
//           driverPhoto: driverPhotoPath
//         } : null
//       },
//       bankDetails: {
//         accountHolderName,
//         bankName,
//         accountNumber: accountNo,
//         ifscCode,
//         branch: '',
//         upiId
//       },
//       documents: {
//         panCard: panCardPath,
//         aadharFront: aadharFrontPath,
//         aadharBack: aadharBackPath,
//         bankPassbook: bankPassbookPath,
//         rcBook: rcBookPath,
//         insuranceDoc: insuranceDocPath,
//         pollutionCert: pollutionCertPath,
//         permitDoc: permitDocPath,
//         driverLicense: driverLicensePath
//       },
//       security: {
//         referralCode,
//         mpin: hashedMpin,
//         password: hashedPassword
//       }
//     };

//     const transporter = new Transporter(transporterData);
//     await transporter.save();

//     res.status(201).json({
//       success: true,
//       message: 'Transporter registered successfully!',
//       data: {
//         id: transporter._id,
//         name: transporter.personalInfo.name,
//         mobileNo: transporter.personalInfo.mobileNo,
//         vehicleNumber: transporter.transportInfo.vehicleNumber,
//         role: transporter.role
//       }
//     });

//   } catch (error) {
//     console.error('Register Transporter Error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to register transporter'
//     });
//   }
// };

// // Get transporter profile
// exports.getProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const transporter = await Transporter.findById(userId)
//       .select('-security.mpin -security.password');

//     if (!transporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: transporter
//     });

//   } catch (error) {
//     console.error('Get Profile Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // Update transporter profile
// // Update transporter profile
// // Update transporter profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const transporterId = req.params.id;
//     const updateData = req.body;

//     console.log('Update request for ID:', transporterId);
//     console.log('Update data received:', updateData);

//     // Check if transporter exists first
//     const existingTransporter = await Transporter.findById(transporterId);
//     if (!existingTransporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found'
//       });
//     }

//     // Don't allow mobile number updates
//     if (updateData.personalInfo?.mobileNo) {
//       return res.status(400).json({
//         success: false,
//         message: 'Cannot update mobile number'
//       });
//     }

//     // If updating vehicle number, check if it's already taken
//     if (updateData.transportInfo?.vehicleNumber) {
//       const newVehicleNumber = updateData.transportInfo.vehicleNumber;
//       if (newVehicleNumber !== existingTransporter.transportInfo.vehicleNumber) {
//         const existingVehicle = await Transporter.findOne({
//           'transportInfo.vehicleNumber': newVehicleNumber,
//           _id: { $ne: transporterId }
//         });
        
//         if (existingVehicle) {
//           return res.status(400).json({
//             success: false,
//             message: 'Vehicle number already registered'
//           });
//         }
//       }
//     }

//     // Build the update object with dot notation to update nested fields
//     // This prevents Mongoose from validating fields we're not updating
//     const updateObject = {};
    
//     // Update personalInfo fields
//     if (updateData.personalInfo) {
//       for (const [key, value] of Object.entries(updateData.personalInfo)) {
//         if (value !== undefined && key !== 'mobileNo') { // Don't update mobileNo
//           updateObject[`personalInfo.${key}`] = value;
//         }
//       }
//     }
    
//     // Update transportInfo fields
//     if (updateData.transportInfo) {
//       // Update vehicleType
//       if (updateData.transportInfo.vehicleType) {
//         updateObject['transportInfo.vehicleType'] = updateData.transportInfo.vehicleType;
//       }
      
//       // Update vehicleCapacity
//       if (updateData.transportInfo.vehicleCapacity) {
//         updateObject['transportInfo.vehicleCapacity.value'] = updateData.transportInfo.vehicleCapacity.value;
//         updateObject['transportInfo.vehicleCapacity.unit'] = updateData.transportInfo.vehicleCapacity.unit;
//       }
      
//       // Update vehicleNumber
//       if (updateData.transportInfo.vehicleNumber) {
//         updateObject['transportInfo.vehicleNumber'] = updateData.transportInfo.vehicleNumber;
//       }
      
//       // Update driverInfo
//       if (updateData.transportInfo.driverInfo) {
//         updateObject['transportInfo.driverInfo.driverName'] = updateData.transportInfo.driverInfo.driverName;
//         updateObject['transportInfo.driverInfo.driverMobileNo'] = updateData.transportInfo.driverInfo.driverMobileNo;
//         updateObject['transportInfo.driverInfo.driverAge'] = updateData.transportInfo.driverInfo.driverAge;
//       }
//     }
    
//     // Update bankDetails fields
//     if (updateData.bankDetails) {
//       for (const [key, value] of Object.entries(updateData.bankDetails)) {
//         if (value !== undefined) {
//           updateObject[`bankDetails.${key}`] = value;
//         }
//       }
//     }
    
//     console.log('Update object with dot notation:', updateObject);

//     // Update the transporter using dot notation
//     const updatedTransporter = await Transporter.findByIdAndUpdate(
//       transporterId,
//       { $set: updateObject },
//       { 
//         new: true, 
//         runValidators: false, // Turn off validation since we're using dot notation
//         context: 'query'
//       }
//     ).select('-security.mpin -security.password');

//     if (!updatedTransporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found after update'
//       });
//     }

//     console.log('Profile updated successfully:', updatedTransporter._id);

//     res.status(200).json({
//       success: true,
//       message: 'Profile updated successfully',
//       data: updatedTransporter
//     });

//   } catch (error) {
//     console.error('Update Profile Error Details:', error);
    
//     // More specific error messages
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({
//         success: false,
//         message: 'Validation error',
//         errors: errors
//       });
//     }
    
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid transporter ID format'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: error.message || 'Server error during profile update'
//     });
//   }
// };

// // Get all transporters
// exports.getAllTransporters = async (req, res) => {
//   try {
//     const transporters = await Transporter.find({ isActive: true })
//       .select('-security.mpin -security.password')
//       .sort({ registeredAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: transporters.length,
//       data: transporters
//     });

//   } catch (error) {
//     console.error('Get All Transporters Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // Deactivate transporter
// exports.deactivateTransporter = async (req, res) => {
//   try {
//     const transporterId = req.params.id;

//     const transporter = await Transporter.findByIdAndUpdate(
//       transporterId,
//       { isActive: false },
//       { new: true }
//     ).select('-security.mpin -security.password');

//     if (!transporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Transporter deactivated successfully',
//       data: transporter
//     });

//   } catch (error) {
//     console.error('Deactivate Transporter Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // Get transporter by vehicle number
// exports.getTransporterByVehicleNumber = async (req, res) => {
//   try {
//     const { vehicleNumber } = req.params;

//     const transporter = await Transporter.findOne({
//       'transportInfo.vehicleNumber': vehicleNumber,
//       isActive: true
//     }).select('-security.mpin -security.password');

//     if (!transporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: transporter
//     });

//   } catch (error) {
//     console.error('Get Transporter by Vehicle Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // Get transporter by mobile number
// exports.getTransporterByMobile = async (req, res) => {
//   try {
//     const { mobileNo } = req.params;

//     if (!mobileNo) {
//       return res.status(400).json({
//         success: false,
//         message: 'Mobile number is required'
//       });
//     }

//     const transporter = await Transporter.findOne({ 
//       'personalInfo.mobileNo': mobileNo,
//       isActive: true
//     }).select('-security.mpin -security.password');

//     if (!transporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: transporter
//     });

//   } catch (error) {
//     console.error('Get Transporter by Mobile Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // Search transporters by location
// exports.searchTransportersByLocation = async (req, res) => {
//   try {
//     const { state, district } = req.query;

//     const query = { isActive: true };
    
//     if (state) {
//       query['personalInfo.state'] = { $regex: new RegExp(state, 'i') };
//     }
    
//     if (district) {
//       query['personalInfo.district'] = { $regex: new RegExp(district, 'i') };
//     }

//     const transporters = await Transporter.find(query)
//       .select('-security.mpin -security.password')
//       .sort({ registeredAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: transporters.length,
//       data: transporters
//     });

//   } catch (error) {
//     console.error('Search Transporters Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // Update transporter rating
// exports.updateRating = async (req, res) => {
//   try {
//     const transporterId = req.params.id;
//     const { rating, tripCompleted } = req.body;

//     if (rating < 0 || rating > 5) {
//       return res.status(400).json({
//         success: false,
//         message: 'Rating must be between 0 and 5'
//       });
//     }

//     const updateData = {};
//     if (rating !== undefined) {
//       updateData.rating = rating;
//     }
    
//     if (tripCompleted) {
//       updateData.$inc = { totalTrips: 1 };
//     }

//     const transporter = await Transporter.findByIdAndUpdate(
//       transporterId,
//       updateData,
//       { new: true }
//     ).select('-security.mpin -security.password');

//     if (!transporter) {
//       return res.status(404).json({
//         success: false,
//         message: 'Transporter not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Rating updated successfully',
//       data: transporter
//     });

//   } catch (error) {
//     console.error('Update Rating Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // Get transporters by vehicle type
// exports.getTransportersByVehicleType = async (req, res) => {
//   try {
//     const { vehicleType } = req.params;

//     const transporters = await Transporter.find({
//       'transportInfo.vehicleType': vehicleType,
//       isActive: true
//     })
//     .select('-security.mpin -security.password')
//     .sort({ rating: -1, totalTrips: -1 });

//     res.status(200).json({
//       success: true,
//       count: transporters.length,
//       data: transporters
//     });

//   } catch (error) {
//     console.error('Get Transporters by Vehicle Type Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // Clear expired OTPs
// exports.clearExpiredOtps = () => {
//   const now = Date.now();
//   for (const [phone, data] of otpStore.entries()) {
//     if (now > data.expiresAt) {
//       otpStore.delete(phone);
//     }
//   }
// };

// // Run cleanup every 5 minutes
// setInterval(exports.clearExpiredOtps, 5 * 60 * 1000);



// controllers/transporterController.js
const Transporter = require('../models/Transporter');
const bcrypt = require('bcryptjs');
const axios = require('axios');

// In-memory OTP store (use Redis in production)
const otpStore = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const WHATSAPP_TOKEN = 'EAAdzxxobLG4BPU8Lei8DhhuZCjlCthpNQ55ok3LGlpY1PSIzXsOnTrEje2BvKUZCjFPOWlTtJg1TezXPgjp7NrCPN5Nzv6x2BOF7lMQml80v4NNIIWFEZAy5H7ZBZAgk7ZBku0y7QIBIwMsQ9ZCVe6JpbAa9wSz1dHb7xeDJTw7msm7AoxF1YMumg01P1LGBAZDZD';
const WHATSAPP_PHONE_ID = '671028016100461';
const WHATSAPP_API_URL = `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`;

const sendWhatsAppOTP = async (phoneNumber, otp) => {
  try {
    const response = await axios.post(WHATSAPP_API_URL, {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: "login_otp_new",
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

// Send OTP for transporter
exports.sendOtp = async (req, res) => {
  try {
    const { mobileNo } = req.body;

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

    // Check if transporter exists
    const transporter = await Transporter.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true
    });

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found. Please register first.'
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
      console.error('WhatsApp send failed:', whatsappError);
      
      // For development/testing
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

// Verify OTP and Login for transporter
exports.verifyOtpLogin = async (req, res) => {
  try {
    const { mobileNo, otp } = req.body;

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

    // OTP is valid, get transporter details
    const transporter = await Transporter.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true
    });

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Update last login
    transporter.lastLogin = new Date();
    await transporter.save();

    // Clear OTP from store
    otpStore.delete(mobileNo);

    // Prepare response data
    const transporterData = transporter.toObject();
    delete transporterData.security.mpin;
    delete transporterData.security.password;

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        id: transporter._id,
        name: transporter.personalInfo.name,
        mobileNo: transporter.personalInfo.mobileNo,
        email: transporter.personalInfo.email,
        role: transporter.role,
        state: transporter.personalInfo.state,
        district: transporter.personalInfo.district,
        vehicleType: transporter.transportInfo?.vehicleType,
        vehicleNumber: transporter.transportInfo?.vehicleNumber,
        rating: transporter.rating,
        totalTrips: transporter.totalTrips
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

// Login with MPIN for transporter
exports.loginWithMpin = async (req, res) => {
  try {
    const { mobileNo, mpin } = req.body;

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

    const transporter = await Transporter.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true 
    });

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Verify MPIN
    const isMatch = await bcrypt.compare(mpin, transporter.security.mpin);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid MPIN'
      });
    }

    // Update last login
    transporter.lastLogin = new Date();
    await transporter.save();

    // Prepare response data
    const transporterData = transporter.toObject();
    delete transporterData.security.mpin;
    delete transporterData.security.password;

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        id: transporter._id,
        name: transporter.personalInfo.name,
        mobileNo: transporter.personalInfo.mobileNo,
        email: transporter.personalInfo.email,
        role: transporter.role,
        state: transporter.personalInfo.state,
        district: transporter.personalInfo.district,
        vehicleType: transporter.transportInfo?.vehicleType,
        vehicleNumber: transporter.transportInfo?.vehicleNumber,
        rating: transporter.rating,
        totalTrips: transporter.totalTrips
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

// Login with Password for transporter
exports.loginWithPassword = async (req, res) => {
  try {
    const { mobileNo, password } = req.body;

    if (!mobileNo || !password) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and password are required'
      });
    }

    const transporter = await Transporter.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true 
    });

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Verify Password
    const isMatch = await bcrypt.compare(password, transporter.security.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Update last login
    transporter.lastLogin = new Date();
    await transporter.save();

    // Prepare response data
    const transporterData = transporter.toObject();
    delete transporterData.security.mpin;
    delete transporterData.security.password;

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        id: transporter._id,
        name: transporter.personalInfo.name,
        mobileNo: transporter.personalInfo.mobileNo,
        email: transporter.personalInfo.email,
        role: transporter.role,
        state: transporter.personalInfo.state,
        district: transporter.personalInfo.district,
        vehicleType: transporter.transportInfo?.vehicleType,
        vehicleNumber: transporter.transportInfo?.vehicleNumber,
        rating: transporter.rating,
        totalTrips: transporter.totalTrips
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

// Register transporter
exports.registerTransporter = async (req, res) => {
  try {
    const {
      name,
      mobileNo,
      email,
      address,
      village,
      gramPanchayat,
      pincode,
      state,
      district,
      taluk,
      post,
      location,
      vehicleType,
      vehicleCapacity,
      capacityUnit,
      vehicleNumber,
      isCompany,
      driverName,
      driverMobileNo,
      driverAge,
      accountHolderName,
      bankName,
      accountNo,
      ifscCode,
      upiId,
      referralCode,
      mpin,
      password
    } = req.body;

    // Check if transporter already exists with this mobile number
    const existingTransporter = await Transporter.findOne({ 'personalInfo.mobileNo': mobileNo });
    if (existingTransporter) {
      return res.status(400).json({
        success: false,
        message: 'Transporter with this mobile number already exists'
      });
    }

    // Check if vehicle number already exists
    const existingVehicle = await Transporter.findOne({ 'transportInfo.vehicleNumber': vehicleNumber });
    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle number already registered'
      });
    }

    // Hash MPIN and password
    const hashedMpin = await bcrypt.hash(mpin, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle file uploads
    const rcBookPath = req.files?.rcBook ? req.files.rcBook[0].path : null;
    const insuranceDocPath = req.files?.insuranceDoc ? req.files.insuranceDoc[0].path : null;
    const pollutionCertPath = req.files?.pollutionCert ? req.files.pollutionCert[0].path : null;
    const permitDocPath = req.files?.permitDoc ? req.files.permitDoc[0].path : null;
    const driverLicensePath = req.files?.driverLicense ? req.files.driverLicense[0].path : null;
    const driverPhotoPath = req.files?.driverPhoto ? req.files.driverPhoto[0].path : null;
    const panCardPath = req.files?.panCard ? req.files.panCard[0].path : null;
    const aadharFrontPath = req.files?.aadharFront ? req.files.aadharFront[0].path : null;
    const aadharBackPath = req.files?.aadharBack ? req.files.aadharBack[0].path : null;
    const bankPassbookPath = req.files?.bankPassbook ? req.files.bankPassbook[0].path : null;

    // Create transporter object
    const transporterData = {
      personalInfo: {
        name,
        mobileNo,
        email,
        address,
        villageGramaPanchayat: village || gramPanchayat,
        pincode,
        state,
        district,
        taluk,
        post,
        location
      },
      transportInfo: {
        vehicleType,
        vehicleCapacity: {
          value: vehicleCapacity,
          unit: capacityUnit
        },
        vehicleNumber,
        vehicleDocuments: {
          rcBook: rcBookPath,
          insuranceDoc: insuranceDocPath,
          pollutionCert: pollutionCertPath,
          permitDoc: permitDocPath
        },
        isCompany: isCompany === 'true' || isCompany === true,
        driverInfo: (isCompany === 'true' || isCompany === true) ? {
          driverName,
          driverMobileNo,
          driverAge,
          driverLicense: driverLicensePath,
          driverPhoto: driverPhotoPath
        } : null
      },
      bankDetails: {
        accountHolderName,
        bankName,
        accountNumber: accountNo,
        ifscCode,
        branch: '',
        upiId
      },
      documents: {
        panCard: panCardPath,
        aadharFront: aadharFrontPath,
        aadharBack: aadharBackPath,
        bankPassbook: bankPassbookPath,
        rcBook: rcBookPath,
        insuranceDoc: insuranceDocPath,
        pollutionCert: pollutionCertPath,
        permitDoc: permitDocPath,
        driverLicense: driverLicensePath
      },
      security: {
        referralCode,
        mpin: hashedMpin,
        password: hashedPassword
      }
    };

    const transporter = new Transporter(transporterData);
    await transporter.save();

    res.status(201).json({
      success: true,
      message: 'Transporter registered successfully!',
      data: {
        id: transporter._id,
        name: transporter.personalInfo.name,
        mobileNo: transporter.personalInfo.mobileNo,
        vehicleNumber: transporter.transportInfo.vehicleNumber,
        role: transporter.role
      }
    });

  } catch (error) {
    console.error('Register Transporter Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to register transporter'
    });
  }
};

// Get transporter profile - UPDATE THIS FUNCTION
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const transporter = await Transporter.findById(userId)
      .select('-security.mpin -security.password');

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Convert to plain object and add vehicles count
    const transporterData = transporter.toObject();
    transporterData.vehicleCount = transporter.transportInfo.vehicles?.length || 0;

    res.status(200).json({
      success: true,
      data: transporterData
    });

  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update transporter profile
exports.updateProfile = async (req, res) => {
  try {
    const transporterId = req.params.id;
    const updateData = req.body;

    console.log('Update request for ID:', transporterId);
    console.log('Update data received:', updateData);

    // Check if transporter exists first
    const existingTransporter = await Transporter.findById(transporterId);
    if (!existingTransporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Don't allow mobile number updates
    if (updateData.personalInfo?.mobileNo) {
      return res.status(400).json({
        success: false,
        message: 'Cannot update mobile number'
      });
    }

    // If updating vehicle number, check if it's already taken
    if (updateData.transportInfo?.vehicleNumber) {
      const newVehicleNumber = updateData.transportInfo.vehicleNumber;
      if (newVehicleNumber !== existingTransporter.transportInfo.vehicleNumber) {
        const existingVehicle = await Transporter.findOne({
          'transportInfo.vehicleNumber': newVehicleNumber,
          _id: { $ne: transporterId }
        });
        
        if (existingVehicle) {
          return res.status(400).json({
            success: false,
            message: 'Vehicle number already registered'
          });
        }
      }
    }

    // Build the update object with dot notation to update nested fields
    // This prevents Mongoose from validating fields we're not updating
    const updateObject = {};
    
    // Update personalInfo fields
    if (updateData.personalInfo) {
      for (const [key, value] of Object.entries(updateData.personalInfo)) {
        if (value !== undefined && key !== 'mobileNo') { // Don't update mobileNo
          updateObject[`personalInfo.${key}`] = value;
        }
      }
    }
    
    // Update transportInfo fields
    if (updateData.transportInfo) {
      // Update vehicleType
      if (updateData.transportInfo.vehicleType) {
        updateObject['transportInfo.vehicleType'] = updateData.transportInfo.vehicleType;
      }
      
      // Update vehicleCapacity
      if (updateData.transportInfo.vehicleCapacity) {
        updateObject['transportInfo.vehicleCapacity.value'] = updateData.transportInfo.vehicleCapacity.value;
        updateObject['transportInfo.vehicleCapacity.unit'] = updateData.transportInfo.vehicleCapacity.unit;
      }
      
      // Update vehicleNumber
      if (updateData.transportInfo.vehicleNumber) {
        updateObject['transportInfo.vehicleNumber'] = updateData.transportInfo.vehicleNumber;
      }
      
      // Update driverInfo
      if (updateData.transportInfo.driverInfo) {
        updateObject['transportInfo.driverInfo.driverName'] = updateData.transportInfo.driverInfo.driverName;
        updateObject['transportInfo.driverInfo.driverMobileNo'] = updateData.transportInfo.driverInfo.driverMobileNo;
        updateObject['transportInfo.driverInfo.driverAge'] = updateData.transportInfo.driverInfo.driverAge;
      }
    }
    
    // Update bankDetails fields
    if (updateData.bankDetails) {
      for (const [key, value] of Object.entries(updateData.bankDetails)) {
        if (value !== undefined) {
          updateObject[`bankDetails.${key}`] = value;
        }
      }
    }
    
    console.log('Update object with dot notation:', updateObject);

    // Update the transporter using dot notation
    const updatedTransporter = await Transporter.findByIdAndUpdate(
      transporterId,
      { $set: updateObject },
      { 
        new: true, 
        runValidators: false, // Turn off validation since we're using dot notation
        context: 'query'
      }
    ).select('-security.mpin -security.password');

    if (!updatedTransporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found after update'
      });
    }

    console.log('Profile updated successfully:', updatedTransporter._id);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedTransporter
    });

  } catch (error) {
    console.error('Update Profile Error Details:', error);
    
    // More specific error messages
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid transporter ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error during profile update'
    });
  }
};

// Get all transporters
exports.getAllTransporters = async (req, res) => {
  try {
    const transporters = await Transporter.find({ isActive: true })
      .select('-security.mpin -security.password')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: transporters.length,
      data: transporters
    });

  } catch (error) {
    console.error('Get All Transporters Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Deactivate transporter
exports.deactivateTransporter = async (req, res) => {
  try {
    const transporterId = req.params.id;

    const transporter = await Transporter.findByIdAndUpdate(
      transporterId,
      { isActive: false },
      { new: true }
    ).select('-security.mpin -security.password');

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transporter deactivated successfully',
      data: transporter
    });

  } catch (error) {
    console.error('Deactivate Transporter Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get transporter by vehicle number
exports.getTransporterByVehicleNumber = async (req, res) => {
  try {
    const { vehicleNumber } = req.params;

    const transporter = await Transporter.findOne({
      'transportInfo.vehicleNumber': vehicleNumber,
      isActive: true
    }).select('-security.mpin -security.password');

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    res.status(200).json({
      success: true,
      data: transporter
    });

  } catch (error) {
    console.error('Get Transporter by Vehicle Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get transporter by mobile number
exports.getTransporterByMobile = async (req, res) => {
  try {
    const { mobileNo } = req.params;

    if (!mobileNo) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required'
      });
    }

    const transporter = await Transporter.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true
    }).select('-security.mpin -security.password');

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    res.status(200).json({
      success: true,
      data: transporter
    });

  } catch (error) {
    console.error('Get Transporter by Mobile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Search transporters by location
exports.searchTransportersByLocation = async (req, res) => {
  try {
    const { state, district } = req.query;

    const query = { isActive: true };
    
    if (state) {
      query['personalInfo.state'] = { $regex: new RegExp(state, 'i') };
    }
    
    if (district) {
      query['personalInfo.district'] = { $regex: new RegExp(district, 'i') };
    }

    const transporters = await Transporter.find(query)
      .select('-security.mpin -security.password')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: transporters.length,
      data: transporters
    });

  } catch (error) {
    console.error('Search Transporters Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update transporter rating
exports.updateRating = async (req, res) => {
  try {
    const transporterId = req.params.id;
    const { rating, tripCompleted } = req.body;

    if (rating < 0 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 0 and 5'
      });
    }

    const updateData = {};
    if (rating !== undefined) {
      updateData.rating = rating;
    }
    
    if (tripCompleted) {
      updateData.$inc = { totalTrips: 1 };
    }

    const transporter = await Transporter.findByIdAndUpdate(
      transporterId,
      updateData,
      { new: true }
    ).select('-security.mpin -security.password');

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Rating updated successfully',
      data: transporter
    });

  } catch (error) {
    console.error('Update Rating Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get transporters by vehicle type
exports.getTransportersByVehicleType = async (req, res) => {
  try {
    const { vehicleType } = req.params;

    const transporters = await Transporter.find({
      'transportInfo.vehicleType': vehicleType,
      isActive: true
    })
    .select('-security.mpin -security.password')
    .sort({ rating: -1, totalTrips: -1 });

    res.status(200).json({
      success: true,
      count: transporters.length,
      data: transporters
    });

  } catch (error) {
    console.error('Get Transporters by Vehicle Type Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Add this function to TransportController.js
exports.updateProfileWithFiles = async (req, res) => {
  try {
    const transporterId = req.params.id;
    const updateData = req.body;
    const files = req.files;

    console.log('Update with files request for ID:', transporterId);
    console.log('Files received:', files);

    // Check if transporter exists
    const existingTransporter = await Transporter.findById(transporterId);
    if (!existingTransporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Parse JSON data
    let parsedData = {};
    if (updateData.transportInfo) {
      try {
        parsedData.transportInfo = JSON.parse(updateData.transportInfo);
      } catch (e) {
        console.error('Error parsing transportInfo:', e);
      }
    }

    if (updateData.documents) {
      try {
        parsedData.documents = JSON.parse(updateData.documents);
      } catch (e) {
        console.error('Error parsing documents:', e);
      }
    }

    // Handle deleted files
    if (updateData.deletedFiles) {
      try {
        const deletedFiles = JSON.parse(updateData.deletedFiles);
        deletedFiles.forEach(fileKey => {
          // Remove from documents
          if (parsedData.documents) {
            delete parsedData.documents[fileKey];
          }
          // Remove from transportInfo.vehicleDocuments
          if (parsedData.transportInfo?.vehicleDocuments) {
            delete parsedData.transportInfo.vehicleDocuments[fileKey];
          }
        });
      } catch (e) {
        console.error('Error parsing deletedFiles:', e);
      }
    }

    // Handle file uploads
    if (files) {
      Object.entries(files).forEach(([fieldName, fileArray]) => {
        if (fileArray && fileArray[0]) {
          const filePath = fileArray[0].path;
          
          // Update in documents
          if (!parsedData.documents) parsedData.documents = {};
          parsedData.documents[fieldName] = filePath;
          
          // Also update in transportInfo.vehicleDocuments for vehicle docs
          const vehicleDocFields = ['rcBook', 'insuranceDoc', 'pollutionCert', 'permitDoc', 'driverLicense'];
          if (vehicleDocFields.includes(fieldName)) {
            if (!parsedData.transportInfo) parsedData.transportInfo = {};
            if (!parsedData.transportInfo.vehicleDocuments) {
              parsedData.transportInfo.vehicleDocuments = {};
            }
            parsedData.transportInfo.vehicleDocuments[fieldName] = filePath;
          }
          
          // For driverLicense, also update in driverInfo
          if (fieldName === 'driverLicense' && parsedData.transportInfo?.driverInfo) {
            parsedData.transportInfo.driverInfo.driverLicense = filePath;
          }
        }
      });
    }

    // Build update object
    const updateObject = {};
    
    // Update transportInfo
    if (parsedData.transportInfo) {
      if (parsedData.transportInfo.vehicleType) {
        updateObject['transportInfo.vehicleType'] = parsedData.transportInfo.vehicleType;
      }
      if (parsedData.transportInfo.vehicleCapacity) {
        updateObject['transportInfo.vehicleCapacity.value'] = parsedData.transportInfo.vehicleCapacity.value;
        updateObject['transportInfo.vehicleCapacity.unit'] = parsedData.transportInfo.vehicleCapacity.unit;
      }
      if (parsedData.transportInfo.vehicleNumber) {
        updateObject['transportInfo.vehicleNumber'] = parsedData.transportInfo.vehicleNumber;
      }
      if (parsedData.transportInfo.driverInfo) {
        updateObject['transportInfo.driverInfo.driverName'] = parsedData.transportInfo.driverInfo.driverName;
        updateObject['transportInfo.driverInfo.driverMobileNo'] = parsedData.transportInfo.driverInfo.driverMobileNo;
        updateObject['transportInfo.driverInfo.driverAge'] = parsedData.transportInfo.driverInfo.driverAge;
      }
      if (parsedData.transportInfo.vehicleDocuments) {
        Object.entries(parsedData.transportInfo.vehicleDocuments).forEach(([key, value]) => {
          updateObject[`transportInfo.vehicleDocuments.${key}`] = value;
        });
      }
      if (parsedData.transportInfo.driverInfo?.driverLicense) {
        updateObject['transportInfo.driverInfo.driverLicense'] = parsedData.transportInfo.driverInfo.driverLicense;
      }
    }
    
    // Update documents
    if (parsedData.documents) {
      Object.entries(parsedData.documents).forEach(([key, value]) => {
        updateObject[`documents.${key}`] = value;
      });
    }

    console.log('Final update object:', updateObject);

    // Update the transporter
    const updatedTransporter = await Transporter.findByIdAndUpdate(
      transporterId,
      { $set: updateObject },
      { 
        new: true,
        runValidators: false
      }
    ).select('-security.mpin -security.password');

    if (!updatedTransporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found after update'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedTransporter
    });

  } catch (error) {
    console.error('Update Profile with Files Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during profile update'
    });
  }
};

// Add new vehicle to transporter
exports.addVehicle = async (req, res) => {
  try {
    const transporterId = req.params.id;
    const vehicleData = req.body;
    const files = req.files;

    console.log('Add vehicle request for ID:', transporterId);
    console.log('Vehicle data:', vehicleData);
    console.log('Files received:', files);

    const transporter = await Transporter.findById(transporterId);
    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Check vehicle limit
    if (transporter.transportInfo.vehicles && 
        transporter.transportInfo.vehicles.length >= transporter.maxVehicles) {
      return res.status(400).json({
        success: false,
        message: `Maximum vehicle limit (${transporter.maxVehicles}) reached`
      });
    }

    // Check if vehicle number already exists
    const existingVehicle = transporter.transportInfo.vehicles?.find(
      v => v.vehicleNumber === vehicleData.vehicleNumber
    );
    
    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle with this number already exists'
      });
    }

    // Process file uploads for this vehicle
    const vehicleDocuments = {};
    if (files) {
      if (files.rcBook && files.rcBook[0]) {
        vehicleDocuments.rcBook = files.rcBook[0].path;
      }
      if (files.insuranceDoc && files.insuranceDoc[0]) {
        vehicleDocuments.insuranceDoc = files.insuranceDoc[0].path;
      }
      if (files.pollutionCert && files.pollutionCert[0]) {
        vehicleDocuments.pollutionCert = files.pollutionCert[0].path;
      }
      if (files.permitDoc && files.permitDoc[0]) {
        vehicleDocuments.permitDoc = files.permitDoc[0].path;
      }
      if (files.driverLicense && files.driverLicense[0]) {
        vehicleData.driverLicense = files.driverLicense[0].path;
      }
      if (files.driverPhoto && files.driverPhoto[0]) {
        vehicleData.driverPhoto = files.driverPhoto[0].path;
      }
    }

    // Prepare vehicle object
    const newVehicle = {
      vehicleType: vehicleData.vehicleType,
      vehicleCapacity: {
        value: vehicleData.vehicleCapacity?.value || vehicleData.vehicleCapacityValue,
        unit: vehicleData.vehicleCapacity?.unit || vehicleData.vehicleCapacityUnit || 'kg'
      },
      vehicleNumber: vehicleData.vehicleNumber,
      vehicleDocuments: vehicleDocuments,
      driverInfo: {
        driverName: vehicleData.driverName,
        driverMobileNo: vehicleData.driverMobileNo,
        driverAge: vehicleData.driverAge,
        driverLicense: vehicleData.driverLicense,
        driverPhoto: vehicleData.driverPhoto
      },
      primaryVehicle: false // New vehicles are not primary by default
    };

    // If this is the first vehicle, mark it as primary
    if (!transporter.transportInfo.vehicles || transporter.transportInfo.vehicles.length === 0) {
      newVehicle.primaryVehicle = true;
    }

    // Add the vehicle to the array
    await Transporter.findByIdAndUpdate(
      transporterId,
      {
        $push: { 'transportInfo.vehicles': newVehicle },
        $set: { 
          // For backward compatibility, update main fields with first vehicle's data
          'transportInfo.vehicleType': newVehicle.vehicleType,
          'transportInfo.vehicleCapacity': newVehicle.vehicleCapacity,
          'transportInfo.vehicleNumber': newVehicle.vehicleNumber,
          'transportInfo.vehicleDocuments': newVehicle.vehicleDocuments,
          'transportInfo.driverInfo': newVehicle.driverInfo
        }
      },
      { new: true, runValidators: true }
    );

    // Get updated transporter
    const updatedTransporter = await Transporter.findById(transporterId)
      .select('-security.mpin -security.password');

    res.status(200).json({
      success: true,
      message: 'Vehicle added successfully',
      data: {
        transporter: updatedTransporter,
        vehicle: newVehicle
      }
    });

  } catch (error) {
    console.error('Add Vehicle Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add vehicle'
    });
  }
};

// Update existing vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const transporterId = req.params.id;
    const vehicleNumber = req.params.vehicleNumber;
    const updateData = req.body;
    const files = req.files;

    const transporter = await Transporter.findById(transporterId);
    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Find the vehicle
    const vehicleIndex = transporter.transportInfo.vehicles?.findIndex(
      v => v.vehicleNumber === vehicleNumber
    );
    
    if (vehicleIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    const vehicle = transporter.transportInfo.vehicles[vehicleIndex];
    
    // Process file uploads
    if (files) {
      if (files.rcBook && files.rcBook[0]) {
        vehicle.vehicleDocuments.rcBook = files.rcBook[0].path;
      }
      if (files.insuranceDoc && files.insuranceDoc[0]) {
        vehicle.vehicleDocuments.insuranceDoc = files.insuranceDoc[0].path;
      }
      if (files.pollutionCert && files.pollutionCert[0]) {
        vehicle.vehicleDocuments.pollutionCert = files.pollutionCert[0].path;
      }
      if (files.permitDoc && files.permitDoc[0]) {
        vehicle.vehicleDocuments.permitDoc = files.permitDoc[0].path;
      }
      if (files.driverLicense && files.driverLicense[0]) {
        vehicle.driverInfo.driverLicense = files.driverLicense[0].path;
      }
      if (files.driverPhoto && files.driverPhoto[0]) {
        vehicle.driverInfo.driverPhoto = files.driverPhoto[0].path;
      }
    }

    // Update vehicle fields
    if (updateData.vehicleType) {
      vehicle.vehicleType = updateData.vehicleType;
    }
    if (updateData.vehicleCapacityValue) {
      vehicle.vehicleCapacity.value = updateData.vehicleCapacityValue;
    }
    if (updateData.vehicleCapacityUnit) {
      vehicle.vehicleCapacity.unit = updateData.vehicleCapacityUnit;
    }
    if (updateData.driverName) {
      vehicle.driverInfo.driverName = updateData.driverName;
    }
    if (updateData.driverMobileNo) {
      vehicle.driverInfo.driverMobileNo = updateData.driverMobileNo;
    }
    if (updateData.driverAge) {
      vehicle.driverInfo.driverAge = updateData.driverAge;
    }

    // Save the updated transporter
    transporter.markModified('transportInfo.vehicles');
    await transporter.save();

    const updatedTransporter = await Transporter.findById(transporterId)
      .select('-security.mpin -security.password');

    res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully',
      data: {
        transporter: updatedTransporter,
        vehicle: vehicle
      }
    });

  } catch (error) {
    console.error('Update Vehicle Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update vehicle'
    });
  }
};

// Remove vehicle
exports.removeVehicle = async (req, res) => {
  try {
    const transporterId = req.params.id;
    const vehicleNumber = req.params.vehicleNumber;

    const transporter = await Transporter.findById(transporterId);
    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Find the vehicle
    const vehicleIndex = transporter.transportInfo.vehicles?.findIndex(
      v => v.vehicleNumber === vehicleNumber
    );
    
    if (vehicleIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    const vehicle = transporter.transportInfo.vehicles[vehicleIndex];
    const isPrimary = vehicle.primaryVehicle;

    // Remove the vehicle
    transporter.transportInfo.vehicles.splice(vehicleIndex, 1);

    // If we removed the primary vehicle and there are other vehicles,
    // make the first remaining vehicle primary
    if (isPrimary && transporter.transportInfo.vehicles.length > 0) {
      transporter.transportInfo.vehicles[0].primaryVehicle = true;
      
      // Update main fields with new primary vehicle data
      const newPrimary = transporter.transportInfo.vehicles[0];
      transporter.transportInfo.vehicleType = newPrimary.vehicleType;
      transporter.transportInfo.vehicleCapacity = newPrimary.vehicleCapacity;
      transporter.transportInfo.vehicleNumber = newPrimary.vehicleNumber;
      transporter.transportInfo.vehicleDocuments = newPrimary.vehicleDocuments;
      transporter.transportInfo.driverInfo = newPrimary.driverInfo;
    }

    // If no vehicles left, clear the main fields
    if (transporter.transportInfo.vehicles.length === 0) {
      transporter.transportInfo.vehicleType = undefined;
      transporter.transportInfo.vehicleCapacity = undefined;
      transporter.transportInfo.vehicleNumber = undefined;
      transporter.transportInfo.vehicleDocuments = undefined;
      transporter.transportInfo.driverInfo = undefined;
    }

    await transporter.save();

    const updatedTransporter = await Transporter.findById(transporterId)
      .select('-security.mpin -security.password');

    res.status(200).json({
      success: true,
      message: 'Vehicle removed successfully',
      data: updatedTransporter
    });

  } catch (error) {
    console.error('Remove Vehicle Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to remove vehicle'
    });
  }
};

// Set primary vehicle
exports.setPrimaryVehicle = async (req, res) => {
  try {
    const transporterId = req.params.id;
    const { vehicleNumber } = req.body;

    const transporter = await Transporter.findById(transporterId);
    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    // Find the vehicle
    const vehicle = transporter.transportInfo.vehicles?.find(
      v => v.vehicleNumber === vehicleNumber
    );
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Reset all vehicles' primary status
    transporter.transportInfo.vehicles?.forEach(v => {
      v.primaryVehicle = false;
    });

    // Set the specified vehicle as primary
    vehicle.primaryVehicle = true;

    // Update main fields with primary vehicle data
    transporter.transportInfo.vehicleType = vehicle.vehicleType;
    transporter.transportInfo.vehicleCapacity = vehicle.vehicleCapacity;
    transporter.transportInfo.vehicleNumber = vehicle.vehicleNumber;
    transporter.transportInfo.vehicleDocuments = vehicle.vehicleDocuments;
    transporter.transportInfo.driverInfo = vehicle.driverInfo;

    await transporter.save();

    const updatedTransporter = await Transporter.findById(transporterId)
      .select('-security.mpin -security.password');

    res.status(200).json({
      success: true,
      message: 'Primary vehicle set successfully',
      data: updatedTransporter
    });

  } catch (error) {
    console.error('Set Primary Vehicle Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to set primary vehicle'
    });
  }
};

// Get all vehicles for a transporter
exports.getAllVehicles = async (req, res) => {
  try {
    const transporterId = req.params.id;

    const transporter = await Transporter.findById(transporterId)
      .select('transportInfo.vehicles');

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }

    res.status(200).json({
      success: true,
      count: transporter.transportInfo.vehicles?.length || 0,
      data: transporter.transportInfo.vehicles || []
    });

  } catch (error) {
    console.error('Get All Vehicles Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get vehicles'
    });
  }
};

// Clear expired OTPs
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