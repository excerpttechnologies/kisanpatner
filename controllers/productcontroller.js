const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

// Add new product
exports.addProduct = async (req, res) => {
  try {
    const {
      categoryId,
      subCategoryId,
      cropBriefDetails,
      farmingType,
      typeOfSeeds,
      packagingType,
      packageMeasurement,
      unitMeasurement,
      deliveryDate,
      deliveryTime,
      nearestMarket,
      farmLocation,
      gradePrices,
      sellerId
    } = req.body;

    // Handle file uploads
    const cropPhotos = req.files ? req.files.map(file => file.path) : [];

    // Parse gradePrices if it's a string
    const parsedGradePrices = typeof gradePrices === 'string' 
      ? JSON.parse(gradePrices) 
      : gradePrices;

    // Parse farmLocation if it's a string
    const parsedFarmLocation = typeof farmLocation === 'string'
      ? JSON.parse(farmLocation)
      : farmLocation;

    const newProduct = new Product({
      categoryId,
      subCategoryId,
      cropBriefDetails,
      farmingType,
      typeOfSeeds,
      packagingType,
      packageMeasurement,
      unitMeasurement,
      deliveryDate,
      deliveryTime,
      nearestMarket,
      farmLocation: parsedFarmLocation,
      gradePrices: parsedGradePrices,
      cropPhotos,
      sellerId
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: savedProduct
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error: error.message
    });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('categoryId', 'categoryName')
      .populate('subCategoryId', 'subCategoryName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryId', 'categoryName')
      .populate('subCategoryId', 'subCategoryName');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.categoryId })
      .populate('categoryId', 'categoryName')
      .populate('subCategoryId', 'subCategoryName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get products by subcategory
exports.getProductsBySubCategory = async (req, res) => {
  try {
    const products = await Product.find({ subCategoryId: req.params.subCategoryId })
      .populate('categoryId', 'categoryName')
      .populate('subCategoryId', 'subCategoryName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products by subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete associated photos
    if (product.cropPhotos && product.cropPhotos.length > 0) {
      product.cropPhotos.forEach(photoPath => {
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// Update product status
exports.updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product status updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product status',
      error: error.message
    });
  }
};