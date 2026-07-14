// // config/kycUpload.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const KYC_UPLOAD_DIR = path.join(__dirname, '..', 'uploads', 'kyc');
// if (!fs.existsSync(KYC_UPLOAD_DIR)) {
//   fs.mkdirSync(KYC_UPLOAD_DIR, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, KYC_UPLOAD_DIR),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname) || '.jpg';
//     const unique = `kyc_${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, unique);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
//   if (allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPG, PNG, or PDF files are allowed for KYC documents'), false);
//   }
// };

// const kycUpload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
// });

// module.exports = kycUpload;





// config/kycUpload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const KYC_UPLOAD_DIR = path.join(__dirname, '..', 'uploads', 'kyc');
if (!fs.existsSync(KYC_UPLOAD_DIR)) {
  fs.mkdirSync(KYC_UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, KYC_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const unique = `kyc_${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, or PDF files are allowed for KYC documents'), false);
  }
};

const kycUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per file
});

// Use .array() everywhere now — supports 1 to 5 KYC documents in one request.
// Frontend appends every file under the SAME field name: "kycDocuments"
module.exports = kycUpload;