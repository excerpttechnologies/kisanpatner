const router = require('express').Router();
const ctrl   = require('../controllers/locationController');

router.get('/states',    ctrl.getStates);
router.get('/districts', ctrl.getDistricts);
router.get('/taluks',    ctrl.getTaluks);
router.get('/villages',  ctrl.getVillages);

module.exports = router;
