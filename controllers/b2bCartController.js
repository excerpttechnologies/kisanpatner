// const B2BCart  = require('../models/B2BCart');
// const B2BOrder = require('../models/B2BOrder');

// // ─────────────────────────────────────────────────────────────────────────────
// // CART
// // ─────────────────────────────────────────────────────────────────────────────

// // POST /api/b2b/cart/add
// // Body: { productId, productName, price, quantity, unit, image, categoryName }
// exports.addToCart = async (req, res) => {
//   try {
//     const {
//       productId, productName, price,
//       quantity, unit, image, categoryName,
//     } = req.body;

//     if (!productId || !quantity || quantity < 1)
//       return res.status(400).json({ success: false, message: 'productId and quantity are required' });

//     // Upsert — update quantity if already in cart
//     const item = await B2BCart.findOneAndUpdate(
//       { b2bUserId: req.userId, productId },
//       {
//         $set: {
//           productName:  productName  || '',
//           price:        price        || 0,
//           quantity,
//           unit:         unit         || 'kg',
//           image:        image        || '',
//           categoryName: categoryName || '',
//         },
//       },
//       { upsert: true, new: true }
//     );

//     res.status(201).json({
//       success: true,
//       message: 'Added to cart',
//       data:    item,
//     });
//   } catch (err) {
//     console.error('B2B addToCart error:', err);
//     if (err.code === 11000) {
//       // Already exists — update quantity
//       const item = await B2BCart.findOneAndUpdate(
//         { b2bUserId: req.userId, productId: req.body.productId },
//         { $set: { quantity: req.body.quantity } },
//         { new: true }
//       );
//       return res.json({ success: true, message: 'Cart updated', data: item });
//     }
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // GET /api/b2b/cart
// exports.getCart = async (req, res) => {
//   try {
//     const items = await B2BCart.find({ b2bUserId: req.userId }).lean();

//     const totalAmount = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
//     const totalItems  = items.reduce((sum, i) => sum + i.quantity, 0);

//     res.json({
//       success: true,
//       data: {
//         items,
//         totalAmount: parseFloat(totalAmount.toFixed(2)),
//         totalItems,
//         itemCount: items.length,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // PUT /api/b2b/cart/:itemId
// // Body: { quantity }
// exports.updateCartItem = async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     if (!quantity || quantity < 1)
//       return res.status(400).json({ success: false, message: 'Valid quantity required' });

//     const item = await B2BCart.findOneAndUpdate(
//       { _id: req.params.itemId, b2bUserId: req.userId },
//       { $set: { quantity } },
//       { new: true }
//     );
//     if (!item)
//       return res.status(404).json({ success: false, message: 'Cart item not found' });

//     res.json({ success: true, message: 'Cart updated', data: item });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // DELETE /api/b2b/cart/:itemId
// exports.removeFromCart = async (req, res) => {
//   try {
//     await B2BCart.findOneAndDelete({ _id: req.params.itemId, b2bUserId: req.userId });
//     res.json({ success: true, message: 'Item removed' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // DELETE /api/b2b/cart/clear
// exports.clearCart = async (req, res) => {
//   try {
//     await B2BCart.deleteMany({ b2bUserId: req.userId });
//     res.json({ success: true, message: 'Cart cleared' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // ORDERS
// // ─────────────────────────────────────────────────────────────────────────────

// // POST /api/b2b/orders/checkout
// // Creates order from current cart then clears cart
// exports.checkout = async (req, res) => {
//   try {
//     const cartItems = await B2BCart.find({ b2bUserId: req.userId }).lean();

//     if (!cartItems || cartItems.length === 0)
//       return res.status(400).json({ success: false, message: 'Cart is empty' });

//     const orderItems = cartItems.map(item => ({
//       productId:    item.productId,
//       productName:  item.productName,
//       price:        item.price,
//       quantity:     item.quantity,
//       unit:         item.unit,
//       image:        item.image,
//       categoryName: item.categoryName,
//       subtotal:     parseFloat((item.price * item.quantity).toFixed(2)),
//     }));

//     const totalAmount = orderItems.reduce((sum, i) => sum + i.subtotal, 0);

//     // Create order
//     const order = await B2BOrder.create({
//       b2bUserId:   req.userId,
//       items:       orderItems,
//       totalAmount: parseFloat(totalAmount.toFixed(2)),
//       status:      'pending',
//     });

//     // Clear cart after order
//     await B2BCart.deleteMany({ b2bUserId: req.userId });

//     res.status(201).json({
//       success: true,
//       message: 'Order placed successfully!',
//       data: {
//         _id:         order._id,
//         totalAmount: order.totalAmount,
//         itemCount:   orderItems.length,
//         status:      order.status,
//         createdAt:   order.createdAt,
//       },
//     });
//   } catch (err) {
//     console.error('B2B checkout error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // GET /api/b2b/orders
// exports.getMyOrders = async (req, res) => {
//   try {
//     const orders = await B2BOrder
//       .find({ b2bUserId: req.userId })
//       .sort({ createdAt: -1 })
//       .lean();

//     res.json({ success: true, data: orders });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // GET /api/b2b/orders/:orderId
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await B2BOrder.findOne({
//       _id:       req.params.orderId,
//       b2bUserId: req.userId,
//     });
//     if (!order)
//       return res.status(404).json({ success: false, message: 'Order not found' });

//     res.json({ success: true, data: order });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // PUT /api/b2b/orders/:orderId/cancel
// exports.cancelOrder = async (req, res) => {
//   try {
//     const order = await B2BOrder.findOne({
//       _id:       req.params.orderId,
//       b2bUserId: req.userId,
//     });
//     if (!order)
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     if (order.status !== 'pending')
//       return res.status(400).json({ success: false, message: `Cannot cancel order with status "${order.status}"` });

//     order.status = 'cancelled';
//     await order.save();

//     res.json({ success: true, message: 'Order cancelled', data: order });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };



// controllers/b2bCartController.js
const B2BCart = require("../models/B2BCart");
const B2BProduct = require("../models/B2BProduct");

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const b2bUserId = req.user.id; // Assuming user is attached from auth middleware

    // Validate product
    const product = await B2BProduct.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient stock available" });
    }

    // Check if already in cart
    let cartItem = await B2BCart.findOne({ b2bUserId, productId });

    if (cartItem) {
      // Update quantity
      const newQuantity = cartItem.quantity + quantity;
      if (product.quantity < newQuantity) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Requested quantity exceeds available stock",
          });
      }
      cartItem.quantity = newQuantity;
      await cartItem.save();
    } else {
      // Add new item
      cartItem = await B2BCart.create({
        b2bUserId,
        productId,
        productName: product.productName,
        price: product.price,
        quantity,
        maxQuantity: product.quantity,
        unit: product.unit,
        image: product.images[0] || "",
        categoryName: product.categoryName,
      });
    }

    // Get updated cart count
    const cartCount = await B2BCart.countDocuments({ b2bUserId });

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cartItem,
      cartCount,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get cart items
exports.getCart = async (req, res) => {
  try {
    const b2bUserId = req.user.id;

    const cartItems = await B2BCart.find({ b2bUserId }).sort({ createdAt: -1 });

    // Calculate totals
    let subtotal = 0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
      totalItems += item.quantity;
    });

    // Check for stock availability
    for (let item of cartItems) {
      const product = await B2BProduct.findById(item.productId);
      if (product) {
        item.maxQuantity = product.quantity;
        if (item.quantity > product.quantity) {
          item.quantity = product.quantity;
          await item.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        items: cartItems,
        subtotal,
        totalItems,
        total: subtotal,
      },
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity, action } = req.body;
    const b2bUserId = req.user.id;

    const cartItem = await B2BCart.findOne({ _id: cartItemId, b2bUserId });
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    const product = await B2BProduct.findById(cartItem.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let newQuantity = cartItem.quantity;

    if (action === "increase") {
      newQuantity = cartItem.quantity + 1;
    } else if (action === "decrease") {
      newQuantity = cartItem.quantity - 1;
    } else if (quantity !== undefined) {
      newQuantity = quantity;
    }

    if (newQuantity < 1) {
      // Remove item if quantity is 0
      await cartItem.deleteOne();
      const cartCount = await B2BCart.countDocuments({ b2bUserId });
      return res.status(200).json({
        success: true,
        message: "Item removed from cart",
        removed: true,
        cartCount,
      });
    }

    if (newQuantity > product.quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity exceeds available stock" });
    }

    cartItem.quantity = newQuantity;
    await cartItem.save();

    // Get updated totals
    const cartItems = await B2BCart.find({ b2bUserId });
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    res.status(200).json({
      success: true,
      message: "Cart updated",
      data: cartItem,
      subtotal,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const b2bUserId = req.user.id;

    const cartItem = await B2BCart.findOneAndDelete({
      _id: cartItemId,
      b2bUserId,
    });
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    const cartCount = await B2BCart.countDocuments({ b2bUserId });

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cartCount,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    await B2BCart.deleteMany({ b2bUserId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};




