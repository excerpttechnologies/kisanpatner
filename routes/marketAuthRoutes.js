const router = require('express').Router();
const ctrl   = require('../controllers/marketAuthController');
const { validate, registerSchema } = require('../validators/marketValidators');

router.post('/register', validate(registerSchema), ctrl.register);
router.post('/login',    ctrl.login);

module.exports = router;
