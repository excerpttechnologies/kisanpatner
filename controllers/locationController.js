const { State, District, Taluk, Village } = require('../models/Location');

exports.getStates = async (_, res) => res.json({ success: true, data: await State.find().lean() });

exports.getDistricts = async (req, res) => {
  const { stateId } = req.query;
  if (!stateId) return res.status(400).json({ success: false, message: 'stateId required' });
  res.json({ success: true, data: await District.find({ stateId }).lean() });
};

exports.getTaluks = async (req, res) => {
  const { districtId } = req.query;
  if (!districtId) return res.status(400).json({ success: false, message: 'districtId required' });
  res.json({ success: true, data: await Taluk.find({ districtId }).lean() });
};

exports.getVillages = async (req, res) => {
  const { talukId } = req.query;
  if (!talukId) return res.status(400).json({ success: false, message: 'talukId required' });
  res.json({ success: true, data: await Village.find({ talukId }).lean() });
};
