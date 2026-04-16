const router = require('express').Router();
const ctrl   = require('../controllers/marketProductController');
const { protect } = require('../middleware/marketAuth');
const { validate, productSchema } = require('../validators/marketValidators');

router.get('/',       ctrl.listProducts);                           // buyer – public
router.get('/my',     protect, ctrl.getMyProducts);                 // seller
router.post('/',      protect, validate(productSchema), ctrl.createProduct);
router.put('/:id',    protect, ctrl.updateProduct);
router.delete('/:id', protect, ctrl.deleteProduct);

module.exports = router;
