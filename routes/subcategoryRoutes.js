const express = require('express');
const router = express.Router();

const { getSubCategoriesByCategory, getAllSubCategories } = require('../controllers');

// Get subcategories for a category id
router.get('/category/:categoryId', getSubCategoriesByCategory);

// Optional: get all subcategories
router.get('/all', getAllSubCategories);

module.exports = router;
