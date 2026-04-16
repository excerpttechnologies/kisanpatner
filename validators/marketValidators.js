const Joi = require('joi');

exports.registerSchema = Joi.object({
  mobileNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
  password:     Joi.string().min(6).required(),
  mpin:         Joi.string().pattern(/^[0-9]{4,6}$/).required(),
  email:        Joi.string().email().optional(),
  role:         Joi.string().valid('farmer', 'trader').required(),
  state:        Joi.string().optional(),
  district:     Joi.string().optional(),
  taluk:        Joi.string().optional(),
  village:      Joi.string().optional(),
});

exports.profileUpdateSchema = Joi.object({
  name:            Joi.string().optional(),
  address:         Joi.string().optional(),
  businessName:    Joi.string().optional(),
  businessType:    Joi.string().optional(),
  gstNumber:       Joi.string().optional(),
  businessLicense: Joi.string().optional(),
  bankDetails: Joi.object({
    accountHolderName: Joi.string(),
    accountNumber:     Joi.string(),
    ifscCode:          Joi.string(),
    branch:            Joi.string(),
    bankName:          Joi.string(),
  }).optional(),
}).min(1);

exports.productSchema = Joi.object({
  name:          Joi.string().required(),
  categoryId:    Joi.string().hex().length(24).required(),
  subCategoryId: Joi.string().hex().length(24).optional(),
  price:         Joi.number().min(0).required(),
  quantity:      Joi.number().min(1).required(),
  unit:          Joi.string().valid('kg', 'quintal', 'ton').default('kg'),
  description:   Joi.string().optional(),
  images:        Joi.array().items(Joi.string()).optional(),
  location: Joi.object({
    state: Joi.string(), district: Joi.string(),
    taluk: Joi.string(), village: Joi.string(),
  }).optional(),
});

exports.cartSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity:  Joi.number().min(1).required(),
});

// Middleware helper
exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ success: false, message: error.details.map(d => d.message).join(', ') });
  next();
};
