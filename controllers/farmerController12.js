const Farmer = require('../models/Farmer');
const bcrypt = require('bcryptjs');
const path = require('path');

// // Register Farmer
// exports.registerFarmer = async (req, res) => {
//   try {
//     const {
//       personalInfo,
//       farmLocation,
//       farmLand,
//       commodities,
//       nearestMarkets,
//       bankDetails,
//       security,
//       role
//     } = req.body;

//     // Parse JSON strings
//     const parsedPersonalInfo = JSON.parse(personalInfo);
//     const parsedFarmLocation = JSON.parse(farmLocation);
//     const parsedFarmLand = JSON.parse(farmLand);
//     const parsedCommodities = JSON.parse(commodities);
//     const parsedNearestMarkets = JSON.parse(nearestMarkets);
//     const parsedBankDetails = JSON.parse(bankDetails);
//     const parsedSecurity = JSON.parse(security);

//     // Check if farmer already exists
//     const existingFarmer = await Farmer.findOne({ 
//       'personalInfo.mobileNo': parsedPersonalInfo.mobileNo 
//     });

//     if (existingFarmer) {
//       return res.status(400).json({
//         success: false,
//         message: 'Farmer with this mobile number already exists'
//       });
//     }

//     // Hash MPIN
//     const salt = await bcrypt.genSalt(10);
//     const hashedMpin = await bcrypt.hash(parsedSecurity.mpin, salt);
// const hashedPassword = await bcrypt.hash(parsedSecurity.password, salt);
//     // Prepare document paths
//     const documents = {};
//     if (req.files) {
//       if (req.files.panCard) {
//         documents.panCard = `/uploads/${req.files.panCard[0].filename}`;
//       }
//       if (req.files.aadharFront) {
//         documents.aadharFront = `/uploads/${req.files.aadharFront[0].filename}`;
//       }
//       if (req.files.aadharBack) {
//         documents.aadharBack = `/uploads/${req.files.aadharBack[0].filename}`;
//       }
//       if (req.files.bankPassbook) {
//         documents.bankPassbook = `/uploads/${req.files.bankPassbook[0].filename}`;
//       }
//     }

//     // Create new farmer
//     const newFarmer = new Farmer({
//       personalInfo: parsedPersonalInfo,
//       farmLocation: parsedFarmLocation,
//       farmLand: parsedFarmLand,
//       role: role,
//       commodities: parsedCommodities,
//       nearestMarkets: parsedNearestMarkets,
//       bankDetails: parsedBankDetails,
//       documents: documents,
//       security: {
//         referralCode: parsedSecurity.referralCode,
//         mpin: hashedMpin,
//         password: hashedPassword
//       }
//     });

//     await newFarmer.save();

//     res.status(201).json({
//       success: true,
//       message: 'Farmer registered successfully',
//       data: {
//         id: newFarmer._id,
//         name: newFarmer.personalInfo.name,
//         mobileNo: newFarmer.personalInfo.mobileNo
//       }
//     });
//   } catch (error) {
//     console.error('Error in registerFarmer:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };
const generateNextId = async (role) => {
  const prefix = role === 'farmer' ? 'far' : 'trd';
  
  // Find the last registered user with this role
  const lastUser = await Farmer.findOne({ 
    farmerId: new RegExp(`^${prefix}-`) 
  })
  .sort({ farmerId: -1 })
  .select('farmerId');
  
  if (!lastUser) {
    // First user of this role
    return `${prefix}-01`;
  }
  
  // Extract the number from the last ID
  const lastNumber = parseInt(lastUser.farmerId.split('-')[1]);
  const nextNumber = lastNumber + 1;
  
  // Pad with zeros to maintain format
  return `${prefix}-${String(nextNumber).padStart(2, '0')}`;
};

exports.registerFarmer = async (req, res) => {
  try {
    const {
      personalInfo,
      farmLocation,
      farmLand,
      commodities,
      nearestMarkets,
      bankDetails,
      security,
      role
    } = req.body;

    // Validate role
    if (!role || !['farmer', 'trader'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Role must be either "farmer" or "trader"'
      });
    }

    // Parse JSON strings
    const parsedPersonalInfo = JSON.parse(personalInfo);
    const parsedFarmLocation = JSON.parse(farmLocation);
    const parsedFarmLand = JSON.parse(farmLand);
    const parsedCommodities = JSON.parse(commodities);
    const parsedNearestMarkets = JSON.parse(nearestMarkets);
    const parsedBankDetails = JSON.parse(bankDetails);
    const parsedSecurity = JSON.parse(security);

    // Check if farmer already exists
    const existingFarmer = await Farmer.findOne({ 
      'personalInfo.mobileNo': parsedPersonalInfo.mobileNo 
    });
    
    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        message: 'Farmer with this mobile number already exists'
      });
    }

    // Generate unique farmer/trader ID
    const farmerId = await generateNextId(role);

    // Hash MPIN and Password
    const salt = await bcrypt.genSalt(10);
    const hashedMpin = await bcrypt.hash(parsedSecurity.mpin, salt);
    const hashedPassword = await bcrypt.hash(parsedSecurity.password, salt);

    // Prepare document paths
    const documents = {};
    if (req.files) {
      if (req.files.panCard) {
        documents.panCard = `/uploads/${req.files.panCard[0].filename}`;
      }
      if (req.files.aadharFront) {
        documents.aadharFront = `/uploads/${req.files.aadharFront[0].filename}`;
      }
      if (req.files.aadharBack) {
        documents.aadharBack = `/uploads/${req.files.aadharBack[0].filename}`;
      }
      if (req.files.bankPassbook) {
        documents.bankPassbook = `/uploads/${req.files.bankPassbook[0].filename}`;
      }
    }

    // Create new farmer/trader
    const newFarmer = new Farmer({
      farmerId: farmerId,
      personalInfo: parsedPersonalInfo,
      farmLocation: parsedFarmLocation,
      farmLand: parsedFarmLand,
      role: role,
      commodities: parsedCommodities,
      nearestMarkets: parsedNearestMarkets,
      bankDetails: parsedBankDetails,
      documents: documents,
      security: {
        referralCode: parsedSecurity.referralCode,
        mpin: hashedMpin,
        password: hashedPassword
      }
    });

    await newFarmer.save();

    res.status(201).json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      data: {
        id: newFarmer._id,
        farmerId: newFarmer.farmerId,
        name: newFarmer.personalInfo.name,
        mobileNo: newFarmer.personalInfo.mobileNo,
        role: newFarmer.role
      }
    });

  } catch (error) {
    console.error('Error in registerFarmer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
// Get Farmer by ID
exports.getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id).populate('commodities');
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    // Don't send MPIN in response
    const farmerData = farmer.toObject();
    delete farmerData.security.mpin;

    res.status(200).json({
      success: true,
      data: farmerData
    });
  } catch (error) {
    console.error('Error in getFarmerById:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get All Farmers
exports.getAllFarmers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const farmers = await Farmer.find()
      .populate('commodities')
      .select('-security.mpin')
      .skip(skip)
      .limit(limit)
      .sort({ registeredAt: -1 });
    
    const total = await Farmer.countDocuments();

    res.status(200).json({
      success: true,
      count: farmers.length,
      total: total,
      page: page,
      totalPages: Math.ceil(total / limit),
      data: farmers
    });
  } catch (error) {
    console.error('Error in getAllFarmers:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update Farmer
exports.updateFarmer = async (req, res) => {
  try {
    const updates = req.body;
    
    // If MPIN is being updated, hash it
    if (updates.security && updates.security.mpin) {
      const salt = await bcrypt.genSalt(10);
      updates.security.mpin = await bcrypt.hash(updates.security.mpin, salt);
    }

    // Handle document updates if new files are uploaded
    if (req.files) {
      if (!updates.documents) {
        updates.documents = {};
      }
      
      if (req.files.panCard) {
        updates.documents.panCard = `/uploads/${req.files.panCard[0].filename}`;
      }
      if (req.files.aadharFront) {
        updates.documents.aadharFront = `/uploads/${req.files.aadharFront[0].filename}`;
      }
      if (req.files.aadharBack) {
        updates.documents.aadharBack = `/uploads/${req.files.aadharBack[0].filename}`;
      }
      if (req.files.bankPassbook) {
        updates.documents.bankPassbook = `/uploads/${req.files.bankPassbook[0].filename}`;
      }
    }

    const farmer = await Farmer.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('commodities');

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    // Don't send MPIN in response
    const farmerData = farmer.toObject();
    delete farmerData.security.mpin;

    res.status(200).json({
      success: true,
      message: 'Farmer updated successfully',
      data: farmerData
    });
  } catch (error) {
    console.error('Error in updateFarmer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete Farmer (Soft Delete)
exports.deleteFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Farmer deactivated successfully'
    });
  } catch (error) {
    console.error('Error in deleteFarmer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Permanently Delete Farmer
exports.permanentlyDeleteFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Farmer permanently deleted successfully'
    });
  } catch (error) {
    console.error('Error in permanentlyDeleteFarmer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Search Farmers
exports.searchFarmers = async (req, res) => {
  try {
    const { query, state, district, commodity } = req.query;
    let searchCriteria = { isActive: true };

    // Text search in name, mobile, village
    if (query) {
      searchCriteria.$or = [
        { 'personalInfo.name': { $regex: query, $options: 'i' } },
        { 'personalInfo.mobileNo': { $regex: query, $options: 'i' } },
        { 'personalInfo.villageGramaPanchayat': { $regex: query, $options: 'i' } }
      ];
    }

    // Filter by state
    if (state) {
      searchCriteria['personalInfo.state'] = state;
    }

    // Filter by district
    if (district) {
      searchCriteria['personalInfo.district'] = district;
    }

    // Filter by commodity
    if (commodity) {
      searchCriteria.commodities = commodity;
    }

    const farmers = await Farmer.find(searchCriteria)
      .populate('commodities')
      .select('-security.mpin')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: farmers.length,
      data: farmers
    });
  } catch (error) {
    console.error('Error in searchFarmers:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Verify MPIN (for login)
exports.verifyMpin = async (req, res) => {
  try {
    const { mobileNo, mpin } = req.body;

    if (!mobileNo || !mpin) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and MPIN are required'
      });
    }

    const farmer = await Farmer.findOne({ 
      'personalInfo.mobileNo': mobileNo,
      isActive: true 
    });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    const isMatch = await bcrypt.compare(mpin, farmer.security.mpin);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid MPIN'
      });
    }

    // Don't send MPIN in response
    const farmerData = farmer.toObject();
    delete farmerData.security.mpin;

    res.status(200).json({
      success: true,
      message: 'MPIN verified successfully',
      data: farmerData
    });
  } catch (error) {
    console.error('Error in verifyMpin:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get Farmer Statistics
exports.getFarmerStats = async (req, res) => {
  try {
    const totalFarmers = await Farmer.countDocuments({ isActive: true });
    const totalLand = await Farmer.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalLand: { $sum: '$farmLand.total' },
          totalCultivated: { $sum: '$farmLand.cultivated' },
          totalUncultivated: { $sum: '$farmLand.uncultivated' }
        }
      }
    ]);

    const farmersByState = await Farmer.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$personalInfo.state',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const farmersByCommodity = await Farmer.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$commodities' },
      {
        $group: {
          _id: '$commodities',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $project: {
          _id: 1,
          categoryName: '$category.name',
          count: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalFarmers,
        landStats: totalLand[0] || { totalLand: 0, totalCultivated: 0, totalUncultivated: 0 },
        farmersByState,
        farmersByCommodity
      }
    });
  } catch (error) {
    console.error('Error in getFarmerStats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};