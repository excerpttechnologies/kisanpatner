const express = require('express');
const router = express.Router();
const {
  // Location controllers
  getAllStates,
  getDistrictsByState,
  getTalukasByDistrict,
  getLocationByPincode,
  getLocationHierarchy,
  
  // Category controllers
  getAllCategories,
  getCategoryById,
  getAllSubCategories,
  getSubCategoriesByCategory,
  searchCategories,
  getAllVegetables,
  getAllFruits,
  getAllLivestock,
  getAllGrains,
  
  // Crop controllers
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  getCropsByFarmer,
  
  // User controllers
  createUser,
  getUserById,
  
  // Seed data controllers
  seedCategories,
  seedCrops
} = require('../controllers');

// ==================== LOCATION ROUTES ====================
router.get('/locations/states', getAllStates);
router.get('/locations/districts/:stateId', getDistrictsByState);
router.get('/locations/talukas/:districtId', getTalukasByDistrict);
router.get('/locations/pincode/:pincode', getLocationByPincode);
router.get('/locations/hierarchy', getLocationHierarchy);

// ==================== CATEGORY ROUTES ====================
router.get('/categories', getAllCategories);
router.get('/categories/subcategories', getAllSubCategories);
router.get('/categories/subcategories/:categoryId', getSubCategoriesByCategory);
router.get('/categories/:categoryId', getCategoryById);
router.get('/categories/search/all', searchCategories);

// Specific category type routes
router.get('/categories/vegetables/all', getAllVegetables);
router.get('/categories/fruits/all', getAllFruits);
router.get('/categories/livestock/all', getAllLivestock);
router.get('/categories/grains/all', getAllGrains);

// ==================== CROP ROUTES ====================
// Expose crops at the router root so mounting at `/api/crops` yields `/api/crops` etc.
router.get('/', getAllCrops);
router.get('/:id', getCropById);
router.post('/', createCrop);
router.put('/:id', updateCrop);
router.delete('/:id', deleteCrop);
router.get('/farmer/:farmerId', getCropsByFarmer);

// ==================== USER ROUTES ====================
router.post('/users', createUser);
router.get('/users/:id', getUserById);

// ==================== SEED DATA ROUTES ====================
router.post('/seed/categories', seedCategories);
router.post('/seed/crops', seedCrops);

module.exports = router;