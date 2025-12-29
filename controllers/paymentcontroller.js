const Razorpay = require("razorpay");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_qUmhUFElBiSNIs",
  key_secret: "wsBV1ts8yJPld9JktATIdOiS", // Replace with your actual key
});

// ONLY FOR CREATING RAZORPAY ORDER - That's it!
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};
