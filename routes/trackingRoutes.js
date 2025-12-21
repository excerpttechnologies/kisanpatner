const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');
const upload = require('../middleware/upload');

router.get('/by-name', trackingController.getByName);
router.get('/by-crop/:cropId', trackingController.getByCropId);
router.post('/init', trackingController.createOrInit);
// Also support crop-scoped init for convenience
router.post('/crop/:cropId/init', trackingController.createOrInit);
router.post('/migrate', trackingController.migrateAll);
router.post('/:id/upload', upload.array('files', 10), trackingController.uploadStagePhotos);
router.put('/:id/stage', trackingController.updateStage);

module.exports = router;
