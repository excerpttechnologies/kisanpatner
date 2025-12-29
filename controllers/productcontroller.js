const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

// // Add new product
// exports.addProduct = async (req, res) => {
//   try {
//     const {
//       categoryId,
//       subCategoryId,
//       cropBriefDetails,
//       farmingType,
//       typeOfSeeds,
//       packagingType,
//       packageMeasurement,
//       unitMeasurement,
//       deliveryDate,
//       deliveryTime,
//       nearestMarket,
//       farmLocation,
//       gradePrices,
//       sellerId,
//       farmerId
//     } = req.body;

//     // Handle file uploads
//     const cropPhotos = req.files ? req.files.map(file => file.path) : [];

//     // Parse gradePrices if it's a string
//     const parsedGradePrices = typeof gradePrices === 'string'
//       ? JSON.parse(gradePrices)
//       : gradePrices;

//     // Parse farmLocation if it's a string
//     const parsedFarmLocation = typeof farmLocation === 'string'
//       ? JSON.parse(farmLocation)
//       : farmLocation;

//     const newProduct = new Product({
//       farmerId,
//       categoryId,
//       subCategoryId,
//       cropBriefDetails,
//       farmingType,
//       typeOfSeeds,
//       packagingType,
//       packageMeasurement,
//       unitMeasurement,
//       deliveryDate,
//       deliveryTime,
//       nearestMarket,
//       farmLocation: parsedFarmLocation,
//       gradePrices: parsedGradePrices,
//       cropPhotos,
//       sellerId
//     });

//     const savedProduct = await newProduct.save();

//     res.status(201).json({
//       success: true,
//       message: 'Product added successfully',
//       data: savedProduct
//     });
//   } catch (error) {
//     console.error('Error adding product:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error adding product',
//       error: error.message
//     });
//   }
// };
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
      sellerId,
      farmerId,
    } = req.body;

    // 🔴 REQUIRED FIELD VALIDATION (IMPORTANT)
    if (
      !categoryId ||
      !subCategoryId ||
      !cropBriefDetails ||
      !farmingType ||
      !typeOfSeeds ||
      !packagingType ||
      !packageMeasurement ||
      packageMeasurement.trim() === "" ||
      !deliveryDate ||
      !deliveryTime ||
      !nearestMarket ||
      !farmerId
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Handle file uploads
    const cropPhotos = req.files ? req.files.map((file) => file.path) : [];

    // Parse gradePrices
    const parsedGradePrices =
      typeof gradePrices === "string" ? JSON.parse(gradePrices) : gradePrices;

    if (!parsedGradePrices || !parsedGradePrices.length) {
      return res.status(400).json({
        success: false,
        message: "Grade prices are required",
      });
    }

    // Parse farmLocation
    const parsedFarmLocation =
      typeof farmLocation === "string"
        ? JSON.parse(farmLocation)
        : farmLocation;

    const newProduct = new Product({
      farmerId,
      categoryId,
      subCategoryId,
      cropBriefDetails,
      farmingType,
      typeOfSeeds,
      packagingType,
      packageMeasurement: packageMeasurement.trim(), // ✅ FIX
      unitMeasurement,
      deliveryDate,
      deliveryTime,
      nearestMarket,
      farmLocation: parsedFarmLocation,
      gradePrices: parsedGradePrices,
      cropPhotos,
      sellerId,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
};

// Helper function to generate the next ID based on role

// Get all products
// Get all products - REPLACE EXISTING
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName")
      .sort({ createdAt: -1 });

    // ADD THIS: Filter offers based on trader
    const traderId = req.query.traderId; // Get from query params

    if (traderId) {
      // Filter offers to show only relevant ones for this trader
      products.forEach((product) => {
        product.gradePrices.forEach((grade) => {
          if (grade.offers && grade.offers.length > 0) {
            // Show only offers from this trader OR non-private countered offers
            grade.offers = grade.offers.filter(
              (offer) =>
                offer.traderId === traderId ||
                (offer.status === "pending" && !offer.isCounterPrivate)
            );
          }
        });
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};
exports.getProductsByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const products = await Product.find({ farmerId });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.categoryId })
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Get products by subcategory
exports.getProductsBySubCategory = async (req, res) => {
  try {
    const products = await Product.find({
      subCategoryId: req.params.subCategoryId,
    })
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
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
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
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
        message: "Product not found",
      });
    }

    // Delete associated photos
    if (product.cropPhotos && product.cropPhotos.length > 0) {
      product.cropPhotos.forEach((photoPath) => {
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

// After your existing exports, add:

// REPLACE the entire makeOffer function in productController.js

exports.makeOffer = async (req, res) => {
  try {
    const { productId, gradeId, traderId, traderName, offeredPrice, quantity } =
      req.body;

    // Validate required fields
    if (!productId || !gradeId || !traderId || !offeredPrice || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const grade = product.gradePrices.id(gradeId);
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: "Grade not found",
      });
    }

    // Check if priceType is negotiable
    if (grade.priceType !== "negotiable") {
      return res.status(400).json({
        success: false,
        message: "This grade has a fixed price and is not negotiable",
      });
    }

    // Check if grade is already sold
    if (grade.status === "sold") {
      return res.status(400).json({
        success: false,
        message: "This grade is already sold out",
      });
    }

    // Check quantity availability
    if (quantity > grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available quantity",
      });
    }

    // For bulk, quantity must match totalQty
    if (grade.quantityType === "bulk" && quantity !== grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Bulk purchase requires buying full quantity",
      });
    }

    // Add offer
    grade.offers.push({
      traderId,
      traderName: traderName || "Unknown Trader",
      offeredPrice,
      quantity,
      status: "pending",
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Offer submitted successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error making offer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Accept listed price endpoint
// REPLACE the entire acceptListedPrice function in productController.js
exports.acceptListedPrice = async (req, res) => {
  try {
    const { productId, gradeId, traderId, quantity } = req.body;

    // Validate required fields
    if (!productId || !gradeId || !traderId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const grade = product.gradePrices.id(gradeId);
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: "Grade not found",
      });
    }

    // Check if grade is already sold
    if (grade.status === "sold") {
      return res.status(400).json({
        success: false,
        message: "This grade is already sold out",
      });
    }

    // Check quantity availability
    if (quantity > grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available",
      });
    }

    // For bulk, must buy all
    if (grade.quantityType === "bulk" && quantity !== grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Bulk purchase requires full quantity",
      });
    }

    // Calculate total amount BEFORE updating quantity
    const totalAmount = grade.pricePerUnit * quantity;

    // ADD THIS - Get trader name from request or default
    const traderName = req.body.traderName || "Unknown Trader";

    // ADD THIS - Record purchase in history
    if (!grade.purchaseHistory) {
      grade.purchaseHistory = [];
    }

    grade.purchaseHistory.push({
      traderId: traderId,
      traderName: traderName,
      quantity: quantity,
      pricePerUnit: grade.pricePerUnit,
      totalAmount: totalAmount,
      purchaseDate: new Date(),
      purchaseType: "direct",
    });

    // Update quantity
    grade.totalQty -= quantity;

    // Update grade status based on remaining quantity
    if (grade.totalQty === 0) {
      grade.status = "sold";
    } else {
      grade.status = "partially_sold";
    }

    // Save the product
    await product.save();

    res.status(200).json({
      success: true,
      message: grade.totalQty === 0 ? "Grade sold out!" : "Purchase successful",
      data: {
        productId: product._id,
        gradeId: grade._id,
        totalAmount,
        remainingQty: grade.totalQty,
        status: grade.status,
        traderId,
        purchaseDetails: {
          quantity,
          pricePerUnit: grade.pricePerUnit,
          totalAmount,
        },
      },
    });
  } catch (error) {
    console.error("Error accepting offer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REPLACE the entire acceptTraderOffer function in productController.js

// exports.acceptTraderOffer = async (req, res) => {
//   try {
//     const { productId, gradeId, offerId } = req.body;

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     const grade = product.gradePrices.id(gradeId);
//     if (!grade) {
//       return res.status(404).json({
//         success: false,
//         message: 'Grade not found'
//       });
//     }

//     const offer = grade.offers.id(offerId);
//     if (!offer) {
//       return res.status(404).json({
//         success: false,
//         message: 'Offer not found'
//       });
//     }

//     // Check if offer is still pending
//     if (offer.status !== 'pending') {
//       return res.status(400).json({
//         success: false,
//         message: 'This offer has already been processed'
//       });
//     }

//     // Check quantity availability
//     if (offer.quantity > grade.totalQty) {
//       return res.status(400).json({
//         success: false,
//         message: 'Insufficient quantity available'
//       });
//     }

//     // For bulk, validate quantity
//     if (grade.quantityType === 'bulk' && offer.quantity !== grade.totalQty) {
//       return res.status(400).json({
//         success: false,
//         message: 'Bulk purchase requires full quantity'
//       });
//     }

//     // Calculate total amount BEFORE updating
//     const totalAmount = offer.offeredPrice * offer.quantity;

//     // Update offer status
//     offer.status = 'accepted';

//     // Update grade quantity
//     grade.totalQty -= offer.quantity;

//     // Update grade status based on remaining quantity
//     if (grade.totalQty === 0) {
//       grade.status = 'sold';
//     } else {
//       grade.status = 'partially_sold';
//     }

//     // Store purchase info
//     if (!grade.lastPurchase) {
//       grade.lastPurchase = {};
//     }
//     grade.lastPurchase = {
//       traderId: offer.traderId,
//       quantity: offer.quantity,
//       purchaseDate: new Date()
//     };

//     await product.save();

//     res.status(200).json({
//       success: true,
//       message: grade.totalQty === 0 ? 'Grade sold out!' : 'Offer accepted successfully',
//       data: {
//         productId: product._id,
//         gradeId: grade._id,
//         offerId: offer._id,
//         totalAmount,
//         remainingQty: grade.totalQty,
//         status: grade.status,
//         traderId: offer.traderId
//       }
//     });
//   } catch (error) {
//     console.error('Error accepting trader offer:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
exports.acceptTraderOffer = async (req, res) => {
  try {
    const { productId, gradeId, offerId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const grade = product.gradePrices.id(gradeId);
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: "Grade not found",
      });
    }

    const offer = grade.offers.id(offerId);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    // Check if offer is still pending
    if (offer.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This offer has already been processed",
      });
    }

    // Check quantity availability
    if (offer.quantity > grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available",
      });
    }

    // For bulk, validate quantity
    if (grade.quantityType === "bulk" && offer.quantity !== grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Bulk purchase requires full quantity",
      });
    }

    // Calculate total amount BEFORE updating
    const totalAmount = offer.offeredPrice * offer.quantity;

    // Update offer status
    offer.status = "accepted";

    // ADD THIS - Record purchase in history
    if (!grade.purchaseHistory) {
      grade.purchaseHistory = [];
    }

    grade.purchaseHistory.push({
      traderId: offer.traderId,
      traderName: offer.traderName || "Unknown Trader",
      quantity: offer.quantity,
      pricePerUnit: offer.offeredPrice,
      totalAmount: totalAmount,
      purchaseDate: new Date(),
      purchaseType: "offer_accepted",
    });

    // Update grade quantity
    grade.totalQty -= offer.quantity;

    // Update grade status based on remaining quantity
    if (grade.totalQty === 0) {
      grade.status = "sold";
    } else {
      grade.status = "partially_sold";
    }

    await product.save();

    res.status(200).json({
      success: true,
      message:
        grade.totalQty === 0
          ? "Grade sold out!"
          : "Offer accepted successfully",
      data: {
        productId: product._id,
        gradeId: grade._id,
        offerId: offer._id,
        totalAmount,
        remainingQty: grade.totalQty,
        status: grade.status,
        traderId: offer.traderId,
        purchaseDetails: {
          quantity: offer.quantity,
          pricePerUnit: offer.offeredPrice,
          totalAmount,
        },
      },
    });
  } catch (error) {
    console.error("Error accepting trader offer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Make counter offer - REPLACE EXISTING
exports.makeCounterOffer = async (req, res) => {
  try {
    const { productId, gradeId, offerId, counterPrice, counterQuantity } =
      req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const grade = product.gradePrices.id(gradeId);
    if (!grade) {
      return res
        .status(404)
        .json({ success: false, message: "Grade not found" });
    }

    const offer = grade.offers.id(offerId);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }

    // Update the offer with counter values
    offer.status = "countered";
    offer.counterPrice = counterPrice;
    offer.counterQuantity = counterQuantity;
    offer.counterDate = new Date();
    offer.isCounterPrivate = true; // ADD THIS - marks it as private to this trader only

    await product.save();

    res.status(200).json({
      success: true,
      message: "Counter offer sent successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error making counter offer:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject trader's offer
exports.rejectTraderOffer = async (req, res) => {
  try {
    const { productId, gradeId, offerId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const grade = product.gradePrices.id(gradeId);
    if (!grade) {
      return res
        .status(404)
        .json({ success: false, message: "Grade not found" });
    }

    const offer = grade.offers.id(offerId);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }

    offer.status = "rejected";
    await product.save();

    res.status(200).json({
      success: true,
      message: "Offer rejected successfully",
    });
  } catch (error) {
    console.error("Error rejecting offer:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get trader's purchase history
// exports.getTraderPurchases = async (req, res) => {
//   try {
//     const { traderId } = req.params;

//     const products = await Product.find({
//       "gradePrices.purchaseHistory.traderId": traderId,
//     })
//       .populate("categoryId", "categoryName")
//       .populate("subCategoryId", "subCategoryName");

//     const purchases = [];

//     products.forEach((product) => {
//       product.gradePrices.forEach((grade) => {
//         if (grade.purchaseHistory) {
//           grade.purchaseHistory
//             .filter((p) => p.traderId === traderId)
//             .forEach((purchase) => {
//               purchases.push({
//                 _id: purchase._id,
//                 product: {
//                   _id: product._id,
//                   farmerId: product.farmerId,
//                   productId: product.productId,
//                   cropBriefDetails: product.cropBriefDetails,
//                   unitMeasurement: product.unitMeasurement,
//                   categoryName: product.categoryId?.categoryName,
//                   deliveryDate: product.deliveryDate,
//                   subCategoryName: product.subCategoryId?.subCategoryName,
//                 },
//                 grade: grade.grade,
//                 ...purchase._doc,
//               });
//             });
//         }
//       });
//     });

//     // Sort by date, newest first
//     purchases.sort(
//       (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
//     );
//     console.log("data", purchases);
//     res.status(200).json({
//       success: true,
//       count: purchases.length,
//       data: purchases,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// Updated getTraderPurchases in productController.js

exports.getTraderPurchases = async (req, res) => {
  try {
    const { traderId } = req.params;

    const products = await Product.find({
      "gradePrices.purchaseHistory.traderId": traderId,
    })
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName");

    const purchases = [];

    products.forEach((product) => {
      product.gradePrices.forEach((grade) => {
        if (grade.purchaseHistory) {
          grade.purchaseHistory
            .filter((p) => 
              p.traderId === traderId && 
              !p.orderCreated // 🔥 FILTER: Only show items not yet ordered
            )
            .forEach((purchase) => {
              purchases.push({
                _id: purchase._id,
                product: {
                  _id: product._id,
                  farmerId: product.farmerId,
                  productId: product.productId,
                  cropBriefDetails: product.cropBriefDetails,
                  unitMeasurement: product.unitMeasurement,
                  categoryName: product.categoryId?.categoryName,
                  deliveryDate: product.deliveryDate,
                  subCategoryName: product.subCategoryId?.subCategoryName,
                },
                grade: grade.grade,
                ...purchase._doc,
              });
            });
        }
      });
    });

    // Sort by date, newest first
    purchases.sort(
      (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
    );

    res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ADD THIS NEW FUNCTION - Batch make offer for multiple grades
exports.makeOfferBatch = async (req, res) => {
  try {
    const { productId, traderId, traderName, offers } = req.body;
    // offers is an array: [{gradeId, offeredPrice, quantity}, ...]

    if (
      !productId ||
      !traderId ||
      !offers ||
      !Array.isArray(offers) ||
      offers.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields or invalid offers array",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Process all offers in a single transaction
    const results = [];

    for (const offerData of offers) {
      const { gradeId, offeredPrice, quantity } = offerData;

      const grade = product.gradePrices.id(gradeId);
      if (!grade) {
        results.push({ gradeId, success: false, message: "Grade not found" });
        continue;
      }

      // Validation checks
      if (grade.priceType !== "negotiable") {
        results.push({ gradeId, success: false, message: "Not negotiable" });
        continue;
      }

      if (grade.status === "sold") {
        results.push({ gradeId, success: false, message: "Already sold" });
        continue;
      }

      if (quantity > grade.totalQty) {
        results.push({
          gradeId,
          success: false,
          message: "Exceeds available quantity",
        });
        continue;
      }

      if (grade.quantityType === "bulk" && quantity !== grade.totalQty) {
        results.push({
          gradeId,
          success: false,
          message: "Bulk requires full quantity",
        });
        continue;
      }

      // Add offer
      grade.offers.push({
        traderId,
        traderName: traderName || "Unknown Trader",
        offeredPrice,
        quantity,
        status: "pending",
      });

      results.push({ gradeId, success: true, message: "Offer added" });
    }

    // Save once after all offers are added
    await product.save();

    const allSuccess = results.every((r) => r.success);

    res.status(200).json({
      success: allSuccess,
      message: allSuccess
        ? "All offers submitted successfully"
        : "Some offers failed",
      data: { product, results },
    });
  } catch (error) {
    console.error("Error making batch offer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
