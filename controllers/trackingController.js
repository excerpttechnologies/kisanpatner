const Tracking = require('../models/Tracking');

const DEFAULT_STAGE_NAMES = [
  'Nursery',
  'Pre-Planting',
  'Transplanting',
  'Vegetative',
  'Flowering',
  'Fruit Development',
  'Harvesting'
];

const getByName = async (req, res) => {
  try {
    const farmerId = req.query.farmerId;
    if (!farmerId) return res.status(400).json({ success: false, message: 'Missing name query' });
    const track = await Tracking.findOne({ farmerId });
    if (!track) return res.status(404).json({ success: false, message: 'Tracking not found' });
    return res.json({ success: true, data: track });
  } catch (error) {
    console.error('getByName error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getByCropId = async (req, res) => {
  try {
    const cropId = req.params.cropId;
    if (!cropId) return res.status(400).json({ success: false, message: 'Missing cropId param' });
    const track = await Tracking.findOne({ cropId });
    if (!track) return res.status(404).json({ success: false, message: 'Tracking not found for crop' });
    return res.json({ success: true, data: track });
  } catch (error) {
    console.error('getByCropId error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createOrInit = async (req, res) => {
  try {
    const { name, cropName, farmerId, cropId } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Missing name' });

    // default stages (7 stages)
    const defaultStages = DEFAULT_STAGE_NAMES.map(n => ({ name: n, status: 'pending', photos: [] }));

    let track = await Tracking.findOne({ name });
    if (!track) {
      track = new Tracking({ name, cropName, farmerId, cropId, stages: defaultStages });
      await track.save();
    }

    // If cropId provided, link tracking id into Crop document
    if (cropId) {
      try {
        const Crop = require('../models/Crop');
        await Crop.findByIdAndUpdate(cropId, { trackingId: track._id }, { new: true });
      } catch (e) {
        console.warn('Could not link trackingId to Crop:', e.message || e);
      }
    }

    return res.json({ success: true, data: track });
  } catch (error) {
    console.error('createOrInit error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const migrateAll = async (req, res) => {
  try {
    const defaultStages = DEFAULT_STAGE_NAMES.map(n => ({ name: n, status: 'pending', photos: [] }));

    const all = await Tracking.find();
    let updated = 0;
    for (const t of all) {
      if (!t.stages) t.stages = [];
      if (t.stages.length < defaultStages.length) {
        // append missing stages preserving existing ones
        for (let i = t.stages.length; i < defaultStages.length; i++) {
          t.stages.push(defaultStages[i]);
        }
        await t.save();
        updated++;
      }
    }
    return res.json({ success: true, updated });
  } catch (error) {
    console.error('migrateAll error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const uploadStagePhotos = async (req, res) => {
  try {
    const { id } = req.params; // tracking id
    const { stageIndex, uploadDate } = req.body;
    if (typeof stageIndex === 'undefined') return res.status(400).json({ success: false, message: 'Missing stageIndex' });
    const track = await Tracking.findById(id);
    if (!track) return res.status(404).json({ success: false, message: 'Tracking not found' });

    const files = req.files || [];
    const paths = files.map(f => f.path.replace(/\\/g, '/'));

    // ensure stage exists; if not, append default-named stages up to requested index
    const si = parseInt(stageIndex, 10);
    if (si >= track.stages.length) {
      for (let i = track.stages.length; i <= si; i++) {
        const name = DEFAULT_STAGE_NAMES[i] || `Stage ${i + 1}`;
        track.stages.push({ name, status: 'pending', photos: [] });
      }
    }
    track.stages[si].photos.push(...paths);
    if (uploadDate) {
      track.stages[si].uploadDate = new Date(uploadDate);
    }
    await track.save();

    return res.json({ success: true, data: track });
  } catch (error) {
    console.error('uploadStagePhotos error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { stageIndex, status, startDate, endDate, clearPhotos } = req.body;
    const track = await Tracking.findById(id);
    if (!track) return res.status(404).json({ success: false, message: 'Tracking not found' });
    const si = parseInt(stageIndex, 10);
    if (si >= track.stages.length) {
      for (let i = track.stages.length; i <= si; i++) {
        const name = DEFAULT_STAGE_NAMES[i] || `Stage ${i + 1}`;
        track.stages.push({ name, status: 'pending', photos: [] });
      }
    }

    if (clearPhotos) {
      track.stages[si].photos = [];
    }
    if (status) track.stages[si].status = status;
    if (startDate) track.stages[si].startDate = new Date(startDate);
    if (endDate) track.stages[si].endDate = new Date(endDate);

    // update currentStageIndex if needed
    if (status === 'in_progress') track.currentStageIndex = parseInt(stageIndex, 10);

    await track.save();
    return res.json({ success: true, data: track });
  } catch (error) {
    console.error('updateStage error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getByName, getByCropId, createOrInit, uploadStagePhotos, updateStage, migrateAll };