const fs = require('fs');
const path = require('path');
const Farmer = require('../models/Farmer');
const Transporter = require('../models/Transporter');

// Helper to map model to simple profile
function mapToProfile(doc, type) {
  if (!doc) return null;
  const personal = doc.personalInfo || {};
  let avatar = null;
  if (doc.documents && doc.documents.photo) avatar = doc.documents.photo;
  if (doc.transportInfo && doc.transportInfo.driverPhoto) avatar = avatar || doc.transportInfo.driverPhoto;

  return {
    id: doc._id,
    name: personal.name || '',
    email: personal.email || '',
    phone: personal.mobileNo || '',
    role: doc.role || type || 'user',
    avatar: avatar || null
  };
}

// GET /api/profile
async function getProfile(req, res) {
  try {
    // Try farmer first
    let doc = await Farmer.findOne({}).lean();
    let type = 'farmer';
    if (!doc) {
      doc = await Transporter.findOne({}).lean();
      type = 'transporter';
    }

    if (!doc) {
      // return default profile
      return res.json({
        id: null,
        name: 'Demo User',
        email: 'demo@local',
        phone: '',
        role: 'user',
        avatar: null
      });
    }

    const profile = mapToProfile(doc, type);
    return res.json(profile);
  } catch (err) {
    console.error('getProfile error', err);
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

// PUT /api/profile
// expects multipart/form-data with optional file field 'avatar'
async function updateProfile(req, res) {
  try {
    // multer already stored file (if any) into req.file
    const { name, email, phone, role } = req.body || {};
    const file = req.file;

    // Find an existing farmer or transporter depending on role
    let doc = null;
    let Model = null;
    if (role && role.toLowerCase().includes('trans')) {
      Model = Transporter;
      doc = await Transporter.findOne({});
    } else {
      Model = Farmer;
      doc = await Farmer.findOne({});
    }

    if (!doc) {
      // create a minimal document
      const base = {};
      if (Model === Farmer) {
        base.personalInfo = { name: name || 'New Farmer', mobileNo: phone || '', email: email || '' };
        base.role = role || 'farmer';
      } else {
        base.personalInfo = { name: name || 'New Transporter', mobileNo: phone || '', email: email || '' };
        base.role = role || 'transporter';
      }
      if (file) {
        base.documents = { photo: file.filename };
      }
      const created = await Model.create(base);
      const profile = mapToProfile(created.toObject(), created.role);
      return res.json(profile);
    }

    // Update fields
    if (name) doc.personalInfo = doc.personalInfo || {}, doc.personalInfo.name = name;
    if (email) doc.personalInfo = doc.personalInfo || {}, doc.personalInfo.email = email;
    if (phone) doc.personalInfo = doc.personalInfo || {}, doc.personalInfo.mobileNo = phone;
    if (role) doc.role = role;
    if (file) {
      doc.documents = doc.documents || {};
      doc.documents.photo = file.filename;
    }

    await doc.save();

    const profile = mapToProfile(doc.toObject ? doc.toObject() : doc, doc.role);
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
