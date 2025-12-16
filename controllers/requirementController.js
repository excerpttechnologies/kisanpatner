const Requirement = require('../models/Requirement');

exports.postRequirement = async (req, res) => {
  try {
    console.log('Received requirement data:', req.body);
    
    const {
      postedBy,
      userType,
      category,
      subCategory,
      farmingType,
      variety,
      packType,
      weightPerPack,
      qualities,
      requirementDate,
      location
    } = req.body;

    // Validate required fields
    if (!category || !subCategory || !farmingType || 
        !packType || !weightPerPack || !location || !requirementDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate qualities array
    if (!qualities || qualities.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one quality grade is required'
      });
    }

    // Create new requirement
    const requirement = new Requirement({
      postedBy: postedBy || 'guest',
      userType: userType || 'Trader',
      category,
      subCategory,
      farmingType,
      variety: variety || '',
      packType,
      weightPerPack: parseFloat(weightPerPack),
      qualities: qualities.map(q => ({
        grade: q.grade,
        pricePerPack: parseFloat(q.pricePerPack),
        quantity: parseInt(q.quantity)
      })),
      requirementDate: new Date(requirementDate),
      location
    });

    // Save to database
    await requirement.save();

    console.log('Requirement saved successfully:', requirement._id);

    res.status(201).json({
      success: true,
      message: 'Requirement posted successfully',
      data: {
        requirementId: requirement._id,
        category,
        subCategory,
        status: 'Active',
        createdAt: requirement.createdAt
      }
    });

  } catch (error) {
    console.error('Error posting requirement:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while posting requirement',
      error: error.message
    });
  }
};

// Simple debug endpoint
exports.debugPostRequirement = async (req, res) => {
  try {
    console.log('Debug endpoint called with:', req.body);
    res.json({
      success: true,
      message: 'Debug endpoint working correctly',
      receivedData: req.body
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Debug endpoint error',
      error: error.message
    });
  }
};

// Get all requirements
exports.getAllRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find().sort({ createdAt: -1 }).lean();
    res.json({
      success: true,
      data: requirements
    });
  } catch (error) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching requirements'
    });
  }
};

// Health check
exports.ping = async (req, res) => {
  res.json({ 
    success: true, 
    message: 'Requirements API is working',
    timestamp: new Date().toISOString()
  });
};