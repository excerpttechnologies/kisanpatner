const Crop = require('../models/Crop');

const addCrop = async (req, res) => {
  try {
    console.log('Received addCrop request body:', req.body);
    const { farmingType, seedType, acres, sowingDate, farmerId, category, subcategory } = req.body;

    if (!farmingType || !seedType || !acres || !sowingDate || !farmerId || !category || !subcategory) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const crop = new Crop({
      farmingType,
      seedType,
      acres: parseFloat(acres),
      sowingDate: new Date(sowingDate),
      farmerId,
      category,
      subcategory
    });

    await crop.save();
    return res.json({ success: true, data: crop });
  } catch (error) {
    console.error('Error in addCrop:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getFarmerCrops = async (req, res) => {
  try {
    const { id } = req.params;
    const crops = await Crop.find({ farmerId: id }).sort({ createdAt: -1 });
    return res.json({ success: true, data: crops });
  } catch (error) {
    console.error('Error in getFarmerCrops:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  addCrop,
  getFarmerCrops
};
