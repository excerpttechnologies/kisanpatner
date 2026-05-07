// controllers/chatController.js

const Chat = require("../models/B2BChat");
const B2BOrder = require("../models/B2BOrder");
const B2BPaymentHistory = require("../models/B2BPaymentHistory");
const B2BProduct = require("../models/B2BProduct");
const Fuse = require("fuse.js");

// ==================== INTENTS CONFIGURATION ====================

const intentsConfig = [
  {
    id: "TRACK_ORDER",
    name: "Track Order",
    patterns: [
      "where is my order",
      "track my order",
      "order status",
      "order kaha hai",
      "mera order kab aayega",
      "track order",
      "order tracking",
      "check my order",
      "order delivery status",
      "when will I get my order",
      "order update",
      "status of my order",
      "my order status",
      "delivery status",
      "where's my package",
    ],
    keywords: [
      "order",
      "track",
      "status",
      "delivery",
      "update",
      "where",
      "when",
    ],
    priority: 9,
    responseTemplate: async (context, userId) => {
      if (context.entities.orderId) {
        // Search by orderId field (B2B2412XXXX format)
        let order = await B2BOrder.findOne({
          b2bUserId: userId,
          orderId: { $regex: context.entities.orderId, $options: "i" },
        });

        // If not found by orderId, try by _id
        if (!order && context.entities.orderId.match(/^[0-9a-fA-F]{24}$/)) {
          order = await B2BOrder.findById(context.entities.orderId);
        }

        if (order) {
          const statusEmoji = {
            pending: "⏳",
            confirmed: "✅",
            processing: "🔄",
            shipped: "🚚",
            out_for_delivery: "🚛",
            delivered: "🎉",
            cancelled: "❌",
            refunded: "💰",
          };
          const statusText = {
            pending: "Pending",
            confirmed: "Confirmed",
            processing: "Processing",
            shipped: "Shipped",
            out_for_delivery: "Out for Delivery",
            delivered: "Delivered",
            cancelled: "Cancelled",
            refunded: "Refunded",
          };

          let trackingInfo = "";
          if (order.trackingDetails && order.trackingDetails.trackingNumber) {
            trackingInfo = `\n\n📦 **Tracking Details**\n• Courier: ${order.trackingDetails.courierName || "N/A"}\n• Tracking #: ${order.trackingDetails.trackingNumber}\n• Est. Delivery: ${order.trackingDetails.estimatedDelivery ? new Date(order.trackingDetails.estimatedDelivery).toLocaleDateString() : "N/A"}`;
          }

          return `📦 **Order Status**\n\n${statusEmoji[order.status] || "📦"} **Order ID**: ${order.orderId}\n📊 **Status**: ${statusText[order.status] || order.status}\n💰 **Total Amount**: ₹${order.totalAmount.toLocaleString()}\n📅 **Order Date**: ${new Date(order.createdAt).toLocaleDateString("en-IN")}\n📝 **Items**: ${order.items.length} product(s)\n${trackingInfo}\n\nNeed anything else? I'm here to help! 💙`;
        } else {
          return `❌ I couldn't find an order with ID "${context.entities.orderId}".\n\nPlease check the Order ID and try again. Your Order ID looks like: B2B2412XXXX\n\nNeed help finding your Order ID? Check your email or order confirmation message.`;
        }
      } else if (context.lastOrder) {
        const order = context.lastOrder;
        return `📋 **Your Most Recent Order**\n\n🆔 **Order ID**: ${order.orderId}\n📊 **Status**: ${order.status}\n💰 **Amount**: ₹${order.totalAmount.toLocaleString()}\n📅 **Date**: ${order.date}\n\nTo track this specific order, please reply with "Track ${order.orderId}"\n\nOr share a different Order ID to check its status. 🔍`;
      } else {
        return `🔍 I can help you track your order!\n\nPlease share your Order ID (e.g., B2B2412XXXX) and I'll fetch the complete status for you.\n\nYou can find your Order ID in:\n• Order confirmation email\n• SMS notification\n• My Orders section in the app\n\nWhat's your Order ID? 📝`;
      }
    },
  },
  {
    id: "CANCEL_ORDER",
    name: "Cancel Order",
    patterns: [
      "cancel my order",
      "order cancel karna hai",
      "how to cancel order",
      "cancel product",
      "order cancel",
      "I want to cancel",
      "stop my order",
      "remove order",
      "cancel it",
      "order cancel करना है",
    ],
    keywords: ["cancel", "remove", "stop", "cancel karna", "radd"],
    priority: 8,
    responseTemplate: async (context, userId) => {
      const cancelableStatuses = ["pending", "confirmed"];

      if (context.entities.orderId) {
        let order = await B2BOrder.findOne({
          b2bUserId: userId,
          orderId: { $regex: context.entities.orderId, $options: "i" },
        });

        if (!order && context.entities.orderId.match(/^[0-9a-fA-F]{24}$/)) {
          order = await B2BOrder.findById(context.entities.orderId);
        }

        if (order) {
          if (cancelableStatuses.includes(order.status)) {
            return `🔄 **Order Cancellation Request**\n\n✅ **Order ID**: ${order.orderId} is eligible for cancellation\n💰 **Refund Amount**: ₹${order.totalAmount.toLocaleString()}\n📊 **Current Status**: ${order.status}\n\n⚠️ **Please Note**:\n• Refund will be processed within 5-7 business days\n• Amount will be credited to original payment method\n\n**To confirm cancellation, please reply**: "CONFIRM CANCEL ${order.orderId}"\n\nWould you like to proceed?`;
          } else {
            return `❌ **Cannot Cancel Order**\n\nOrder #${order.orderId} is already **${order.status}** and cannot be cancelled.\n\n💡 **What you can do**:\n• Contact support for assistance\n• Initiate a return after delivery\n• Check return policy for this order\n\nNeed help? Reply with "Contact Support" 📞`;
          }
        } else {
          return `❌ Order #${context.entities.orderId} not found.\n\nPlease verify your Order ID and try again.\n\nNeed help? Reply with "My Orders" to see all your orders.`;
        }
      } else if (
        context.lastOrder &&
        cancelableStatuses.includes(context.lastOrder.status)
      ) {
        return `🔄 **Cancel Recent Order?**\n\nYour last order #${context.lastOrder.orderId} (₹${context.lastOrder.amount}) is eligible for cancellation.\n\n⚠️ Cancellation is permanent and cannot be undone.\n\n**To cancel this order, reply**: "CONFIRM CANCEL ${context.lastOrder.orderId}"\n\nOr share a different Order ID to cancel.`;
      } else {
        return `🔄 I can help you cancel an order!\n\n📋 **Eligibility**:\n• Orders with status "pending" or "confirmed"\n• Before order is shipped\n\nPlease share your Order ID (e.g., B2B2412XXXX) to check cancellation eligibility.\n\nNeed to check all your orders? Reply with "My Orders" 📋`;
      }
    },
  },
  {
    id: "REFUND_POLICY",
    name: "Refund Policy",
    patterns: [
      "refund policy",
      "money back",
      "return policy",
      "refund kab milega",
      "how to get refund",
      "refund process",
      "return money",
      "refund status",
    ],
    keywords: ["refund", "return", "money back"],
    priority: 7,
    responseTemplate: async (context, userId) => {
      let refundableOrder = null;
      if (context.entities.orderId) {
        refundableOrder = await B2BOrder.findOne({
          b2bUserId: userId,
          orderId: { $regex: context.entities.orderId, $options: "i" },
          status: { $in: ["cancelled", "refunded", "delivered"] },
        });
      }

      if (refundableOrder) {
        const payment = await B2BPaymentHistory.findOne({
          orderId: refundableOrder._id,
          b2bUserId: userId,
        });

        return `💰 **Refund Status for Order ${refundableOrder.orderId}**\n\n📊 **Order Status**: ${refundableOrder.status}\n💰 **Refund Amount**: ₹${refundableOrder.totalAmount.toLocaleString()}\n${payment?.refundStatus ? `🔄 **Refund Status**: ${payment.refundStatus}\n💳 **Refund Method**: ${payment.paymentMethod || "Original source"}` : ""}\n\n⏱️ **Timeline**: 5-7 business days after cancellation\n\nNeed expedited refund? Contact support with your Order ID.`;
      }

      return `💰 **KisanPatner B2B Refund Policy**\n\n📋 **Eligibility**:\n✅ Cancelled orders (pending/confirmed status)\n✅ Damaged/defective products (within 7 days)\n✅ Wrong items delivered\n✅ Non-delivery of order\n\n⏱️ **Processing Time**:\n• 5-7 business days after approval\n• Amount credited to original payment method\n• UPI/Cards: 3-5 days\n• Net Banking: 5-7 days\n\n📝 **Process**:\n1. Request refund with Order ID\n2. Our team verifies\n3. Refund initiated\n4. Amount credited\n\n**To request a refund, share your Order ID** 🎯`;
    },
  },
  {
    id: "PRODUCT_RECOMMENDATION",
    name: "Product Recommendations",
    patterns: [
      "best product",
      "recommend product",
      "what to buy",
      "kya acha hai",
      "product suggestion",
      "suggest me",
      "top products",
      "popular items",
      "best selling",
      "recommend me",
      "what's good",
    ],
    keywords: ["recommend", "suggest", "best", "top", "popular", "good"],
    priority: 6,
    responseTemplate: async (context, userId) => {
      let query = { status: "active", isActive: true };

      if (context.entities.category) {
        query.categoryName = {
          $regex: context.entities.category,
          $options: "i",
        };
      }

      const products = await B2BProduct.find(query)
        .sort({ viewCount: -1, createdAt: -1 })
        .limit(6);

      if (products && products.length > 0) {
        let productList = "";
        products.forEach((p, i) => {
          productList += `${i + 1}. **${p.productName}** - ₹${p.price.toLocaleString()}/${p.unit}\n   📦 Stock: ${p.quantity} ${p.unit} available\n`;
        });

        let categoryText = context.entities.category
          ? `${context.entities.category.charAt(0).toUpperCase() + context.entities.category.slice(1)}`
          : "Popular";

        return `🌟 **${categoryText} Products**\n\n${productList}\n\n💡 **Pro Tip**:\n• 🚛 Free shipping on orders above ₹5000\n• 📦 Bulk orders get extra discount\n• ✅ Verified sellers only\n\n**Which product interests you?** Share the product name for details! 🛍️`;
      } else {
        return `🌱 **Discover Quality Products**\n\nExplore our top categories:\n\n🥦 **Vegetables** - Fresh farm produce\n🍎 **Fruits** - Premium quality\n🌾 **Grains** - Premium grains & pulses\n🌶️ **Spices** - Pure & aromatic\n🥛 **Dairy** - Fresh daily\n🌸 **Flowers** - Farm fresh\n\n**Which category interests you?** I'll find the best products for you! 🎯`;
      }
    },
  },
  {
    id: "PRICE_INQUIRY",
    name: "Price Inquiry",
    patterns: [
      "what is the price",
      "how much",
      "price of",
      "rate of",
      "cost of",
      "kitne ka hai",
      "price list",
      "current price",
      "market price",
    ],
    keywords: ["price", "rate", "cost", "how much", "kitne", "dam"],
    priority: 7,
    responseTemplate: async (context, userId) => {
      if (context.entities.productName) {
        const product = await B2BProduct.findOne({
          productName: { $regex: context.entities.productName, $options: "i" },
          status: "active",
          isActive: true,
        }).sort({ createdAt: -1 });

        if (product) {
          return `💰 **Price for ${product.productName}**\n\n💵 **Current Price**: ₹${product.price.toLocaleString()}/${product.unit}\n📦 **Available Quantity**: ${product.quantity.toLocaleString()} ${product.unit}\n📍 **Location**: ${product.taluk || "Multiple locations"}\n✅ **Verification**: ${product.verificationStatus === "verified" ? "✓ Verified Seller" : "Standard"}\n\n**Bulk Order Discount**:\n• 100+ ${product.unit}: 5% off\n• 500+ ${product.unit}: 10% off\n\n**Ready to order?** Share quantity for instant quote! 📊`;
        } else {
          return `🔍 No product found matching "${context.entities.productName}".\n\nTry searching with these popular items:\n• Tomato 🍅\n• Potato 🥔\n• Onion 🧅\n• Rice 🌾\n• Wheat\n\nOr browse our categories for more options! 🛍️`;
        }
      }

      return `💰 **Price Check**\n\nI can help you find current market prices!\n\n**Just tell me what you're looking for**:\n• "Price of Tomato"\n• "Wheat rate"\n• "Onion cost per kg"\n• "Potato price"\n\n**Example**: "What's the price of organic tomatoes?"\n\nWhat product's price would you like to know? 📊`;
    },
  },
  {
    id: "MY_ORDERS",
    name: "My Orders",
    patterns: [
      "my orders",
      "all orders",
      "order history",
      "previous orders",
      "list my orders",
      "show orders",
      "order list",
    ],
    keywords: ["my orders", "order history", "all orders", "previous orders"],
    priority: 6,
    responseTemplate: async (context, userId) => {
      const orders = await B2BOrder.find({ b2bUserId: userId })
        .sort({ createdAt: -1 })
        .limit(5);

      if (orders && orders.length > 0) {
        let orderList = "";
        const statusEmoji = {
          pending: "⏳",
          confirmed: "✅",
          shipped: "🚚",
          delivered: "🎉",
          cancelled: "❌",
        };

        orders.forEach((order, i) => {
          orderList += `${i + 1}. **${order.orderId}** - ${statusEmoji[order.status] || "📦"} ${order.status.toUpperCase()}\n   💰 ₹${order.totalAmount.toLocaleString()} | 📅 ${new Date(order.createdAt).toLocaleDateString()}\n`;
        });

        return `📋 **Your Recent Orders**\n\n${orderList}\n\n**Need help with an order?**\n• Track order: "Track B2B2412XXXX"\n• Cancel order: "Cancel B2B2412XXXX"\n• Get refund: "Refund B2B2412XXXX"\n\nWhich order would you like assistance with? 🎯`;
      } else {
        return `📭 You haven't placed any orders yet.\n\n**Ready to start?** 🛍️\n\n I can help you:\n• Find best products\n• Check current prices\n• Place bulk orders\n\n**Say**: "Show me products" to begin your B2B journey! 🚀`;
      }
    },
  },
  {
    id: "LAST_ORDER",
    name: "Last Order",
    patterns: [
      "last order",
      "recent order",
      "previous order",
      "my last order",
      "latest order",
      "recent purchase",
      "last purchase",
    ],
    keywords: ["last", "recent", "previous", "latest", "past order"],
    priority: 7,
    responseTemplate: async (context, userId) => {
      const lastOrder = await B2BOrder.findOne({ b2bUserId: userId }).sort({
        createdAt: -1,
      });

      if (lastOrder) {
        const statusEmoji = {
          pending: "⏳ Pending",
          confirmed: "✅ Confirmed",
          processing: "🔄 Processing",
          shipped: "🚚 Shipped",
          out_for_delivery: "🚛 Out for Delivery",
          delivered: "🎉 Delivered",
          cancelled: "❌ Cancelled",
        };

        let itemsList = "";
        lastOrder.items.slice(0, 3).forEach((item) => {
          itemsList += `• ${item.productName} x${item.quantity} ${item.unit}\n`;
        });
        if (lastOrder.items.length > 3)
          itemsList += `• +${lastOrder.items.length - 3} more items\n`;

        return `📋 **Your Most Recent Order**\n\n🆔 **Order ID**: ${lastOrder.orderId}\n📊 **Status**: ${statusEmoji[lastOrder.status] || lastOrder.status}\n💰 **Total**: ₹${lastOrder.totalAmount.toLocaleString()}\n📅 **Date**: ${new Date(lastOrder.createdAt).toLocaleDateString("en-IN")}\n📦 **Items**:\n${itemsList}\n${lastOrder.trackingDetails?.trackingNumber ? `📮 **Tracking**: ${lastOrder.trackingDetails.trackingNumber}` : ""}\n\n**Quick Actions**:\n• Track this order: "Track ${lastOrder.orderId}"\n• Cancel order: "Cancel ${lastOrder.orderId}"\n• Need help? Just ask! 💙`;
      } else {
        return `📭 **No Orders Found**\n\nYou haven't placed any orders yet.\n\n**Let me help you get started!** 🛍️\n\n• Browse products: "Show me vegetables"\n• Check prices: "Price of tomato"\n• Place order: "I want to order"\n\nWhat would you like to do today? 🎯`;
      }
    },
  },
  {
    id: "LAST_PAYMENT",
    name: "Last Payment",
    patterns: [
      "last payment",
      "recent payment",
      "payment history",
      "last transaction",
      "payment status",
      "paid amount",
      "last bill",
    ],
    keywords: ["payment", "transaction", "paid", "bill", "receipt"],
    priority: 7,
    responseTemplate: async (context, userId) => {
      const lastPayment = await B2BPaymentHistory.findOne({ b2bUserId: userId })
        .sort({ createdAt: -1 })
        .populate("orderId");

      if (lastPayment) {
        const statusIcon = {
          success: "✅ Success",
          failed: "❌ Failed",
          created: "⏳ Created",
          attempted: "🔄 Attempted",
        };

        let refundInfo = "";
        if (lastPayment.refundStatus && lastPayment.refundStatus !== "none") {
          refundInfo = `\n🔄 **Refund**: ${lastPayment.refundStatus}\n💰 **Refund Amount**: ₹${lastPayment.refundAmount || 0}`;
        }

        return `💳 **Last Payment Details**\n\n💰 **Amount**: ₹${lastPayment.amount.toLocaleString()}\n📅 **Date**: ${new Date(lastPayment.createdAt).toLocaleDateString("en-IN")}\n✅ **Status**: ${statusIcon[lastPayment.status] || lastPayment.status}\n🆔 **Transaction ID**: ${lastPayment.razorpayPaymentId || "Processing..."}\n📦 **Order ID**: ${lastPayment.orderId?.orderId || "N/A"}\n💳 **Method**: ${lastPayment.paymentMethod || "Razorpay"}${refundInfo}\n\nNeed help with this payment? Share your Order ID for assistance! 💙`;
      } else {
        return `💳 **No Payment History**\n\nYou haven't made any payments yet.\n\n**Ready to make your first purchase?** 🛍️\n\n• Browse products: "Show me products"\n• Get best deals: "Popular products"\n• Place order: "I want to buy"\n\nLet's get you started! 🚀`;
      }
    },
  },
  {
    id: "ORDER_DELAY",
    name: "Order Delay",
    patterns: [
      "order delay",
      "late delivery",
      "shipping delay",
      "why order taking time",
      "delayed order",
      "order is late",
      "taking too long",
      "not received yet",
    ],
    keywords: [
      "delay",
      "late",
      "taking time",
      "not received",
      "shipping delay",
    ],
    priority: 7,
    responseTemplate: async (context, userId) => {
      if (context.entities.orderId) {
        const order = await B2BOrder.findOne({
          b2bUserId: userId,
          orderId: { $regex: context.entities.orderId, $options: "i" },
        });

        if (order && order.status !== "delivered") {
          let daysSinceOrder = Math.floor(
            (new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24),
          );

          return `⏰ **Order Delay Analysis for ${order.orderId}**\n\n📊 **Current Status**: ${order.status}\n📅 **Order Date**: ${new Date(order.createdAt).toLocaleDateString()}\n⏱️ **Days Since Order**: ${daysSinceOrder} days\n\n🔍 **Possible Reasons**:\n• High demand during peak season\n• Weather conditions affecting logistics\n• Verification process for bulk order\n• Local holidays or festivals\n\n💡 **What you can do**:\n• Check email for updates\n• Contact support for priority tracking\n• Request delivery estimate\n\nNeed immediate update? Share "Contact Support" to connect with our team! 📞`;
        }
      }

      return `⏰ **Understanding Order Delays**\n\nCommon reasons for delay:\n• 🌧️ **Weather**: Heavy rains affecting transport\n• 📈 **Demand**: High volume during harvest season\n• 🔍 **Verification**: Quality check for bulk orders\n• 🎉 **Holidays**: Local festivals/delivery disruptions\n• 🚛 **Logistics**: Courier partner delays\n\n**Need specific status?** Share your Order ID for real-time tracking.\n\n**Quick Actions**:\n• Share Order ID: "Track B2B2412XXXX"\n• Contact Support: "Call support"\n• Check all orders: "My orders"\n\nHow can I assist further? 🤝`;
    },
  },
  {
    id: "BULK_ORDER",
    name: "Bulk Order",
    patterns: [
      "bulk order",
      "wholesale",
      "large quantity",
      "bulk purchase",
      "business order",
      "corporate order",
      "bulk discount",
    ],
    keywords: ["bulk", "wholesale", "large", "corporate", "business"],
    priority: 6,
    responseTemplate: async (context, userId) => {
      if (context.entities.productName || context.entities.category) {
        const searchTerm =
          context.entities.productName || context.entities.category;
        const products = await B2BProduct.find({
          $or: [
            { productName: { $regex: searchTerm, $options: "i" } },
            { categoryName: { $regex: searchTerm, $options: "i" } },
          ],
          status: "active",
          isActive: true,
        }).limit(3);

        if (products.length > 0) {
          let productList = "";
          products.forEach((p) => {
            productList += `• **${p.productName}** - ₹${p.price}/${p.unit} (Stock: ${p.quantity} ${p.unit})\n`;
          });

          return `📦 **Bulk Order Inquiry - ${searchTerm}**\n\n**Available Products**:\n${productList}\n\n🎉 **Bulk Discount Benefits**:\n• 5-15% discount on bulk orders\n• Free shipping above ₹5000\n• Priority delivery\n• Dedicated account manager\n\n**To proceed, please share**:\n1. Product name(s)\n2. Quantity required\n3. Delivery location\n\nOur wholesale team will contact you within 2 hours! 🚀`;
        }
      }

      return `📦 **Bulk Orders & Wholesale**\n\n🎉 **Exclusive Benefits**:\n• 💰 **Discounts**: 5-15% on bulk orders\n• 🚛 **Free Shipping**: Above ₹5000\n• ⚡ **Priority Processing**: 24-hour dispatch\n• 📞 **Dedicated Support**: Account manager assigned\n• 📊 **Custom Pricing**: Based on volume\n\n**Popular Bulk Categories**:\n🥦 Vegetables | 🍎 Fruits | 🌾 Grains | 🌶️ Spices | 🥛 Dairy\n\n**Get Started**:\n1. Share product requirements\n2. Specify quantity needed\n3. Provide delivery location\n\n**Example**: "I want to buy 500 kg of tomatoes for my restaurant in Mumbai"\n\nReady to place a bulk order? Share your requirements! 📝`;
    },
  },
  {
    id: "HELPLINE",
    name: "Customer Support",
    patterns: [
      "helpline",
      "support number",
      "customer care",
      "contact support",
      "help number",
      "call support",
      "talk to agent",
      "customer service",
    ],
    keywords: ["help", "support", "helpline", "customer care"],
    priority: 10,
    responseTemplate: async () => {
      return `📞 **KisanPatner B2B Customer Support**\n\n📱 **Phone Support**:\n• Toll Free: 1800-000-0000\n• Direct: +91 800-000-0000\n⏰ Hours: Mon-Sat, 9 AM - 6 PM\n\n💬 **Digital Support**:\n• WhatsApp: wa.me/918000000000\n• Email: support@kisanpatner.com\n• Website: www.kisanpatner.com/support\n\n📱 **In-App Support**:\n• Live Chat (9 AM - 9 PM)\n• Ticket System (24/7)\n• FAQ Section\n\n⚡ **Priority Support for**:\n• Urgent delivery issues\n• Bulk order assistance\n• Payment failures\n• Quality complaints\n\n**Response Time**:\n• 📞 Phone: Immediate\n• 💬 WhatsApp: < 1 hour\n• 📧 Email: < 4 hours\n\nHow would you like to connect? I can help create a support ticket instantly! 🎫`;
    },
  },
  {
    id: "COMPLAINT",
    name: "Complaint",
    patterns: [
      "register complaint",
      "file complaint",
      "raise issue",
      "escalate",
      "lodged complaint",
      "grievance",
      "complaint number",
    ],
    keywords: ["complaint", "grievance", "escalate", "issue", "problem"],
    priority: 8,
    responseTemplate: async (context, userId) => {
      if (context.entities.orderId) {
        return `📝 **Registering Complaint for Order ${context.entities.orderId}**\n\nTo help you better, please share:\n\n1️⃣ **Issue Category**:\n• Delayed delivery\n• Damaged product\n• Wrong item received\n• Quality issue\n• Payment problem\n\n2️⃣ **Description**: Brief explanation of the issue\n\n3️⃣ **Supporting Photos**: Upload photos of the issue (if applicable)\n\n4️⃣ **Preferred Resolution**: Refund / Replacement / Partial refund\n\n📋 **What happens next**:\n✅ Complaint reference # will be generated\n⏱️ Resolution within 24-48 hours\n📞 Our team will contact you\n\n**To proceed, describe your issue in detail** 📝\n\nExample: "I received damaged tomatoes in order B2B2412XXXX...`;
      }

      return `📝 **Register a Complaint**\n\nI'm here to help resolve your issue!\n\n**Please provide**:\n1. 📦 Order ID (required)\n2. 📝 Issue description\n3. 📸 Supporting photos (if any)\n\n**Common Issues**:\n• Quality not as expected\n• Delayed delivery\n• Wrong product delivered\n• Quantity mismatch\n• Payment issues\n\n**Resolution Timeline**:\n• Quality issues: 24 hours\n• Delivery issues: 48 hours\n• Payment issues: 72 hours\n\n**Share your Order ID to start** 🎯\n\nExample: "I want to complain about order B2B2412XXXX - received damaged tomatoes"`;
    },
  },
  {
    id: "SHIPPING_INFO",
    name: "Shipping Info",
    patterns: [
      "shipping time",
      "delivery time",
      "when will I get",
      "shipping charge",
      "delivery charge",
      "free shipping",
      "shipping policy",
    ],
    keywords: ["shipping", "delivery", "shipping charge", "delivery time"],
    priority: 6,
    responseTemplate: async () => {
      return `🚚 **Shipping Information**\n\n⏱️ **Delivery Timeline**:\n• ⚡ **Express**: 24 hours (Metro cities)\n• 📦 **Standard**: 2-3 business days\n• 🚛 **Bulk Orders**: 4-5 business days\n\n💰 **Shipping Charges**:\n• Free shipping on orders > ₹5000\n• ₹50 for orders ₹1000-5000\n• ₹100 for orders < ₹1000\n• Free for bulk orders > ₹10000\n\n📍 **Coverage Area**:\n• Tier 1 cities: Same-day option available\n• Tier 2 cities: 2-3 days\n• Rural areas: 3-5 days\n\n📋 **Order Cut-off Times**:\n• Same-day delivery: Order before 12 PM\n• Next-day delivery: Order before 6 PM\n• Standard delivery: 24/7\n\n**Track your order**: Share Order ID for real-time status! 🎯`;
    },
  },
  {
    id: "PAYMENT_METHODS",
    name: "Payment Methods",
    patterns: [
      "payment method",
      "how to pay",
      "payment options",
      "cod",
      "card payment",
      "upi payment",
      "payment mode",
    ],
    keywords: ["payment", "pay", "cod", "upi", "card", "neft"],
    priority: 6,
    responseTemplate: async () => {
      return `💳 **Payment Methods**\n\n**Accepted Payment Options**:\n\n💳 **Cards**:\n• Credit Card (Visa, MasterCard, Amex, RuPay)\n• Debit Card (All banks)\n\n📱 **Digital Wallets & UPI**:\n• Google Pay | PhonePe | Paytm\n• Amazon Pay | Mobikwik\n• BHIM UPI | Any UPI app\n\n🏦 **Net Banking**:\n• All major banks (SBI, HDFC, ICICI, Axis, etc.)\n\n💰 **Cash on Delivery (COD)**:\n• Available for orders < ₹10,000\n• ₹50 convenience fee\n\n🏢 **Corporate Payments**:\n• NEFT/RTGS\n• Cheque (subject to clearance)\n• Purchase orders (approved businesses)\n\n🔒 **100% Secure Payments**\n• PCI-DSS compliant\n• SSL encrypted\n• No data storage\n\n**Need help with payment?** Share your issue! 💙`;
    },
  },
  {
    id: "RETURN_POLICY",
    name: "Return Policy",
    patterns: [
      "return policy",
      "return item",
      "exchange policy",
      "replacement",
      "damage product",
      "quality issue",
    ],
    keywords: ["return", "exchange", "replacement", "damage", "quality issue"],
    priority: 7,
    responseTemplate: async () => {
      return `🔄 **Return & Exchange Policy**\n\n✅ **Eligible for Return/Exchange**:\n• Damaged products (within 24 hours of delivery)\n• Wrong items delivered\n• Quality issues (photos/video proof required)\n• Expired products\n\n❌ **Not Eligible**:\n• Change of mind (perishable items)\n• Products used/partially consumed\n• Without original packaging\n\n⏱️ **Return Window**:\n• Fresh produce: 24 hours\n• Packaged items: 7 days\n• Damaged goods: 12 hours\n\n💰 **Refund Process**:\n1. Raise return request with Order ID\n2. Upload proof (photos/videos)\n3. Our team verifies (24 hours)\n4. Pickup arranged\n5. Refund within 5-7 days\n\n**To initiate a return, share your Order ID** 📋`;
    },
  },
  {
    id: "ACCOUNT_ISSUES",
    name: "Account Issues",
    patterns: [
      "login issue",
      "can't login",
      "forgot password",
      "account problem",
      "update profile",
      "change password",
    ],
    keywords: ["login", "password", "account", "profile", "update"],
    priority: 8,
    responseTemplate: async () => {
      return `🔐 **Account Support**\n\n**Common Issues & Solutions**:\n\n🔑 **Login Issues**:\n• Forgot password: Click "Forgot Password" on login page\n• OTP not received: Check spam folder, request again after 2 minutes\n• Account locked: Contact support after 3 failed attempts\n\n📝 **Profile Update**:\n• Go to Profile → Edit Profile\n• Update business details\n• Change phone number (requires verification)\n\n🛡️ **Security**:\n• Enable 2FA for business account\n• Never share OTP with anyone\n• Change password every 90 days\n\n📧 **Email Verification**:\n• Check spam/junk folder\n• Request new verification link\n• Contact support if not received within 10 minutes\n\n**Still having issues?** Share your registered email/phone number for assistance! 📞`;
    },
  },
  {
    id: "GREETING",
    name: "Greeting",
    patterns: [
      "hello",
      "hi",
      "hey",
      "namaste",
      "good morning",
      "good evening",
      "good afternoon",
      "hola",
      "greetings",
      "hey there",
    ],
    keywords: ["hello", "hi", "hey", "namaste"],
    priority: 3,
    responseTemplate: async (context, userId, businessName) => {
      const hour = new Date().getHours();
      let timeGreeting =
        "Good " + (hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening");

      const greetings = [
        `👋 ${timeGreeting}${businessName ? " " + businessName : ""}! Welcome to KisanPatner B2B Support. 🌾\n\nI'm your AI assistant here to help with:\n📦 Orders | 💳 Payments | 🛍️ Products | 📞 Support\n\nHow can I help your business today?`,
        `🌟 Hello${businessName ? " " + businessName : ""}! Great to see you at KisanPatner B2B.\n\nI can assist you with:\n• Track orders 📦\n• Cancel orders 🔄\n• Check prices 💰\n• Get product recommendations ⭐\n• Customer support 📞\n\nWhat do you need?`,
        `🤝 Namaste${businessName ? " " + businessName : ""}! ${timeGreeting}!\n\nYour B2B farming assistant is here! 🚜\n\nQuick help:\n• "Track my order"\n• "Cancel order"\n• "Best products"\n• "Call support"\n\nHow may I assist you today?`,
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    },
  },
  {
    id: "THANKS",
    name: "Thanks",
    patterns: [
      "thank you",
      "thanks",
      "thankyou",
      "thnks",
      "dhanyawad",
      "thank u",
      "thx",
      "appreciate",
      "grateful",
    ],
    keywords: ["thank", "thanks", "appreciate"],
    priority: 3,
    responseTemplate: async () => {
      const responses = [
        "😊 You're welcome! Is there anything else I can help with?",
        "🙏 My pleasure serving you! Need assistance with anything else?",
        "👍 Glad I could help! Feel free to ask for anything else!",
        "🌟 Happy to help! Your satisfaction is our priority!",
        "🤝 Always here for your business needs! What's next?",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    },
  },
  {
    id: "FAREWELL",
    name: "Farewell",
    patterns: [
      "bye",
      "goodbye",
      "see you",
      "take care",
      "have a good day",
      "talk to you later",
      "bye bye",
      "see ya",
      "tata",
    ],
    keywords: ["bye", "goodbye", "see you", "tata"],
    priority: 3,
    responseTemplate: async () => {
      const farewells = [
        "👋 Goodbye! Have a great day! Come back anytime for your B2B needs.",
        "🙏 Thank you for connecting! Wishing you successful business! 🌾",
        "🌟 Take care! We're always here when you need us.",
        "📦 See you soon! Happy trading with KisanPatner! 🚀",
        "🤝 Until next time! Your success is our success!",
      ];
      return farewells[Math.floor(Math.random() * farewells.length)];
    },
  },
];

// ==================== FUZZY SEARCH SETUP ====================

const patternCorpus = [];
intentsConfig.forEach((intent) => {
  intent.patterns.forEach((pattern) => {
    patternCorpus.push({
      text: pattern.toLowerCase(),
      intent: intent.id,
      priority: intent.priority,
      keywords: intent.keywords,
    });
  });
});

const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  distance: 100,
  keys: ["text"],
};

const fuse = new Fuse(patternCorpus, fuseOptions);

// ==================== INTENT DETECTION ====================

const detectIntent = (message) => {
  const lowerMessage = message.toLowerCase();

  // Fuzzy matching
  const fuzzyResults = fuse.search(lowerMessage);
  const intentScores = new Map();

  if (fuzzyResults.length > 0) {
    fuzzyResults.slice(0, 3).forEach((match) => {
      if (match.item && match.item.intent) {
        const score = match.score ? 1 - match.score : 1;
        const weightedScore = score * (match.item.priority / 10);
        intentScores.set(
          match.item.intent,
          (intentScores.get(match.item.intent) || 0) + weightedScore,
        );
      }
    });
  }

  // Keyword matching
  intentsConfig.forEach((intent) => {
    let keywordScore = 0;
    intent.keywords.forEach((keyword) => {
      if (lowerMessage.includes(keyword)) keywordScore += 1;
    });
    keywordScore = Math.min(keywordScore / intent.keywords.length, 1);
    const weightedKeywordScore = keywordScore * (intent.priority / 10);
    intentScores.set(
      intent.id,
      (intentScores.get(intent.id) || 0) + weightedKeywordScore,
    );
  });

  let bestIntent = "FALLBACK";
  let highestScore = 0;

  intentScores.forEach((score, intent) => {
    if (score > highestScore && score > 0.2) {
      highestScore = score;
      bestIntent = intent;
    }
  });

  return { intent: bestIntent, confidence: highestScore };
};

// ==================== ENTITY EXTRACTION ====================

const extractEntities = (message) => {
  const entities = {
    orderId: null,
    productName: null,
    category: null,
    quantity: null,
  };

  // Extract Order ID (B2B format)
  const orderPatterns = [
    /(?:order\s*(?:id|number)?\s*[#:]\s*)(B2B[A-Z0-9]+)/i,
    /(B2B\d{6,})/i,
    /\b([A-Z0-9]{10,})\b/i,
  ];

  for (const pattern of orderPatterns) {
    const match = message.match(pattern);
    if (
      match &&
      match[1] &&
      !match[1].match(/^(ORDER|TRACK|CANCEL|STATUS)$/i)
    ) {
      entities.orderId = match[1].toUpperCase();
      break;
    }
  }

  // Extract Product Name
  const productMatch = message.match(
    /(?:price of|rate of|cost of|buy|order)\s+([a-zA-Z\s]{3,20})/i,
  );
  if (productMatch && productMatch[1])
    entities.productName = productMatch[1].trim();

  // Extract Category
  const categories = [
    "vegetable",
    "fruit",
    "grain",
    "spice",
    "dairy",
    "flower",
  ];
  for (const cat of categories) {
    if (message.toLowerCase().includes(cat)) {
      entities.category = cat;
      break;
    }
  }

  // Extract Quantity
  const quantityMatch = message.match(
    /(\d+(?:\.\d+)?)\s*(?:kg|kilo|quintal|tonne)/i,
  );
  if (quantityMatch) entities.quantity = parseFloat(quantityMatch[1]);

  return entities;
};

// ==================== HELPER FUNCTIONS ====================

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getOrCreateChat = async (b2bUserId, businessName) => {
  let chat = await Chat.findOne({ b2bUserId, sessionActive: true });
  if (!chat) {
    chat = new Chat({
      b2bUserId,
      businessName: businessName || "",
      messages: [],
      sessionActive: true,
    });
    await chat.save();
  }
  return chat;
};

// ==================== MAIN PROCESSING FUNCTION ====================

const processUserMessage = async (message, userId, businessName) => {
  const { intent, confidence } = detectIntent(message);
  const entities = extractEntities(message);

  // Get context data
  const lastOrder = await B2BOrder.findOne({ b2bUserId: userId }).sort({
    createdAt: -1,
  });
  const lastPayment = await B2BPaymentHistory.findOne({
    b2bUserId: userId,
  }).sort({ createdAt: -1 });

  const intentConfig = intentsConfig.find((i) => i.id === intent);

  let responseText;
  if (intentConfig && intentConfig.responseTemplate) {
    const context = { entities, lastOrder, lastPayment };
    responseText = await intentConfig.responseTemplate(
      context,
      userId,
      businessName,
    );
  } else {
    responseText = `🤔 I'm not sure I understood "${message.substring(0, 50)}".\n\nHere's what I can help with:\n\n📦 **Track my order** - Get order status\n🔄 **Cancel my order** - Cancel eligible orders\n💰 **Refund policy** - Learn about refunds\n⭐ **Product recommendations** - Find best products\n📞 **Customer support** - Contact our team\n📋 **My orders** - View all orders\n\nCould you please rephrase your question? 🎯`;
  }

  return { responseText, intent, confidence, contextData: { entities } };
};

// ==================== CONTROLLER FUNCTIONS ====================

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const userId = req.user.id;
    const businessName = req.user.businessName || req.user.name || "";

    if (!message || message.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

    console.log(`📨 [${userId}] Message: "${message}"`);

    const chat = await getOrCreateChat(userId, businessName);

    // Save user message
    const userMessage = {
      sender: "user",
      text: message.trim(),
      timestamp: new Date(),
    };
    chat.messages.push(userMessage);

    // Process message
    const { responseText, intent, confidence, contextData } =
      await processUserMessage(message, userId, businessName);

    // Save bot response
    const botMessage = {
      sender: "bot",
      text: responseText,
      intent,
      timestamp: new Date(),
    };
    chat.messages.push(botMessage);
    chat.updatedAt = new Date();
    await chat.save();

    console.log(
      `🤖 Response: "${responseText.substring(0, 100)}..." [Intent: ${intent}]`,
    );

    res.status(200).json({
      success: true,
      data: { userMessage, botResponse: botMessage, contextData, confidence },
    });
  } catch (error) {
    console.error("Send message error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      b2bUserId: req.user.id,
      sessionActive: true,
    });
    res
      .status(200)
      .json({ success: true, data: { messages: chat?.messages || [] } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const clearChatHistory = async (req, res) => {
  try {
    await Chat.findOneAndUpdate(
      { b2bUserId: req.user.id },
      { messages: [], updatedAt: new Date() },
      { upsert: true },
    );
    res.status(200).json({ success: true, message: "Chat history cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const endChatSession = async (req, res) => {
  try {
    await Chat.findOneAndUpdate(
      { b2bUserId: req.user.id },
      { sessionActive: false },
    );
    res.status(200).json({ success: true, message: "Chat session ended" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getSuggestedQuestions = async (req, res) => {
  const suggestions = {
    "🛒 Orders": [
      { text: "Track my order", icon: "📦", intent: "TRACK_ORDER" },
      { text: "Cancel my order", icon: "🔄", intent: "CANCEL_ORDER" },
      { text: "My orders list", icon: "📋", intent: "MY_ORDERS" },
      { text: "Last order details", icon: "📋", intent: "LAST_ORDER" },
      { text: "Order delay", icon: "⏰", intent: "ORDER_DELAY" },
    ],
    "💰 Payments": [
      { text: "Refund policy", icon: "💰", intent: "REFUND_POLICY" },
      { text: "Last payment", icon: "💳", intent: "LAST_PAYMENT" },
      { text: "Payment methods", icon: "💳", intent: "PAYMENT_METHODS" },
      { text: "Return policy", icon: "🔄", intent: "RETURN_POLICY" },
    ],
    "🛍️ Shopping": [
      { text: "Best products", icon: "⭐", intent: "PRODUCT_RECOMMENDATION" },
      { text: "Price of", icon: "💰", intent: "PRICE_INQUIRY" },
      { text: "Bulk order", icon: "📦", intent: "BULK_ORDER" },
      { text: "Shipping info", icon: "🚚", intent: "SHIPPING_INFO" },
    ],
    "📞 Support": [
      { text: "Contact support", icon: "📞", intent: "HELPLINE" },
      { text: "Register complaint", icon: "📝", intent: "COMPLAINT" },
      { text: "Account issues", icon: "🔐", intent: "ACCOUNT_ISSUES" },
    ],
  };

  res.status(200).json({ success: true, data: suggestions });
};

module.exports = {
  sendMessage,
  getChatHistory,
  clearChatHistory,
  endChatSession,
  getSuggestedQuestions,
};
