const router = require('express').Router();
const ctrl   = require('../controllers/marketAuthController');
const { validate, registerSchema } = require('../validators/marketValidators');

router.post('/register', validate(registerSchema), ctrl.register);
router.post('/login',    ctrl.login);

router.post('/b2b/register',          ctrl.b2bRegister);
router.post('/b2b/send-otp',          ctrl.b2bSendOtp);
router.post('/b2b/verify-otp-login',  ctrl.b2bVerifyOtpLogin);
router.post('/b2b/login-mpin',        ctrl.b2bLoginMpin);
router.post('/b2b/login-password',    ctrl.b2bLoginPassword);
router.post('/b2b/change-password',   ctrl.b2bChangePassword);
router.get('/b2b/profile/:id',        ctrl.b2bGetProfile);
router.put('/b2b/profile/:id',        ctrl.b2bUpdateProfile);
 
module.exports = router;


