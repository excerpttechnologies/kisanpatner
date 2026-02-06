const fs = require('fs');
const path = require('path');
const Farmer = require('../models/Farmer');
const Transporter = require('../models/Transporter');

// Helper to map model to simple profile
function mapToProfile(doc, type) {
  if (!doc) return null;
  const personal = doc.personalInfo || {};
  let avatar = null;

  // Check for avatar in multiple possible locations
  if (doc.documents && doc.documents.photo) {
    avatar = doc.documents.photo;
  }
  if (doc.transportInfo && doc.transportInfo.driverPhoto) {
    avatar = avatar || doc.transportInfo.driverPhoto;
  }

  return {
    id: doc._id,
    name: personal.name || '',
    email: personal.email || '',
    phone: personal.mobileNo || '',
    role: doc.role || type || 'user',
    avatar: avatar || null
  };
}

// GET /api/profile - Get logged in user's profile
async function getProfile(req, res) {
  try {
    // Assuming you have user authentication middleware that sets req.user
    // If not, you'll need to implement authentication first

    const userId = req.user?._id || req.user?.id;
    const userRole = req.user?.role;

    if (!userId || !userRole) {
      // Fallback for demo/testing - but you should implement proper auth
      return res.status(401).json({ error: 'User not authenticated' });
    }

    let doc = null;
    let type = 'user';

    // Find profile based on user role
    if (userRole === 'farmer' || userRole === 'farmer') {
      doc = await Farmer.findById(userId).lean();
      type = 'farmer';
    } else if (userRole === 'transporter' || userRole === 'transporter') {
      doc = await Transporter.findById(userId).lean();
      type = 'transporter';
    } else {
      // Try both collections
      doc = await Farmer.findById(userId).lean();
      if (doc) {
        type = 'farmer';
      } else {
        doc = await Transporter.findById(userId).lean();
        if (doc) {
          type = 'transporter';
        }
      }
    }

    if (!doc) {
      // Profile not found
      return res.status(404).json({
        error: 'Profile not found',
        message: 'User profile does not exist'
      });
    }

    const profile = mapToProfile(doc, type);
    return res.json(profile);
  } catch (err) {
    console.error('getProfile error', err);
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

// PUT /api/profile - Update logged in user's profile
async function updateProfile(req, res) {
  try {
    // Get user ID from authentication
    const userId = req.user?._id || req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { name, email, phone, role } = req.body || {};
    const file = req.file;

    // Determine which model to use based on existing role or provided role
    let Model = null;
    let existingDoc = null;

    // First, check if user exists as farmer
    existingDoc = await Farmer.findById(userId);
    if (existingDoc) {
      Model = Farmer;
    } else {
      // Check if user exists as transporter
      existingDoc = await Transporter.findById(userId);
      if (existingDoc) {
        Model = Transporter;
      } else {
        // User doesn't exist in either collection - create based on role
        if (role && (role.toLowerCase().includes('trans') || userRole === 'transporter')) {
          Model = Transporter;
        } else {
          Model = Farmer;
        }

        // Create new profile
        const base = {
          _id: userId, // Use the authenticated user's ID
          personalInfo: {
            name: name || 'New User',
            mobileNo: phone || '',
            email: email || ''
          },
          role: role || (Model === Farmer ? 'farmer' : 'transporter')
        };

        if (file) {
          base.documents = { photo: file.filename };
        }

        const created = await Model.create(base);
        const profile = mapToProfile(created.toObject(), created.role);
        return res.json(profile);
      }
    }

    // Update existing profile
    if (!existingDoc.personalInfo) {
      existingDoc.personalInfo = {};
    }

    if (name) existingDoc.personalInfo.name = name;
    if (email) existingDoc.personalInfo.email = email;
    if (phone) existingDoc.personalInfo.mobileNo = phone;
    if (role) existingDoc.role = role;

    if (file) {
      if (!existingDoc.documents) {
        existingDoc.documents = {};
      }
      // Delete old avatar file if exists
      if (existingDoc.documents.photo) {
        const oldPath = path.join(__dirname, '../uploads', existingDoc.documents.photo);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      existingDoc.documents.photo = file.filename;
    }

    await existingDoc.save();

    const profile = mapToProfile(existingDoc.toObject ? existingDoc.toObject() : existingDoc, existingDoc.role);
    return res.json(profile);
  } catch (err) {
    console.error('updateProfile error', err);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
}

module.exports = {
  getProfile,
  updateProfile
};