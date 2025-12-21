const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productcontroller');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and videos
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Routes
router.post('/add', upload.array('photos', 10), productController.addProduct);
router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);
// routes/productRoutes.js
router.get('/by-farmer/:farmerId', productController.getProductsByFarmer);

router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/subcategory/:subCategoryId', productController.getProductsBySubCategory);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.post('/make-offer', productController.makeOffer);
router.post('/accept-listed-price', productController.acceptListedPrice);
router.post('/accept-trader-offer', productController.acceptTraderOffer);
router.post('/make-counter-offer', productController.makeCounterOffer);
router.post('/reject-trader-offer', productController.rejectTraderOffer);
// Get trader's purchase history
router.get('/trader-purchases/:traderId', productController.getTraderPurchases);
// Re-upload photos for a product
router.post('/:productId/reupload-photos', upload.array('photos', 10), productController.reuploadPhotos);
module.exports = router;