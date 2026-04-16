const router = require('express').Router();
const ctrl   = require('../controllers/cartController');
const { protect } = require('../middleware/marketAuth');

router.post('/add',   protect, ctrl.addToCart);
router.get('/',       protect, ctrl.getCart);
router.delete('/:id', protect, ctrl.removeFromCart);

module.exports = router;
