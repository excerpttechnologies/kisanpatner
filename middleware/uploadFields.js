
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fieldName = file.fieldname.replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, fieldName + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create multer instance with file size limits
const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 50 // Max 50 files total
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'));
    }
  }
});

// Define ALLOWED field names for farmer/trader
const ALLOWED_FIELDS = [
  'panCard',
  'aadharFront', 
  'aadharBack',
  'bankPassbook',
  'businessLicense',
  'photo',
  'businessNameBoard'
];

// Custom middleware to handle unexpected fields
const uploadFields = (req, res, next) => {
  // First, use multer to handle the files
  const multerUpload = upload.fields([
    { name: 'panCard', maxCount: 10 },
    { name: 'aadharFront', maxCount: 10 },
    { name: 'aadharBack', maxCount: 10 },
    { name: 'bankPassbook', maxCount: 10 },
    { name: 'businessLicense', maxCount: 10 },
    { name: 'photo', maxCount: 20 },
    { name: 'businessNameBoard', maxCount: 10 }
  ]);

  multerUpload(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          // Log the unexpected field but don't fail the request
          console.warn(`Unexpected field received: ${err.field}. This field will be ignored.`);
          // Continue without failing
          return next();
        }
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: `File too large. Maximum file size is 5MB.`
          });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            success: false,
            message: `Too many files uploaded for field: ${err.field}`
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed'
      });
    }
    
    // Log received files for debugging
    if (req.files) {
      console.log('=== Received Files ===');
      Object.keys(req.files).forEach(key => {
        console.log(`${key}: ${req.files[key].length} file(s)`);
        req.files[key].forEach((file, idx) => {
          console.log(`  - ${file.originalname} (${(file.size / 1024).toFixed(2)} KB)`);
        });
      });
      
      // Filter out any unexpected fields (though multer already handles this)
      const unexpectedFields = Object.keys(req.files).filter(
        field => !ALLOWED_FIELDS.includes(field)
      );
      if (unexpectedFields.length > 0) {
        console.warn(`Unexpected fields ignored: ${unexpectedFields.join(', ')}`);
        // Remove unexpected fields from req.files
        unexpectedFields.forEach(field => {
          delete req.files[field];
        });
      }
    }
    
    next();
  });
};

module.exports = uploadFields