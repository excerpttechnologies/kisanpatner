// const intents = [
//   {
//     intent: "TRACK_ORDER",
//     keywords: [
//       "track order",
//       "order status",
//       "where is my order",
//       "order kaha hai",
//       "mera order",
//       "shipping status",
//       "delivery status",
//       "order tracking",
//     ],
//     response: async (orderId, orderDetails) => {
//       if (orderId && orderDetails) {
//         return `📦 **Order Status**\n\nOrder ID: ${orderId}\nStatus: ${orderDetails.status}\nExpected Delivery: ${orderDetails.expectedDelivery || "Not available"}\\n\\nWould you like more details about this order?`;
//       }
//       return "I can help you track your order. Please provide your Order ID or tell me the product name.";
//     },
//   },
//   {
//     intent: "CANCEL_ORDER",
//     keywords: [
//       "cancel order",
//       "order cancel",
//       "cancel my order",
//       "cancellation",
//       "how to cancel",
//       "stop order",
//     ],
//     response: (hasOrder) => {
//       if (hasOrder) {
//         return "🔄 **Order Cancellation**\n\nYou can cancel your order within 24 hours of placing it. Orders that are already shipped cannot be cancelled.\n\nDo you want to proceed with cancellation for your recent order?";
//       }
//       return "To cancel an order, please provide your Order ID. You can find it in 'My Orders' section.";
//     },
//   },
//   {
//     intent: "REFUND_POLICY",
//     keywords: [
//       "refund",
//       "money back",
//       "refund policy",
//       "return policy",
//       "refund status",
//       "refund kab milega",
//     ],
//     response: () => {
//       return "💰 **Refund Policy**\n\n• Refunds are processed within 5-7 business days\n• Amount is credited back to original payment method\n• Quality issues: Full refund within 7 days of delivery\n• Non-delivery: Full refund within 3 days\n\nNeed to request a refund? Please go to Payments section or provide your Order ID.";
//     },
//   },
//   {
//     intent: "PRODUCT_RECOMMENDATION",
//     keywords: [
//       "recommend product",
//       "best product",
//       "suggestion",
//       "what to buy",
//       "kya acha hai",
//       "product recommendation",
//       "popular products",
//     ],
//     response: (category) => {
//       if (category) {
//         return `🌟 **Product Recommendations**\n\nBased on your interest in ${category}, here are our top recommendations:\n\n1. Premium quality products from verified sellers\n2. Best prices in the market\n3. Fresh and organic options available\n\nWould you like to browse products in this category?`;
//       }
//       return "I can help you find the best products! Please tell me what type of products you're looking for (vegetables, fruits, grains, etc.)";
//     },
//   },
//   {
//     intent: "HELPLINE",
//     keywords: [
//       "helpline",
//       "support",
//       "customer care",
//       "contact support",
//       "help number",
//       "call support",
//       "speak to agent",
//     ],
//     response: () => {
//       return "📞 **Customer Support**\n\n• Phone: +91 800-000-0000 (Mon-Sat, 9 AM - 6 PM)\n• Email: support@kisanpatner.com\n• WhatsApp: wa.me/918000000000\n\nOur team will respond within 24 hours.";
//     },
//   },
//   {
//     intent: "LAST_ORDER",
//     keywords: [
//       "last order",
//       "recent order",
//       "previous order",
//       "my last order",
//       "latest order",
//     ],
//     response: async (order) => {
//       if (order) {
//         return `📋 **Your Last Order**\n\nOrder ID: ${order.orderId || "N/A"}\nDate: ${order.createdAt || "N/A"}\nTotal Amount: ₹${order.totalAmount || 0}\nStatus: ${order.status || "N/A"}\n\nWant to track this order? Reply with "track"`;
//       }
//       return "You haven't placed any orders yet. Would you like to browse our products?";
//     },
//   },
//   {
//     intent: "LAST_PAYMENT",
//     keywords: [
//       "last payment",
//       "recent payment",
//       "payment history",
//       "last transaction",
//       "payment status",
//     ],
//     response: async (payment) => {
//       if (payment) {
//         return `💳 **Last Payment**\n\nAmount: ₹${payment.amount || 0}\nDate: ${payment.createdAt || "N/A"}\nStatus: ${payment.status || "N/A"}\nTransaction ID: ${payment.razorpayPaymentId?.slice(-12) || "N/A"}\n\nNeed help with this payment?`;
//       }
//       return "No payment history found. Your payments will appear after you place orders.";
//     },
//   },
//   {
//     intent: "ORDER_DELAY",
//     keywords: [
//       "order delay",
//       "delay",
//       "late delivery",
//       "shipping delay",
//       "why order taking time",
//       "delayed order",
//     ],
//     response: () => {
//       return "⏰ **Order Delay Information**\n\nCommon reasons for delay:\n• High demand during peak season\n• Weather conditions affecting transport\n• Verification process for bulk orders\n• Local holidays\n\nPlease share your Order ID so I can check the exact status for you.";
//     },
//   },
//   {
//     intent: "I_WANT_HELP",
//     keywords: [
//       "i want help",
//       "need assistance",
//       "help me",
//       "can you help",
//       "assistance needed",
//       "support needed",
//       "help please",
//     ],
//     response: () => {
//       return "🙏 **How can I help you today?**\n\nHere's what I can assist with:\n• 📦 Track your order\n• 🔄 Cancel order\n• 💰 Refund policy\n• 🌟 Product recommendations\n• 📞 Helpline numbers\n• 📋 Last order details\n• 💳 Last payment info\n• ⏰ Order delay reasons\n\nWhat would you like to know?";
//     },
//   },
//   {
//     intent: "GREETING",
//     keywords: [
//       "hello",
//       "hi",
//       "hey",
//       "namaste",
//       "good morning",
//       "good evening",
//       "hola",
//     ],
//     response: (businessName) => {
//       return `👋 Hello${businessName ? " " + businessName : ""}! Welcome to KisanPatner B2B Support.\n\nHow can I assist you today? I can help with orders, payments, refunds, and product recommendations.`;
//     },
//   },
//   {
//     intent: "THANKS",
//     keywords: ["thank you", "thanks", "thankyou", "thnks", "dhanyawad"],
//     response: () => {
//       return "😊 You're welcome! I'm glad I could help.\n\nIs there anything else I can assist you with?";
//     },
//   },
//   {
//     intent: "FALLBACK",
//     keywords: [],
//     response: () => {
//       return "🤔 I'm not sure I understand. Could you please rephrase your question?\n\nYou can ask me about:\n• Order tracking\n• Order cancellation\n• Refunds\n• Product recommendations\n• Support contact\n• Last order/payment\n\nHow can I help you today?";
//     },
//   },
// ];

// // Helper function to detect intent
// const detectIntent = (message) => {
//   const lowerMessage = message.toLowerCase();

//   for (const intent of intents) {
//     for (const keyword of intent.keywords) {
//       if (lowerMessage.includes(keyword.toLowerCase())) {
//         return intent.intent;
//       }
//     }
//   }

//   return "FALLBACK";
// };

// module.exports = { intents, detectIntent };












const intents = [
  {
    intent: "TRACK_ORDER",
    patterns: [
      "where is my order",
      "track my order",
      "order status",
      "order kaha hai",
      "mera order kab aayega",
      "track order",
      "order tracking",
    ],
    response: () => {
      return "I can help you track your order. Please provide your Order ID.";
    },
  },
  {
    intent: "CANCEL_ORDER",
    patterns: [
      "cancel my order",
      "order cancel karna hai",
      "how to cancel order",
      "cancel product",
      "order cancel",
    ],
    response: () => {
      return "I can help you cancel your order. Please provide your Order ID.";
    },
  },
  {
    intent: "REFUND_POLICY",
    patterns: [
      "refund policy",
      "money back",
      "return policy",
      "refund kab milega",
    ],
    response: () => {
      return "💰 Refund Policy: Refunds are processed within 5-7 business days to your original payment method.";
    },
  },
  {
    intent: "PRODUCT_RECOMMENDATION",
    patterns: [
      "best product",
      "recommend product",
      "what to buy",
      "kya acha hai",
      "product suggestion",
    ],
    response: () => {
      return "I can help you find great products! Please tell me what category you're interested in (vegetables, fruits, grains, etc.)";
    },
  },
  {
    intent: "HELPLINE",
    patterns: [
      "helpline",
      "support number",
      "customer care",
      "contact support",
      "help number",
    ],
    response: () => {
      return "📞 Customer Support: Phone: +91 800-000-0000, Email: support@kisanpatner.com, WhatsApp: wa.me/918000000000";
    },
  },
  {
    intent: "LAST_ORDER",
    patterns: [
      "last order",
      "recent order",
      "previous order",
      "my last order",
      "latest order",
    ],
    response: () => {
      return "Let me fetch your last order details. Please wait a moment.";
    },
  },
  {
    intent: "LAST_PAYMENT",
    patterns: [
      "last payment",
      "recent payment",
      "payment history",
      "last transaction",
    ],
    response: () => {
      return "Let me fetch your last payment details.";
    },
  },
  {
    intent: "ORDER_DELAY",
    patterns: [
      "order delay",
      "late delivery",
      "shipping delay",
      "why order taking time",
      "delayed order",
    ],
    response: () => {
      return "I understand your concern. Common reasons for delay: weather, high demand, verification. Please provide your Order ID for specific status.";
    },
  },
  {
    intent: "I_WANT_HELP",
    patterns: [
      "i want help",
      "need assistance",
      "help me",
      "can you help",
      "assistance needed",
    ],
    response: () => {
      return "I'm here to help! You can ask me about:\n• Orders\n• Payments\n• Refunds\n• Product Recommendations\n• Customer Support\n\nWhat do you need assistance with?";
    },
  },
  {
    intent: "GREETING",
    patterns: ["hello", "hi", "hey", "namaste", "good morning", "good evening"],
    response: (businessName) => {
      return `👋 Hello${businessName ? " " + businessName : ""}! Welcome to KisanPatner B2B Support. How can I help you today?`;
    },
  },
  {
    intent: "THANKS",
    patterns: ["thank you", "thanks", "thankyou", "thnks", "dhanyawad"],
    response: () => {
      return "😊 You're welcome! Is there anything else I can help with?";
    },
  },
];

// Detect intent from message
const detectIntent = (message) => {
  const lowerMessage = message.toLowerCase();

  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      if (lowerMessage.includes(pattern.toLowerCase())) {
        console.log(`Intent detected: ${intent.intent}`);
        return intent.intent;
      }
    }
  }

  console.log("No intent matched, using FALLBACK");
  return "FALLBACK";
};

// Fallback response
const fallbackResponse = () => {
  return "🤔 I'm not sure I understand. Please try asking about:\n\n• Track my order\n• Cancel my order\n• Refund policy\n• Product recommendations\n• Customer support\n\nHow can I help you?";
};

// Extract entities from message
const extractEntities = (message) => {
  const entities = {
    orderId: null,
    productName: null,
    category: null,
  };

  // Extract Order ID (pattern: ORD followed by numbers)
  const orderMatch = message.match(/ORD[A-Z0-9]+|[A-Z0-9]{10,}/i);
  if (orderMatch) {
    entities.orderId = orderMatch[0];
  }

  // Extract category
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

  return entities;
};

module.exports = { intents, detectIntent, extractEntities, fallbackResponse };
