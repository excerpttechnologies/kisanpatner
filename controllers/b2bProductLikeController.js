// controllers/b2bProductLikeController.js
const B2BProduct = require("../models/B2BProduct");
const B2BUser = require("../models/B2BUser");

// Like a product
exports.likeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const b2bUserId = req.user.id;

    // Find the product
    const product = await B2BProduct.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if user already liked this product
    const user = await B2BUser.findById(b2bUserId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const alreadyLikedByUser = user.Liked && user.Liked.includes(productId);
    const alreadyLikedInProduct =
      product.Likes && product.Likes.includes(b2bUserId);

    if (alreadyLikedByUser || alreadyLikedInProduct) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this product",
      });
    }

    // Add like to both collections
    await B2BProduct.findByIdAndUpdate(productId, {
      $addToSet: { Likes: b2bUserId },
    });

    await B2BUser.findByIdAndUpdate(b2bUserId, {
      $addToSet: { Liked: productId },
    });

    // Get updated like count
    const updatedProduct = await B2BProduct.findById(productId);
    const likeCount = updatedProduct.Likes ? updatedProduct.Likes.length : 0;

    res.status(200).json({
      success: true,
      message: "Product liked successfully",
      data: {
        liked: true,
        likeCount,
      },
    });
  } catch (error) {
    console.error("Like product error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Unlike a product
exports.unlikeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const b2bUserId = req.user.id;

    // Find the product
    const product = await B2BProduct.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if user has liked this product
    const user = await B2BUser.findById(b2bUserId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const alreadyLikedByUser = user.Liked && user.Liked.includes(productId);
    const alreadyLikedInProduct =
      product.Likes && product.Likes.includes(b2bUserId);

    if (!alreadyLikedByUser && !alreadyLikedInProduct) {
      return res.status(400).json({
        success: false,
        message: "You have not liked this product",
      });
    }

    // Remove like from both collections
    await B2BProduct.findByIdAndUpdate(productId, {
      $pull: { Likes: b2bUserId },
    });

    await B2BUser.findByIdAndUpdate(b2bUserId, {
      $pull: { Liked: productId },
    });

    // Get updated like count
    const updatedProduct = await B2BProduct.findById(productId);
    const likeCount = updatedProduct.Likes ? updatedProduct.Likes.length : 0;

    res.status(200).json({
      success: true,
      message: "Product unliked successfully",
      data: {
        liked: false,
        likeCount,
      },
    });
  } catch (error) {
    console.error("Unlike product error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Toggle like/unlike (combine both actions)
exports.toggleLikeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const b2bUserId = req.user.id;

    // Find the product and user
    const product = await B2BProduct.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const user = await B2BUser.findById(b2bUserId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isLiked = user.Liked && user.Liked.includes(productId);

    if (isLiked) {
      // Unlike
      await B2BProduct.findByIdAndUpdate(productId, {
        $pull: { Likes: b2bUserId },
      });
      await B2BUser.findByIdAndUpdate(b2bUserId, {
        $pull: { Liked: productId },
      });
    } else {
      // Like
      await B2BProduct.findByIdAndUpdate(productId, {
        $addToSet: { Likes: b2bUserId },
      });
      await B2BUser.findByIdAndUpdate(b2bUserId, {
        $addToSet: { Liked: productId },
      });
    }

    // Get updated product with like count
    const updatedProduct = await B2BProduct.findById(productId);
    const likeCount = updatedProduct.Likes ? updatedProduct.Likes.length : 0;

    res.status(200).json({
      success: true,
      message: isLiked
        ? "Product unliked successfully"
        : "Product liked successfully",
      data: {
        liked: !isLiked,
        likeCount,
      },
    });
  } catch (error) {
    console.error("Toggle like product error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all liked products for a user
exports.getLikedProducts = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    const { page = 1, limit = 20 } = req.query;

    // Get user with liked products
    const user = await B2BUser.findById(b2bUserId).select("Liked");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const likedProductIds = user.Liked || [];

    if (likedProductIds.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 0,
          pages: 0,
        },
      });
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch liked products with details
    const likedProducts = await B2BProduct.find({
      _id: { $in: likedProductIds },
      isActive: true,
    })
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("postedBy", "businessName name");

    // Add like status to each product
    const productsWithLikeStatus = likedProducts.map((product) => {
      const productObj = product.toObject();
      productObj.isLikedByUser = true;
      productObj.likeCount = product.Likes ? product.Likes.length : 0;
      return productObj;
    });

    const total = likedProductIds.length;
    const totalLikedProducts = await B2BProduct.countDocuments({
      _id: { $in: likedProductIds },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: productsWithLikeStatus,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalLikedProducts,
        pages: Math.ceil(totalLikedProducts / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get liked products error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Check if user has liked a specific product
exports.checkLikeStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const b2bUserId = req.user.id;

    const user = await B2BUser.findById(b2bUserId).select("Liked");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isLiked = user.Liked && user.Liked.includes(productId);

    // Get product like count
    const product = await B2BProduct.findById(productId).select("Likes");
    const likeCount = product && product.Likes ? product.Likes.length : 0;

    res.status(200).json({
      success: true,
      data: {
        isLiked,
        likeCount,
      },
    });
  } catch (error) {
    console.error("Check like status error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get products liked by user with filters and search
exports.getLikedProductsWithFilters = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    const {
      page = 1,
      limit = 20,
      categoryId,
      minPrice,
      maxPrice,
      search,
      sortBy = "latest", // latest, price_asc, price_desc, popular
    } = req.query;

    // Get user with liked products
    const user = await B2BUser.findById(b2bUserId).select("Liked");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const likedProductIds = user.Liked || [];

    if (likedProductIds.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 0,
          pages: 0,
        },
      });
    }

    // Build query
    let query = {
      _id: { $in: likedProductIds },
      isActive: true,
      status: "active",
    };

    // Apply filters
    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Search in product name
    if (search) {
      query.productName = { $regex: search, $options: "i" };
    }

    // Sorting
    let sortOptions = {};
    switch (sortBy) {
      case "price_asc":
        sortOptions = { price: 1 };
        break;
      case "price_desc":
        sortOptions = { price: -1 };
        break;
      case "popular":
        sortOptions = { viewCount: -1 };
        break;
      case "latest":
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch liked products with details
    const likedProducts = await B2BProduct.find(query)
      .select("-__v")
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("postedBy", "businessName name");

    // Add like status and like count
    const productsWithDetails = likedProducts.map((product) => {
      const productObj = product.toObject();
      productObj.isLikedByUser = true;
      productObj.likeCount = product.Likes ? product.Likes.length : 0;
      return productObj;
    });

    const total = await B2BProduct.countDocuments(query);

    res.status(200).json({
      success: true,
      data: productsWithDetails,
      filters: {
        categoryId: categoryId || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        search: search || null,
        sortBy,
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get liked products with filters error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get like statistics for a product
exports.getProductLikeStats = async (req, res) => {
  try {
    const { productId } = req.params;
    const b2bUserId = req.user.id;

    const product = await B2BProduct.findById(productId)
      .select("Likes productName")
      .populate("Likes", "businessName name");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const user = await B2BUser.findById(b2bUserId).select("Liked");
    const isLikedByCurrentUser =
      user && user.Liked && user.Liked.includes(productId);

    // Get recent likers (last 5)
    const recentLikers = product.Likes
      ? product.Likes.slice(-5).map((user) => ({
          id: user._id,
          name: user.businessName || user.name,
          type: "b2b_buyer",
        }))
      : [];

    res.status(200).json({
      success: true,
      data: {
        productId: product._id,
        productName: product.productName,
        totalLikes: product.Likes ? product.Likes.length : 0,
        isLikedByCurrentUser,
        recentLikers,
      },
    });
  } catch (error) {
    console.error("Get product like stats error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Bulk like/unlike products
exports.bulkLikeProducts = async (req, res) => {
  try {
    const { productIds, action } = req.body; // action: 'like' or 'unlike'
    const b2bUserId = req.user.id;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Product IDs array is required" });
    }

    if (!["like", "unlike"].includes(action)) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Action must be either "like" or "unlike"',
        });
    }

    let updatedCount = 0;

    if (action === "like") {
      // Like all products
      await B2BProduct.updateMany(
        { _id: { $in: productIds } },
        { $addToSet: { Likes: b2bUserId } },
      );
      await B2BUser.findByIdAndUpdate(b2bUserId, {
        $addToSet: { Liked: { $each: productIds } },
      });
      updatedCount = productIds.length;
    } else {
      // Unlike all products
      await B2BProduct.updateMany(
        { _id: { $in: productIds } },
        { $pull: { Likes: b2bUserId } },
      );
      await B2BUser.findByIdAndUpdate(b2bUserId, {
        $pull: { Liked: { $in: productIds } },
      });
      updatedCount = productIds.length;
    }

    res.status(200).json({
      success: true,
      message: `Successfully ${action}d ${updatedCount} products`,
      data: {
        action,
        updatedCount,
      },
    });
  } catch (error) {
    console.error("Bulk like products error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
