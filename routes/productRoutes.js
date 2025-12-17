const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// basic multer setup (matches other project files if needed)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/add', upload.array('photos', 10), productController.addProduct);
router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/subcategory/:subCategoryId', productController.getProductsBySubCategory);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.patch('/status/:id', productController.updateProductStatus);

module.exports = router;
