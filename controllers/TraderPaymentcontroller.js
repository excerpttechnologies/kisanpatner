const crypto = require('crypto');
const Razorpay = require('razorpay');
const Product = require('../models/product');
const Transporter = require('../models/Transporter'); // Add this import

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_qUmhUFElBiSNIs',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'wsBV1ts8yJPld9JktATIdOiS',
});

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount, purchaseId, transporterId } = req.body;

    if (!amount || !purchaseId) {
      return res.status(400).json({
        success: false,
        message: 'Amount and purchaseId are required',
      });
    }

    // Optional: Validate transporter exists
    if (transporterId) {
      const transporter = await Transporter.findById(transporterId);
      if (!transporter) {
        return res.status(404).json({
          success: false,
          message: 'Transporter not found',
        });
      }
    }

    const options = {
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: `purchase_${purchaseId}`,
      notes: {
        purchaseId: purchaseId,
        transporterId: transporterId || 'not_selected'
      }
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Create Order Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Order creation failed',
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      purchaseId,
      transporterId, // Add transporterId
    } = req.body;

    // Step 1: Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'wsBV1ts8yJPld9JktATIdOiS')
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    // Step 2: Get transporter details if transporterId is provided
    let transporterDetails = null;
    if (transporterId) {
      const transporter = await Transporter.findById(transporterId);
      if (transporter) {
        // Get primary vehicle or first vehicle
        const primaryVehicle = transporter.getPrimaryVehicle();

        transporterDetails = {
          transporterId: transporter._id,
          transporterName: transporter.personalInfo.name,
          transporterMobile: transporter.personalInfo.mobileNo,
          vehicleType: primaryVehicle?.vehicleType || transporter.transportInfo.vehicleType,
          vehicleNumber: primaryVehicle?.vehicleNumber || transporter.transportInfo.vehicleNumber,
          vehicleCapacity: primaryVehicle?.vehicleCapacity || transporter.transportInfo.vehicleCapacity,
          driverName: primaryVehicle?.driverInfo?.driverName || transporter.transportInfo.driverInfo?.driverName,
          driverMobile: primaryVehicle?.driverInfo?.driverMobileNo || transporter.transportInfo.driverInfo?.driverMobileNo,
        };
      }
    }

    // Step 3: Update paymentStatus and transporter info inside purchaseHistory
    const product = await Product.findOne({
      'gradePrices.purchaseHistory._id': purchaseId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Purchase not found',
      });
    }

    let purchaseUpdated = false;

    product.gradePrices.forEach((grade) => {
      grade.purchaseHistory.forEach((purchase) => {
        if (purchase._id.toString() === purchaseId) {
          purchase.paymentStatus = 'paid';
          purchase.razorpayPaymentId = razorpay_payment_id;
          purchase.razorpayOrderId = razorpay_order_id;
          purchase.paymentDate = new Date();

          // Add transporter details
          if (transporterDetails) {
            purchase.transporter = transporterDetails;
          }

          purchaseUpdated = true;
        }
      });
    });

    if (!purchaseUpdated) {
      return res.status(404).json({
        success: false,
        message: 'Purchase record not found in product',
      });
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Payment verified & purchase updated',
      transporterAssigned: !!transporterDetails,
    });
  } catch (error) {
    console.error('Verify Payment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
};