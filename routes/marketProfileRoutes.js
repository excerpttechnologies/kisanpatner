const router = require('express').Router();
const ctrl   = require('../controllers/profileUpdateController');
const { protect } = require('../middleware/marketAuth');

router.get('/',       protect, ctrl.getProfile);
router.put('/update', protect, ctrl.updateProfile);

module.exports = router;
