const {
  State,
  District,
  Taluka,
  Category,
  SubCategory,
  Crop,
  User
} = require('../models/models');

// ==================== LOCATION CONTROLLERS ====================

// Get all states
const getAllStates = async (req, res) => {
  try {
    const states = await State.find({ isActive: true }).select('name code');
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get districts by state
const getDistrictsByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    const districts = await District.find({ state: stateId }).select('name');
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get talukas by district
const getTalukasByDistrict = async (req, res) => {
  try {
    const { districtId } = req.params;
    const talukas = await Taluka.find({ district: districtId })
      .select('name villages');
    res.json(talukas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get location by pincode
const getLocationByPincode = async (req, res) => {
  try {
    const { pincode } = req.params;
    
    const taluka = await Taluka.findOne({ pincodes: pincode })
      .populate({
        path: 'district',
        populate: {
          path: 'state',
          model: 'State'
        }
      });
    
    if (!taluka) {
      return res.status(404).json({ message: 'Location not found for this pincode' });
    }
    
    const response = {
      pincode,
      taluka: taluka.name,
      district: taluka.district.name,
      state: taluka.district.state.name,
      villages: taluka.villages
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all locations hierarchy
const getLocationHierarchy = async (req, res) => {
  try {
    const hierarchy = await State.aggregate([
      {
        $lookup: {
          from: 'districts',
          localField: '_id',
          foreignField: 'state',
          as: 'districts',
          pipeline: [
            {
              $lookup: {
                from: 'talukas',
                localField: '_id',
                foreignField: 'district',
                as: 'talukas'
              }
            }
          ]
        }
      }
    ]);
    
    res.json(hierarchy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== CATEGORY CONTROLLERS ====================

// Get all categories with subcategories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'category',
          as: 'subCategories',
          pipeline: [
            { $match: { isActive: true } },
            { $project: { name: 1, localNames: 1, season: 1 } }
          ]
        }
      },
      { $project: { name: 1, description: 1, icon: 1, subCategories: 1 } }
    ]);
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific category with all subcategories
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const subCategories = await SubCategory.find({
      category: categoryId,
      isActive: true
    }).select('name localNames season');
    
    res.json({
      ...category.toObject(),
      subCategories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subcategories
const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ isActive: true })
      .populate('category', 'name')
      .select('name category localNames season');
    
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategories by category
const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await SubCategory.find({
      category: categoryId,
      isActive: true
    }).select('name localNames season');
    
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search categories and subcategories
const searchCategories = async (req, res) => {
  try {
    const { query } = req.query;
    
    const categories = await Category.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ],
      isActive: true
    }).select('name description icon');
    
    const subCategories = await SubCategory.find({
      name: { $regex: query, $options: 'i' },
      isActive: true
    }).populate('category', 'name')
      .select('name category');
    
    res.json({
      categories,
      subCategories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== CROP CONTROLLERS ====================

// Get all crops with filters
const getAllCrops = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      state,
      district,
      taluka,
      search,
      page = 1,
      limit = 20
    } = req.query;
    
    const filter = { isAvailable: true, status: 'available' };
    
    // Category filter (exact match for category name)
    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }
    
    // Sub-category filter (exact match for subcategory name)
    if (subCategory) {
      const subCategoryDoc = await SubCategory.findOne({ name: subCategory });
      if (subCategoryDoc) {
        filter.subCategory = subCategoryDoc._id;
      }
    }
    
    // Location filters (exact match for location strings)
    if (state) filter['location.state'] = state;
    if (district) filter['location.district'] = district;
    if (taluka) filter['location.taluka'] = taluka;
    
    // Search filter (farmer name or crop name)
    if (search) {
      filter.$or = [
        { cropName: { $regex: search, $options: 'i' } },
        { farmerName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const crops = await Crop.find(filter)
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');
    
    const total = await Crop.countDocuments(filter);
    
    res.json({
      crops,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get crop by ID
const getCropById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const crop = await Crop.findById(id)
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .select('-__v');
    
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new crop listing
const createCrop = async (req, res) => {
  try {
    const cropData = req.body;
    
    // Set posted date
    cropData.postedDate = new Date();
    
    const crop = new Crop(cropData);
    await crop.save();
    
    res.status(201).json({
      message: 'Crop listed successfully',
      crop
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update crop
const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const crop = await Crop.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    res.json({
      message: 'Crop updated successfully',
      crop
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete crop
const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    
    const crop = await Crop.findByIdAndDelete(id);
    
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    res.json({ message: 'Crop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get crops by farmer
const getCropsByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;
    
    const crops = await Crop.find({ farmer: farmerId })
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .sort({ postedDate: -1 });
    
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all vegetable names
const getAllVegetables = async (req, res) => {
  try {
    const vegetables = await SubCategory.find({
      category: await Category.findOne({ name: 'Vegetables' }).select('_id')
    }).select('name localNames season');
    res.json(vegetables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all fruit names
const getAllFruits = async (req, res) => {
  try {
    const fruits = await SubCategory.find({
      category: await Category.findOne({ name: 'Fruits' }).select('_id')
    }).select('name localNames season');
    res.json(fruits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all livestock names
const getAllLivestock = async (req, res) => {
  try {
    const livestock = await SubCategory.find({
      category: await Category.findOne({ name: 'Livestock' }).select('_id')
    }).select('name localNames season');
    res.json(livestock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all grain names
const getAllGrains = async (req, res) => {
  try {
    const grains = await SubCategory.find({
      category: await Category.findOne({ name: 'Grains' }).select('_id')
    }).select('name localNames season');
    res.json(grains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== USER CONTROLLERS ====================

// Create user/farmer
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    await user.save();
    
    res.status(201).json({
      message: 'User created successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-__v');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== SEED DATA CONTROLLERS ====================

// Seed initial categories and subcategories
const seedCategories = async (req, res) => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await SubCategory.deleteMany({});
    
    // Seed categories
    const categoriesData = [
      {
        name: 'Vegetables',
        description: 'Fresh vegetables from farms',
        icon: '🥦'
      },
      {
        name: 'Fruits',
        description: 'Seasonal fresh fruits',
        icon: '🍎'
      },
      {
        name: 'Livestock',
        description: 'Farm animals and poultry',
        icon: '🐄'
      },
      {
        name: 'Grains',
        description: 'Cereals and pulses',
        icon: '🌾'
      }
    ];
    
    const createdCategories = await Category.insertMany(categoriesData);
    
    // Seed subcategories
    const subCategoriesData = [
      // Vegetables
      { name: 'Tomato', category: createdCategories[0]._id, season: 'All Season' },
      { name: 'Beans', category: createdCategories[0]._id, season: 'Winter' },
      { name: 'Potato', category: createdCategories[0]._id, season: 'All Season' },
      { name: 'Carrot', category: createdCategories[0]._id, season: 'Winter' },
      { name: 'Onion', category: createdCategories[0]._id, season: 'All Season' },
      { name: 'Cabbage', category: createdCategories[0]._id, season: 'Winter' },
      { name: 'Cauliflower', category: createdCategories[0]._id, season: 'Winter' },
      { name: 'Brinjal', category: createdCategories[0]._id, season: 'All Season' },
      { name: 'Cucumber', category: createdCategories[0]._id, season: 'Summer' },
      { name: 'Spinach', category: createdCategories[0]._id, season: 'Winter' },
      
      // Fruits
      { name: 'Apple', category: createdCategories[1]._id, season: 'Winter' },
      { name: 'Banana', category: createdCategories[1]._id, season: 'All Season' },
      { name: 'Orange', category: createdCategories[1]._id, season: 'Winter' },
      { name: 'Mango', category: createdCategories[1]._id, season: 'Summer' },
      { name: 'Grapes', category: createdCategories[1]._id, season: 'Summer' },
      { name: 'Pomegranate', category: createdCategories[1]._id, season: 'Winter' },
      { name: 'Guava', category: createdCategories[1]._id, season: 'Winter' },
      { name: 'Papaya', category: createdCategories[1]._id, season: 'All Season' },
      { name: 'Watermelon', category: createdCategories[1]._id, season: 'Summer' },
      { name: 'Muskmelon', category: createdCategories[1]._id, season: 'Summer' },
      
      // Livestock
      { name: 'Cow', category: createdCategories[2]._id, season: 'All Season' },
      { name: 'Buffalo', category: createdCategories[2]._id, season: 'All Season' },
      { name: 'Goat', category: createdCategories[2]._id, season: 'All Season' },
      { name: 'Sheep', category: createdCategories[2]._id, season: 'All Season' },
      { name: 'Chicken', category: createdCategories[2]._id, season: 'All Season' },
      { name: 'Duck', category: createdCategories[2]._id, season: 'All Season' },
      { name: 'Pig', category: createdCategories[2]._id, season: 'All Season' },
      { name: 'Rabbit', category: createdCategories[2]._id, season: 'All Season' },
      { name: 'Fish', category: createdCategories[2]._id, season: 'All Season' },
      { name: 'Camel', category: createdCategories[2]._id, season: 'All Season' },
      
      // Grains
      { name: 'Wheat', category: createdCategories[3]._id, season: 'Rabi' },
      { name: 'Rice', category: createdCategories[3]._id, season: 'Kharif' },
      { name: 'Corn', category: createdCategories[3]._id, season: 'Kharif' },
      { name: 'Barley', category: createdCategories[3]._id, season: 'Rabi' },
      { name: 'Oats', category: createdCategories[3]._id, season: 'Rabi' },
      { name: 'Millet', category: createdCategories[3]._id, season: 'Kharif' },
      { name: 'Sorghum', category: createdCategories[3]._id, season: 'Kharif' },
      { name: 'Pulses', category: createdCategories[3]._id, season: 'Rabi' },
      { name: 'Soybean', category: createdCategories[3]._id, season: 'Kharif' },
      { name: 'Groundnut', category: createdCategories[3]._id, season: 'Kharif' }
    ];
    
    await SubCategory.insertMany(subCategoriesData);
    
    res.json({ message: 'Categories seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seed sample crops
const seedCrops = async (req, res) => {
  try {
    await Crop.deleteMany({});
    
    // Get categories for reference
    const vegetables = await Category.findOne({ name: 'Vegetables' });
    const fruits = await Category.findOne({ name: 'Fruits' });
    const grains = await Category.findOne({ name: 'Grains' });
    
    // Get subcategories
    const tomato = await SubCategory.findOne({ name: 'Tomato', category: vegetables._id });
    const apple = await SubCategory.findOne({ name: 'Apple', category: fruits._id });
    const potato = await SubCategory.findOne({ name: 'Potato', category: vegetables._id });
    const mango = await SubCategory.findOne({ name: 'Mango', category: fruits._id });
    const wheat = await SubCategory.findOne({ name: 'Wheat', category: grains._id });
    const carrot = await SubCategory.findOne({ name: 'Carrot', category: vegetables._id });
    
    const cropsData = [
      {
        farmerName: 'Rajesh Kumar',
        cropName: 'Tomato',
        category: vegetables._id,
        subCategory: tomato._id,
        quantity: { value: 100, unit: 'kg' },
        price: { value: 20, unit: 'per kg' },
        location: {
          state: 'Maharashtra',
          district: 'Pune',
          taluka: 'Baramati',
          village: 'Baramati Village',
          pincode: '413102'
        },
        images: [{ url: 'https://images.unsplash.com/photo-1592141835999-fcf5ef9ef14f?w=400&h=300&fit=crop' }],
        description: 'Fresh organic tomatoes from our farm',
        qualityGrade: 'A',
        postedDate: new Date('2025-12-10'),
        isAvailable: true
      },
      {
        farmerName: 'Priya Singh',
        cropName: 'Apple',
        category: fruits._id,
        subCategory: apple._id,
        quantity: { value: 50, unit: 'kg' },
        price: { value: 80, unit: 'per kg' },
        location: {
          state: 'Himachal Pradesh',
          district: 'Shimla',
          taluka: 'Kufri',
          village: 'Kufri Village',
          pincode: '171012'
        },
        images: [{ url: 'https://images.unsplash.com/photo-1560806674-d530eb9d4e5d?w=400&h=300&fit=crop' }],
        description: 'Fresh Himachal apples',
        qualityGrade: 'Premium',
        postedDate: new Date('2025-12-09'),
        isAvailable: true
      },
      {
        farmerName: 'Amit Patel',
        cropName: 'Potato',
        category: vegetables._id,
        subCategory: potato._id,
        quantity: { value: 200, unit: 'kg' },
        price: { value: 15, unit: 'per kg' },
        location: {
          state: 'Punjab',
          district: 'Jalandhar',
          taluka: 'Nakodar',
          village: 'Nakodar Village',
          pincode: '144040'
        },
        images: [{ url: 'https://images.unsplash.com/photo-1540895577874-94b5e5f6868d?w=400&h=300&fit=crop' }],
        description: 'Fresh potatoes from Punjab',
        qualityGrade: 'A',
        postedDate: new Date('2025-12-08'),
        isAvailable: true
      },
      {
        farmerName: 'Geeta Sharma',
        cropName: 'Mango',
        category: fruits._id,
        subCategory: mango._id,
        quantity: { value: 100, unit: 'kg' },
        price: { value: 60, unit: 'per kg' },
        location: {
          state: 'Maharashtra',
          district: 'Nashik',
          taluka: 'Nandgaon',
          village: 'Nandgaon Village',
          pincode: '423106'
        },
        images: [{ url: 'https://images.unsplash.com/photo-1585518419759-47b4ad7cc272?w=400&h=300&fit=crop' }],
        description: 'Alphonso mangoes from Nashik',
        qualityGrade: 'Premium',
        postedDate: new Date('2025-12-07'),
        isAvailable: true
      },
      {
        farmerName: 'Vikram Verma',
        cropName: 'Wheat',
        category: grains._id,
        subCategory: wheat._id,
        quantity: { value: 500, unit: 'kg' },
        price: { value: 25, unit: 'per kg' },
        location: {
          state: 'Punjab',
          district: 'Amritsar',
          taluka: 'Rajasansi',
          village: 'Rajasansi Village',
          pincode: '143101'
        },
        images: [{ url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop' }],
        description: 'High quality wheat grains',
        qualityGrade: 'A',
        postedDate: new Date('2025-12-06'),
        isAvailable: true
      },
      {
        farmerName: 'Sunita Gupta',
        cropName: 'Carrot',
        category: vegetables._id,
        subCategory: carrot._id,
        quantity: { value: 80, unit: 'kg' },
        price: { value: 30, unit: 'per kg' },
        location: {
          state: 'Haryana',
          district: 'Hisar',
          taluka: 'Fatehabad',
          village: 'Fatehabad Village',
          pincode: '125050'
        },
        images: [{ url: 'https://images.unsplash.com/photo-1610889335735-5a3b8a97a5eb?w=400&h=300&fit=crop' }],
        description: 'Fresh organic carrots',
        qualityGrade: 'Organic',
        postedDate: new Date('2025-12-05'),
        isAvailable: true
      }
    ];
    
    await Crop.insertMany(cropsData);
    
    res.json({ message: 'Sample crops seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all controllers
module.exports = {
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
};