const Product = require("../models/product");
const fs = require("fs");
const path = require("path");
const Farmer = require("../models/Farmer");
const Category=require("../models/category")
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
//jan 22 before working
//exports.addProduct = async (req, res) => {
  //try {
    //const {
      //categoryId,
      //subCategoryId,
      //cropBriefDetails,
      //farmingType,
      //typeOfSeeds,
      //packagingType,
      //packageMeasurement,
      //unitMeasurement,
      //deliveryDate,
      //deliveryTime,
      //nearestMarket,
      //farmLocation,
      //gradePrices,
      //sellerId,
      //farmerId,
    //} = req.body;

    // 🔴 REQUIRED FIELD VALIDATION (IMPORTANT)
    //if (
      //!categoryId ||
      //!subCategoryId ||
      //!cropBriefDetails ||
      //!farmingType ||
      //!typeOfSeeds ||
      //!packagingType ||
     // !packageMeasurement ||
      //packageMeasurement.trim() === "" ||
      //!deliveryDate ||
      //!deliveryTime ||
     // !nearestMarket ||
      //!farmerId
    //) {
      //return res.status(400).json({
        //success: false,
        //message: "All required fields must be filled",
      //});
    //}

    // Handle file uploads
    //const cropPhotos = req.files
      //?.filter(file => file.fieldname === 'photos')
      //.map(file => file.path) || [];

    // Parse gradePrices
    //const parsedGradePrices = typeof gradePrices === "string"
      //? JSON.parse(gradePrices)
      //: gradePrices;

    // ADD THIS - Assign photos to respective grades
    //const gradesWithPhotos = parsedGradePrices.map(grade => {
      //const gradePhotos = req.files
        //?.filter(file => file.fieldname === `gradePhotos_${grade.grade}`)
        //.map(file => file.path) || [];

      //return {
        //...grade,
       // gradePhotos: gradePhotos
      //};
    //});
    // Parse farmLocation
    //const parsedFarmLocation =
      //typeof farmLocation === "string"
       // ? JSON.parse(farmLocation)
        //: farmLocation;

    //const newProduct = new Product({
      //farmerId,
      //categoryId,
     // subCategoryId,
      //cropBriefDetails,
    //  farmingType,
      //typeOfSeeds,
  //    packagingType,
    //  packageMeasurement: packageMeasurement.trim(), // ✅ FIX

    //unitMeasurement,
//      deliveryDate,
  //    deliveryTime,
    //  nearestMarket,
      //farmLocation: parsedFarmLocation,
    //  gradePrices: gradesWithPhotos,
      //cropPhotos,

      //sellerId,
    //});

    //const savedProduct = await newProduct.save();

    //res.status(201).json({
      //success: true,
  //    message: "Product added successfully",
    //  data: savedProduct,
    //});
 // } catch (error) {
   // console.error("Error adding product:", error);
   // res.status(500).json({
     // success: false,
  //    message: "Error adding product",
    //  error: error.message,
    //});
 // }
//};



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
      // 🔥 NEW LIVESTOCK FIELDS
      livestockAge,
      livestockWeight,
      livestockGender,
      livestockDescription,
      price,
      quantity,
      quantityType,
      priceType
    } = req.body;

    // Check if this is a livestock category
    const category = await Category.findById(categoryId);
    const isLivestock = category?.categoryName?.toLowerCase().includes('livestock');

    // 🔴 REQUIRED FIELD VALIDATION
    // if (
    //   !categoryId ||
    //   !subCategoryId ||
    //   !cropBriefDetails ||
    //   !farmingType ||
    //   !deliveryDate ||
    //   !deliveryTime ||
    //   !farmerId
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All required fields must be filled",
    //   });
    // }

    // Handle file uploads
    const cropPhotos = req.files
      ?.filter(file => file.fieldname === 'photos')
      .map(file => file.path) || [];

    let finalGradePrices;

    // 🔥 IF LIVESTOCK - Create default Grade A entry
    if (isLivestock) {
      finalGradePrices = [{
        grade: "A Grade",
        pricePerUnit: parseFloat(price),
        totalQty: parseFloat(quantity),
        quantityType: quantityType || "bulk",
        priceType: priceType || "negotiable",
        gradePhotos: cropPhotos, // Use uploaded photos
        status: 'available'
      }];
    } else {
      // CROP - Parse gradePrices as before
      const parsedGradePrices = typeof gradePrices === "string"
        ? JSON.parse(gradePrices)
        : gradePrices;

      // Assign photos to respective grades
      finalGradePrices = parsedGradePrices.map(grade => {
        const gradePhotos = req.files
          ?.filter(file => file.fieldname === `gradePhotos_${grade.grade}`)
          .map(file => file.path) || [];

        return {
          ...grade,
          gradePhotos: gradePhotos
        };
      });
    }

    // Parse farmLocation
    const parsedFarmLocation =
      typeof farmLocation === "string"
        ? JSON.parse(farmLocation)
        : farmLocation;

    // 🔥 Parse livestock age if provided
    const parsedLivestockAge = livestockAge && typeof livestockAge === "string"
      ? JSON.parse(livestockAge)
      : livestockAge;

    const newProduct = new Product({
      farmerId,
      categoryId,
      subCategoryId,
      cropBriefDetails, // For livestock: animal type (Goat, Cow, etc.)
      farmingType, // For livestock: breed type (Gohlwadi, Jersey, etc.)
      typeOfSeeds: typeOfSeeds || "N/A", // Not applicable for livestock
      packagingType: packagingType || "N/A",
      packageMeasurement: packageMeasurement?.trim() || "N/A",
      unitMeasurement: unitMeasurement || "N/A",
      deliveryDate,
      deliveryTime,
      nearestMarket,
      farmLocation: parsedFarmLocation,
      gradePrices: finalGradePrices, // Contains Grade A for livestock
      cropPhotos: isLivestock ? [] : cropPhotos, // For crops, store separately
      // 🔥 ADD LIVESTOCK DETAILS (NEW FIELD IN SCHEMA)
      livestockDetails: isLivestock ? {
        age: parsedLivestockAge,
        weight: livestockWeight ? parseFloat(livestockWeight) : undefined,
        gender: livestockGender,
        description: livestockDescription
      } : undefined,
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
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("categoryId", "categoryName")
//       .populate("subCategoryId", "subCategoryName")
//       .sort({ createdAt: -1 });

//     // ADD THIS: Filter offers based on trader
//     const traderId = req.query.traderId; // Get from query params

//     if (traderId) {
//       // Filter offers to show only relevant ones for this trader
//       products.forEach((product) => {
//         product.gradePrices.forEach((grade) => {
//           if (grade.offers && grade.offers.length > 0) {
//             // Show only offers from this trader OR non-private countered offers
//             grade.offers = grade.offers.filter(
//               (offer) =>
//                 offer.traderId === traderId ||
//                 (offer.status === "pending" && !offer.isCounterPrivate)
//             );
//           }
//         });
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching products",
//       error: error.message,
//     });
//   }
// };
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName")
      .sort({ createdAt: -1 });

    const traderId = req.query.traderId;

    if (traderId) {
      products.forEach((product) => {
        product.gradePrices.forEach((grade) => {
          if (grade.offers && grade.offers.length > 0) {
            grade.offers = grade.offers.filter(
              (offer) =>
                // Show ALL offers where this trader is involved
                offer.traderId === traderId
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
    const { productId, gradeId, traderId,  offeredPrice, quantity } =
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
 const trader = await Farmer.findOne({ traderId });

    if (!trader) {
      return res.status(404).json({
        success: false,
        message: "Trader not found",
      });
    }

    const traderName = trader.personalInfo.name;
    // Add offer
    grade.offers.push({
      traderId,
      traderName,
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


exports.makeCounterOffer = async (req, res) => {
  try {
    const { productId, gradeId, offerId, counterPrice, counterQuantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const grade = product.gradePrices.id(gradeId);
    if (!grade) {
      return res.status(404).json({ success: false, message: "Grade not found" });
    }

    const offer = grade.offers.id(offerId);
    if (!offer) {
      return res.status(404).json({ success: false, message: "Offer not found" });
    }

    // Validate counter quantity
    if (counterQuantity > grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Counter quantity exceeds available quantity"
      });
    }

    if (grade.quantityType === 'bulk' && counterQuantity !== grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Bulk purchase requires full quantity"
      });
    }

    // Update the offer with counter values
    offer.status = "countered";
    offer.counterPrice = counterPrice;
    offer.counterQuantity = counterQuantity;
    offer.counterDate = new Date();

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
    // const traderName = req.body.traderName || "Unknown Trader";
const trader = await Farmer.findOne({ traderId });

    if (!trader) {
      return res.status(404).json({
        success: false,
        message: "Trader not found",
      });
    }

    const traderName = trader.personalInfo.name; // ✅ Correct source

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
// exports.makeCounterOffer = async (req, res) => {
//   try {
//     const { productId, gradeId, offerId, counterPrice, counterQuantity } =
//       req.body;

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     const grade = product.gradePrices.id(gradeId);
//     if (!grade) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Grade not found" });
//     }

//     const offer = grade.offers.id(offerId);
//     if (!offer) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Offer not found" });
//     }

//     // Update the offer with counter values
//     offer.status = "countered";
//     offer.counterPrice = counterPrice;
//     offer.counterQuantity = counterQuantity;
//     offer.counterDate = new Date();
//     offer.isCounterPrivate = true; // ADD THIS - marks it as private to this trader only

//     await product.save();

//     res.status(200).json({
//       success: true,
//       message: "Counter offer sent successfully",
//       data: product,
//     });
//   } catch (error) {
//     console.error("Error making counter offer:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
exports.acceptCounterOffer = async (req, res) => {
  try {
    const { productId, gradeId, offerId, traderId, traderName } = req.body;

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

    // Verify offer is countered
    if (offer.status !== "countered") {
      return res.status(400).json({
        success: false,
        message: "This offer has not been countered by the farmer",
      });
    }

    // Check if counter quantity is available
    if (offer.counterQuantity > grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available",
      });
    }

    // For bulk, validate quantity
    if (grade.quantityType === "bulk" && offer.counterQuantity !== grade.totalQty) {
      return res.status(400).json({
        success: false,
        message: "Bulk purchase requires full quantity",
      });
    }

    // Calculate total amount using COUNTER PRICE
    const totalAmount = offer.counterPrice * offer.counterQuantity;

    // Update offer status to accepted
    offer.status = "accepted";

    // Record purchase in history
    if (!grade.purchaseHistory) {
      grade.purchaseHistory = [];
    }

    grade.purchaseHistory.push({
      traderId: offer.traderId,
      traderName: offer.traderName || "Unknown Trader",
      quantity: offer.counterQuantity,
      pricePerUnit: offer.counterPrice,
      totalAmount: totalAmount,
      purchaseDate: new Date(),
      purchaseType: "offer_accepted",
      paymentStatus: "pending",
      orderCreated: false, // Will be set to true when order is created
    });

    // Update grade quantity
    grade.totalQty -= offer.counterQuantity;

    // Update grade status based on remaining quantity
    if (grade.totalQty === 0) {
      grade.status = "sold";
    } else {
      grade.status = "partially_sold";
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Counter offer accepted successfully",
      data: {
        productId: product._id,
        gradeId: grade._id,
        offerId: offer._id,
        totalAmount,
        remainingQty: grade.totalQty,
        status: grade.status,
        purchaseDetails: {
          quantity: offer.counterQuantity,
          pricePerUnit: offer.counterPrice,
          totalAmount,
        },
      },
    });
  } catch (error) {
    console.error("Error accepting counter offer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
//             .filter((p) =>
//               p.traderId === traderId &&
//               !p.orderCreated // 🔥 FILTER: Only show items not yet ordered
//             )
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
              !p.orderCreated
            )
            .forEach((purchase) => {
              purchases.push({
                _id: purchase._id,
                gradeId: grade._id, // ✅ ADD THIS LINE
                 quantityType: grade.quantityType,
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


// Get farmer notifications with unread count
exports.getFarmerNotifications = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const products = await Product.find({ farmerId })
      .populate('categoryId', 'categoryName')
      .populate('subCategoryId', 'subCategoryName')
      .sort({ updatedAt: -1 });

    const notifications = [];
    let unreadCount = 0;

    products.forEach(product => {
      product.gradePrices.forEach(grade => {
        if (grade.offers && grade.offers.length > 0) {
          grade.offers.forEach(offer => {
            // Create notification for each offer
            const notification = {
              _id: offer._id,
              offerId: offer.offerId,
              productId: product._id,
              productName: product.cropBriefDetails,
              productCode: product.productId,
              gradeId: grade._id,
              gradeName: grade.grade,
              traderId: offer.traderId,
              traderName: offer.traderName || 'Unknown Trader',
              offeredPrice: offer.offeredPrice,
              quantity: offer.quantity,
              totalAmount: offer.offeredPrice * offer.quantity,
              status: offer.status,
              counterPrice: offer.counterPrice,
              counterQuantity: offer.counterQuantity,
              counterDate: offer.counterDate,
              isRead: offer.isReadByFarmer || false,
              notificationReadAt: offer.notificationReadAt,
              createdAt: offer.createdAt,
              unitMeasurement: product.unitMeasurement,
              categoryName: product.categoryId?.categoryName,
              subCategoryName: product.subCategoryId?.subCategoryName
            };

            notifications.push(notification);

            // Count unread
            if (!offer.isReadByFarmer) {
              unreadCount++;
            }
          });
        }
      });
    });

    // Sort by date, newest first
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      unreadCount,
      totalCount: notifications.length,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { productId, gradeId, offerId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const grade = product.gradePrices.id(gradeId);
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    const offer = grade.offers.id(offerId);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }

    offer.isReadByFarmer = true;
    offer.notificationReadAt = new Date();

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark all notifications as read for a farmer
exports.markAllNotificationsAsRead = async (req, res) => {
  try {
    const { farmerId } = req.body;

    const products = await Product.find({ farmerId });

    let updatedCount = 0;

    for (const product of products) {
      let productUpdated = false;

      product.gradePrices.forEach(grade => {
        if (grade.offers && grade.offers.length > 0) {
          grade.offers.forEach(offer => {
            if (!offer.isReadByFarmer) {
              offer.isReadByFarmer = true;
              offer.notificationReadAt = new Date();
              productUpdated = true;
              updatedCount++;
            }
          });
        }
      });

      if (productUpdated) {
        await product.save();
      }
    }

    res.status(200).json({
      success: true,
      message: `${updatedCount} notifications marked as read`,
      updatedCount
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get trader notifications
exports.getTraderNotifications = async (req, res) => {
  try {
    const { traderId } = req.params;

    const products = await Product.find({
      "gradePrices.offers.traderId": traderId
    })
      .populate('categoryId', 'categoryName')
      .populate('subCategoryId', 'subCategoryName')
      .sort({ updatedAt: -1 });

    const notifications = [];
    let unreadCount = 0;

    products.forEach(product => {
      product.gradePrices.forEach(grade => {
        if (grade.offers && grade.offers.length > 0) {
          grade.offers
            .filter(offer => offer.traderId === traderId)
            .forEach(offer => {
              const notification = {
                _id: offer._id,
                offerId: offer.offerId,
                productId: product._id,
                productName: product.cropBriefDetails,
                productCode: product.productId,
                farmerId: product.farmerId,
                gradeId: grade._id,
                gradeName: grade.grade,
                offeredPrice: offer.offeredPrice,
                quantity: offer.quantity,
                totalAmount: offer.offeredPrice * offer.quantity,
                status: offer.status,
                counterPrice: offer.counterPrice,
                counterQuantity: offer.counterQuantity,
                counterDate: offer.counterDate,
                isRead: offer.isReadByTrader || false,
                notificationReadAt: offer.traderNotificationReadAt,
                createdAt: offer.createdAt,
                unitMeasurement: product.unitMeasurement,
                categoryName: product.categoryId?.categoryName,
                subCategoryName: product.subCategoryId?.subCategoryName,
                nearestMarket: product.nearestMarket,
                deliveryDate: product.deliveryDate
              };

              notifications.push(notification);

              if (!offer.isReadByTrader) {
                unreadCount++;
              }
            });
        }
      });
    });

    // Fetch payment notifications from orders
    const Order = require('../models/order');
    const orders = await Order.find({ traderId }).sort({ createdAt: -1 });

    orders.forEach(order => {
      // Check for payment status changes
      if (order.traderToAdminPayment &&
          !order.traderToAdminPayment.lastStatusChangeReadByTrader) {
        notifications.push({
          _id: `payment_${order._id}`,
          type: 'payment',
          orderId: order.orderId,
          orderObjectId: order._id,
          farmerId: order.farmerId,
          farmerName: order.farmerName,
          totalAmount: order.traderToAdminPayment.totalAmount,
          paidAmount: order.traderToAdminPayment.paidAmount,
          remainingAmount: order.traderToAdminPayment.remainingAmount,
          paymentStatus: order.traderToAdminPayment.paymentStatus,
          fees: order.traderToAdminPayment.fees,
          isRead: false,
          createdAt: order.traderToAdminPayment.lastStatusChangeDate || order.createdAt,
          message: `Payment ${order.traderToAdminPayment.paymentStatus} for order ${order.orderId}`
        });
        unreadCount++;
      }

      // Check for individual payment records
      if (order.traderToAdminPayment && order.traderToAdminPayment.paymentHistory) {
        order.traderToAdminPayment.paymentHistory
          .filter(payment => !payment.isReadByTrader)
          .forEach(payment => {
            notifications.push({
              _id: `payment_record_${payment._id}`,
              type: 'payment_received',
              orderId: order.orderId,
              orderObjectId: order._id,
              paymentId: payment._id,
              amount: payment.amount,
              paidDate: payment.paidDate,
              razorpayPaymentId: payment.razorpayPaymentId,
              isRead: false,
              createdAt: payment.paidDate,
              message: `Payment of ₹${payment.amount} received for order ${order.orderId}`
            });
            unreadCount++;
          });
      }
    });

    // Sort all notifications by date
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      unreadCount,
      totalCount: notifications.length,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching trader notifications:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark trader notification as read
exports.markTraderNotificationAsRead = async (req, res) => {
  try {
    const { notificationId, type } = req.body;

    if (type === 'payment' || type === 'payment_status') {
      // Mark payment notification as read
      const { orderObjectId } = req.body;
      const Order = require('../models/order');
      const order = await Order.findById(orderObjectId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      if (order.traderToAdminPayment) {
        order.traderToAdminPayment.lastStatusChangeReadByTrader = true;
        await order.save();
      }
    } else if (type === 'payment_received') {
      // Mark individual payment record as read
      const { orderObjectId, paymentId } = req.body;
      const Order = require('../models/order');
      const order = await Order.findById(orderObjectId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      const payment = order.traderToAdminPayment.paymentHistory.id(paymentId);
      if (payment) {
        payment.isReadByTrader = true;
        payment.traderNotificationReadAt = new Date();
        await order.save();
      }
    } else {
      // Mark offer notification as read
      const { productId, gradeId, offerId } = req.body;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      const grade = product.gradePrices.id(gradeId);
      if (!grade) {
        return res.status(404).json({
          success: false,
          message: 'Grade not found'
        });
      }

      const offer = grade.offers.id(offerId);
      if (!offer) {
        return res.status(404).json({
          success: false,
          message: 'Offer not found'
        });
      }

      offer.isReadByTrader = true;
      offer.traderNotificationReadAt = new Date();
      await product.save();
    }

    res.status(200).json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking trader notification as read:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark all trader notifications as read
exports.markAllTraderNotificationsAsRead = async (req, res) => {
  try {
    const { traderId } = req.body;

    let updatedCount = 0;

    // Update offer notifications
    const products = await Product.find({
      "gradePrices.offers.traderId": traderId
    });

    for (const product of products) {
      let productUpdated = false;

      product.gradePrices.forEach(grade => {
        if (grade.offers && grade.offers.length > 0) {
          grade.offers
            .filter(offer => offer.traderId === traderId)
            .forEach(offer => {
              if (!offer.isReadByTrader) {
                offer.isReadByTrader = true;
                offer.traderNotificationReadAt = new Date();
                productUpdated = true;
                updatedCount++;
              }
            });
        }
      });

      if (productUpdated) {
        await product.save();
      }
    }

    // Update payment notifications
    const Order = require('../models/order');
    const orders = await Order.find({ traderId });

    for (const order of orders) {
      let orderUpdated = false;

      if (order.traderToAdminPayment &&
          !order.traderToAdminPayment.lastStatusChangeReadByTrader) {
        order.traderToAdminPayment.lastStatusChangeReadByTrader = true;
        orderUpdated = true;
        updatedCount++;
      }

      if (order.traderToAdminPayment && order.traderToAdminPayment.paymentHistory) {
        order.traderToAdminPayment.paymentHistory.forEach(payment => {
          if (!payment.isReadByTrader) {
            payment.isReadByTrader = true;
            payment.traderNotificationReadAt = new Date();
            orderUpdated = true;
            updatedCount++;
          }
        });
      }

      if (orderUpdated) {
        await order.save();
      }
    }

    res.status(200).json({
      success: true,
      message: `${updatedCount} notifications marked as read`,
      updatedCount
    });
  } catch (error) {
    console.error('Error marking all trader notifications as read:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAdminNotifications = async (req, res) => {
  try {
    const notifications = [];
    let unreadCount = 0;

    // ========== FETCH ALL OFFERS FROM ALL PRODUCTS ==========
    const products = await Product.find()
      .populate('categoryId', 'categoryName')
      .populate('subCategoryId', 'subCategoryName')
      .sort({ updatedAt: -1 });

    products.forEach(product => {
      product.gradePrices.forEach(grade => {
        if (grade.offers && grade.offers.length > 0) {
          grade.offers.forEach(offer => {
            notifications.push({
              _id: offer._id,
              type: 'offer',
              offerId: offer.offerId,
              productId: product._id,
              productName: product.cropBriefDetails,
              productCode: product.productId,
              farmerId: product.farmerId,
              gradeId: grade._id,
              gradeName: grade.grade,
              traderId: offer.traderId,
              traderName: offer.traderName || 'Unknown Trader',
              offeredPrice: offer.offeredPrice,
              quantity: offer.quantity,
              totalAmount: offer.offeredPrice * offer.quantity,
              status: offer.status,
              counterPrice: offer.counterPrice,
              counterQuantity: offer.counterQuantity,
              counterDate: offer.counterDate,
              createdAt: offer.createdAt,
              unitMeasurement: product.unitMeasurement,
              categoryName: product.categoryId?.categoryName,
              subCategoryName: product.subCategoryId?.subCategoryName,
              nearestMarket: product.nearestMarket,
              deliveryDate: product.deliveryDate
            });
          });
        }
      });
    });

    // ========== FETCH ALL ORDERS ==========
    const Order = require('../models/order');
    const orders = await Order.find().sort({ createdAt: -1 });

    orders.forEach(order => {
      // Order creation notification
      notifications.push({
        _id: `order_${order._id}`,
        type: 'order_created',
        orderId: order.orderId,
        orderObjectId: order._id,
        traderId: order.traderId,
        traderName: order.traderName,
        farmerId: order.farmerId,
        farmerName: order.farmerName,
        orderStatus: order.orderStatus,
        transporterStatus: order.transporterStatus,
        traderAcceptedStatus: order.traderAcceptedStatus,
        farmerAcceptedStatus: order.farmerAcceptedStatus,
        totalAmount: order.traderToAdminPayment?.totalAmount || 0,
        paidAmount: order.traderToAdminPayment?.paidAmount || 0,
        remainingAmount: order.traderToAdminPayment?.remainingAmount || 0,
        paymentStatus: order.traderToAdminPayment?.paymentStatus || 'pending',
        createdAt: order.createdAt,
        message: `New order ${order.orderId} created`
      });

      // Trader to Admin payment notifications
      if (order.traderToAdminPayment && order.traderToAdminPayment.paymentHistory) {
        order.traderToAdminPayment.paymentHistory.forEach(payment => {
          notifications.push({
            _id: `trader_payment_${payment._id}`,
            type: 'trader_payment',
            orderId: order.orderId,
            orderObjectId: order._id,
            paymentId: payment._id,
            traderId: order.traderId,
            traderName: order.traderName,
            amount: payment.amount,
            paidDate: payment.paidDate,
            razorpayPaymentId: payment.razorpayPaymentId,
            razorpayOrderId: payment.razorpayOrderId,
            createdAt: payment.paidDate,
            message: `Trader ${order.traderName} paid ₹${payment.amount} for order ${order.orderId}`
          });
        });
      }

      // Admin to Farmer payment notifications
      if (order.adminToFarmerPayment && order.adminToFarmerPayment.paymentHistory) {
        order.adminToFarmerPayment.paymentHistory.forEach(payment => {
          notifications.push({
            _id: `farmer_payment_${payment._id}`,
            type: 'farmer_payment',
            orderId: order.orderId,
            orderObjectId: order._id,
            paymentId: payment._id,
            farmerId: order.farmerId,
            farmerName: order.farmerName,
            amount: payment.amount,
            paidDate: payment.paidDate,
            razorpayPaymentId: payment.razorpayPaymentId,
            razorpayOrderId: payment.razorpayOrderId,
            createdAt: payment.paidDate,
            message: `Payment of ₹${payment.amount} sent to farmer ${order.farmerName} for order ${order.orderId}`
          });
        });
      }

      // Transporter status notifications
      if (order.transporterStatus !== 'pending') {
        notifications.push({
          _id: `transporter_${order._id}`,
          type: 'transporter_update',
          orderId: order.orderId,
          orderObjectId: order._id,
          transporterStatus: order.transporterStatus,
          transporterDetails: order.transporterDetails,
          createdAt: order.transporterDetails?.acceptedAt || order.updatedAt,
          message: `Transporter ${order.transporterStatus} for order ${order.orderId}`
        });
      }
    });

    // Sort all notifications by date, newest first
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      totalCount: notifications.length,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Update purchase quantity
exports.updatePurchaseQuantity = async (req, res) => {
  try {
    const { productId, gradeId, purchaseId, newQuantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const grade = product.gradePrices.id(gradeId);
    if (!grade) {
      return res.status(404).json({ success: false, message: "Grade not found" });
    }

    const purchase = grade.purchaseHistory.id(purchaseId);
    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }

    // Check if already ordered
    if (purchase.orderCreated) {
      return res.status(400).json({ success: false, message: "Cannot modify - order already created" });
    }

    const quantityDiff = newQuantity - purchase.quantity;

    // Validate new quantity
    if (newQuantity <= 0) {
      return res.status(400).json({ success: false, message: "Quantity must be greater than 0" });
    }

    // Check available quantity
    const availableQty = grade.totalQty + purchase.quantity;
    if (newQuantity > availableQty) {
      return res.status(400).json({ success: false, message: "Insufficient quantity available" });
    }
if (grade.quantityType === 'bulk') {
  return res.status(400).json({
    success: false,
    message: "Cannot modify bulk purchase quantity"
  });
}
    // Update purchase
    purchase.quantity = newQuantity;
    purchase.totalAmount = purchase.pricePerUnit * newQuantity;

    // Update grade quantity
    grade.totalQty -= quantityDiff;

    await product.save();

    res.status(200).json({ success: true, message: "Quantity updated successfully", data: purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove purchase from cart
exports.removePurchase = async (req, res) => {
  try {
    const { productId, gradeId, purchaseId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const grade = product.gradePrices.id(gradeId);
    if (!grade) {
      return res.status(404).json({ success: false, message: "Grade not found" });
    }

    const purchase = grade.purchaseHistory.id(purchaseId);
    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }

    // Check if already ordered
    if (purchase.orderCreated) {
      return res.status(400).json({ success: false, message: "Cannot remove - order already created" });
    }

    // Return quantity back to grade
    grade.totalQty += purchase.quantity;

    // Update status if needed
    if (grade.status === 'sold') {
      grade.status = grade.totalQty === 0 ? 'sold' : 'partially_sold';
    }

    // Remove purchase
   grade.purchaseHistory.pull(purchaseId); // ✅ CHANGE THIS LINE

    await product.save();

    res.status(200).json({ success: true, message: "Purchase removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};