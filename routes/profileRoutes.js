const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getProfile, updateProfile } = require('../controllers/profileController');

router.get('/', getProfile);
router.put('/', upload.single('avatar'), updateProfile);

module.exports = router;
