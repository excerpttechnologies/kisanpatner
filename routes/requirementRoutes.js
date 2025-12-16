const express = require('express');
const router = express.Router();

// Import controllers
const requirementController = require('../controllers/requirementController');

// Public routes (for testing)
router.get('/ping', (req, res) => {
  res.json({ message: 'Requirements API is working' });
});

router.post('/debug/post-requirement', requirementController.debugPostRequirement);

// Main routes
router.post('/post-requirement', requirementController.postRequirement);
router.get('/', requirementController.getAllRequirements);

module.exports = router;