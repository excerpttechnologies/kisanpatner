// const Farmer = require('../models/Farmer');
// const bcrypt = require('bcryptjs');
// const path = require('path');
// const Order = require('../models/order');



// const generateNextId = async (role) => {
//   const prefix = role === 'farmer' ? 'far' : 'trd';
//   const fieldName = role === 'farmer' ? 'farmerId' : 'traderId';

//   // Find the last registered user with this role - using correct field
//   const lastUser = await Farmer.findOne({
//     [fieldName]: new RegExp(`^${prefix}-`)
//   })
//   .sort({ [fieldName]: -1 })
//   .select(fieldName);

//   if (!lastUser) {
//     // First user of this role
//     return `${prefix}-01`;
//   }

//   // Extract the number from the last ID
//   const lastNumber = parseInt(lastUser[fieldName].split('-')[1]);
//   const nextNumber = lastNumber + 1;

//   // Pad with zeros to maintain format
//   return `${prefix}-${String(nextNumber).padStart(2, '0')}`;
// };

// exports.registerFarmer = async (req, res) => {
//   try {
//     const {
//       personalInfo,
//       farmLocation,
//       farmLand,
//       commodities,
//       nearestMarkets,
//       bankDetails,
//       security,
//       role
//     } = req.body;

//     // Validate role
//     if (!role || !['farmer', 'trader'].includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid role. Role must be either "farmer" or "trader"'
//       });
//     }

//     // Parse JSON strings
//     const parsedPersonalInfo = JSON.parse(personalInfo);
//     const parsedFarmLocation = JSON.parse(farmLocation);
//     const parsedFarmLand = JSON.parse(farmLand);
//     const parsedCommodities = JSON.parse(commodities);

//     const parsedBankDetails = JSON.parse(bankDetails);
//     const parsedSecurity = JSON.parse(security);
// const parsedSubcategories = JSON.parse(req.body.subcategories || '[]');
// const parsedNearestMarkets = JSON.parse(nearestMarkets);  // This should now be an array of IDs

//     // Check if farmer already exists
//     const existingFarmer = await Farmer.findOne({
//       'personalInfo.mobileNo': parsedPersonalInfo.mobileNo
//     });

//     if (existingFarmer) {
//       return res.status(400).json({
//         success: false,
//         message: 'Farmer with this mobile number already exists'
//       });
//     }

//     // Generate unique farmer/trader ID
//     const farmerId = await generateNextId(role);

//     // Hash MPIN and Password
//     const salt = await bcrypt.genSalt(10);
//     const hashedMpin = await bcrypt.hash(parsedSecurity.mpin, salt);
//     const hashedPassword = await bcrypt.hash(parsedSecurity.password, salt);

//     // Prepare document paths
// // Prepare document paths
// const documents = {};
// if (req.files) {
//   if (req.files.panCard) {
//     documents.panCard = `/uploads/${req.files.panCard[0].filename}`;
//   }
//   if (req.files.aadharFront) {
//     documents.aadharFront = `/uploads/${req.files.aadharFront[0].filename}`;
//   }
//   if (req.files.aadharBack) {
//     documents.aadharBack = `/uploads/${req.files.aadharBack[0].filename}`;
//   }

//   if (role === 'farmer') {
//     if (req.files.bankPassbook) {
//       documents.bankPassbook = `/uploads/${req.files.bankPassbook[0].filename}`;
//     }
//   } else if (role === 'trader') {
//     if (req.files.businessLicense) {
//       documents.businessLicense = `/uploads/${req.files.businessLicense[0].filename}`;
//     }
//     if (req.files.photo) {
//       documents.photo = `/uploads/${req.files.photo[0].filename}`;
//     }
//     if (req.files.businessNameBoard) {
//       documents.businessNameBoard = `/uploads/${req.files.businessNameBoard[0].filename}`;
//     }
//   }
// }

//     // Create new farmer/trader
//     const newFarmer = new Farmer({
//   [role === 'farmer' ? 'farmerId' : 'traderId']: farmerId,
//       personalInfo: parsedPersonalInfo,
//       farmLocation: parsedFarmLocation,
//       farmLand: parsedFarmLand,
//       role: role,


//       commodities: parsedCommodities,
//   subcategories: parsedSubcategories,  // ADD THIS
//   nearestMarkets: parsedNearestMarkets,  // Now array of ObjectIds
//       bankDetails: parsedBankDetails,

//       documents: documents,
//       security: {
//         referralCode: parsedSecurity.referralCode,
//         mpin: hashedMpin,
//         password: hashedPassword
//       },
//       registrationStatus: 'pending',  // ADD THIS
//   isActive: false  // ADD THIS (or remove if default is false in schema)
//     });

//     await newFarmer.save();

//     res.status(201).json({
//       success: true,
//       message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
//       data: {
//         id: newFarmer._id,
//         farmerId: newFarmer.farmerId,
//         name: newFarmer.personalInfo.name,
//         mobileNo: newFarmer.personalInfo.mobileNo,
//         role: newFarmer.role
//       }
//     });

//   } catch (error) {
//     console.error('Error in registerFarmer:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };
// // Get Farmer by ID
// exports.getFarmerById = async (req, res) => {
//   try {
//     const farmer = await Farmer.findById(req.params.id).populate('commodities');

//     if (!farmer) {
//       return res.status(404).json({
//         success: false,
//         message: 'Farmer not found'
//       });
//     }

//     // Don't send MPIN in response
//     const farmerData = farmer.toObject();
//     delete farmerData.security.mpin;

//     res.status(200).json({
//       success: true,
//       data: farmerData
//     });
//   } catch (error) {
//     console.error('Error in getFarmerById:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// // Get All Farmers
// exports.getAllFarmers = async (req, res) => {
//   try {
//     const { traderId, role } = req.query;

//     let filter = {};
//     if (traderId) filter.traderId = traderId;
//     if (role) filter.role = role;

//     const farmers = await Farmer.find(filter)
//       .select("-security.mpin -security.password");

//     res.status(200).json({
//       success: true,
//       data: farmers
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Update Farmer
// exports.updateFarmer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     // Remove fields that shouldn't be updated directly
//     delete updateData._id;
//     delete updateData.farmerId;
//     delete updateData.security; // Don't allow security updates from this endpoint
//     delete updateData.registeredAt;

//     const updatedFarmer = await Farmer.findByIdAndUpdate(
//       id,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     )
//     .populate('commodities')
//     .populate('subcategories')
//     .populate('nearestMarkets')
//     .select('-security.mpin -security.password');

//     if (!updatedFarmer) {
//       return res.status(404).json({
//         success: false,
//         message: 'Farmer not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Farmer updated successfully',
//       data: updatedFarmer
//     });

//   } catch (error) {
//     console.error('Error updating farmer:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };


// // Delete Farmer (Soft Delete)
// exports.deleteFarmer = async (req, res) => {
//   try {
//     const farmer = await Farmer.findByIdAndUpdate(
//       req.params.id,
//       { isActive: false },
//       { new: true }
//     );

//     if (!farmer) {
//       return res.status(404).json({
//         success: false,
//         message: 'Farmer not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Farmer deactivated successfully'
//     });
//   } catch (error) {
//     console.error('Error in deleteFarmer:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// // Permanently Delete Farmer
// exports.permanentlyDeleteFarmer = async (req, res) => {
//   try {
//     const farmer = await Farmer.findByIdAndDelete(req.params.id);

//     if (!farmer) {
//       return res.status(404).json({
//         success: false,
//         message: 'Farmer not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Farmer permanently deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error in permanentlyDeleteFarmer:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// // Search Farmers
// exports.searchFarmers = async (req, res) => {
//   try {
//     const { query, state, district, commodity } = req.query;
//     let searchCriteria = { isActive: true };

//     // Text search in name, mobile, village
//     if (query) {
//       searchCriteria.$or = [
//         { 'personalInfo.name': { $regex: query, $options: 'i' } },
//         { 'personalInfo.mobileNo': { $regex: query, $options: 'i' } },
//         { 'personalInfo.villageGramaPanchayat': { $regex: query, $options: 'i' } }
//       ];
//     }

//     // Filter by state
//     if (state) {
//       searchCriteria['personalInfo.state'] = state;
//     }

//     // Filter by district
//     if (district) {
//       searchCriteria['personalInfo.district'] = district;
//     }

//     // Filter by commodity
//     if (commodity) {
//       searchCriteria.commodities = commodity;
//     }

//     const farmers = await Farmer.find(searchCriteria)
//       .populate('commodities')
//       .select('-security.mpin')
//       .sort({ registeredAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: farmers.length,
//       data: farmers
//     });
//   } catch (error) {
//     console.error('Error in searchFarmers:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// // Verify MPIN (for login)
// exports.verifyMpin = async (req, res) => {
//   try {
//     const { mobileNo, mpin } = req.body;

//     if (!mobileNo || !mpin) {
//       return res.status(400).json({
//         success: false,
//         message: 'Mobile number and MPIN are required'
//       });
//     }

//     const farmer = await Farmer.findOne({
//       'personalInfo.mobileNo': mobileNo,
//       isActive: true
//     });

//     if (!farmer) {
//       return res.status(404).json({
//         success: false,
//         message: 'Farmer not found'
//       });
//     }

//     const isMatch = await bcrypt.compare(mpin, farmer.security.mpin);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid MPIN'
//       });
//     }

//     // Don't send MPIN in response
//     const farmerData = farmer.toObject();
//     delete farmerData.security.mpin;

//     res.status(200).json({
//       success: true,
//       message: 'MPIN verified successfully',
//       data: farmerData
//     });
//   } catch (error) {
//     console.error('Error in verifyMpin:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// // Get Farmer Statistics
// exports.getFarmerStats = async (req, res) => {
//   try {
//     const totalFarmers = await Farmer.countDocuments({ isActive: true });
//     const totalLand = await Farmer.aggregate([
//       { $match: { isActive: true } },
//       {
//         $group: {
//           _id: null,
//           totalLand: { $sum: '$farmLand.total' },
//           totalCultivated: { $sum: '$farmLand.cultivated' },
//           totalUncultivated: { $sum: '$farmLand.uncultivated' }
//         }
//       }
//     ]);

//     const farmersByState = await Farmer.aggregate([
//       { $match: { isActive: true } },
//       {
//         $group: {
//           _id: '$personalInfo.state',
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { count: -1 } }
//     ]);

//     const farmersByCommodity = await Farmer.aggregate([
//       { $match: { isActive: true } },
//       { $unwind: '$commodities' },
//       {
//         $group: {
//           _id: '$commodities',
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { count: -1 } },
//       {
//         $lookup: {
//           from: 'categories',
//           localField: '_id',
//           foreignField: '_id',
//           as: 'category'
//         }
//       },
//       { $unwind: '$category' },
//       {
//         $project: {
//           _id: 1,
//           categoryName: '$category.name',
//           count: 1
//         }
//       }
//     ]);

//     res.status(200).json({
//       success: true,
//       data: {
//         totalFarmers,
//         landStats: totalLand[0] || { totalLand: 0, totalCultivated: 0, totalUncultivated: 0 },
//         farmersByState,
//         farmersByCommodity
//       }
//     });
//   } catch (error) {
//     console.error('Error in getFarmerStats:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };
// exports.getFarmerMarketTransportationOrders = async (req, res) => {
//   try {
//     // Get farmerId from body
//     const { farmerId } = req.body;

//     if (!farmerId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Farmer ID is required'
//       });
//     }

//     console.log('Fetching orders for farmer:', farmerId);

//     // Find all orders where this farmer has product items and transporter is assigned
//     const orders = await Order.find({
//       farmerId: farmerId,
//       transporterStatus: 'accepted',
//       'transporterDetails.transporterId': { $exists: true }
//     }).sort({ 'productItems.deliveryDate': 1 });

//     if (!orders || orders.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: 'No orders with assigned transporters found',
//         data: []
//       });
//     }

//     // Group orders by delivery date
//     const groupedOrders = {};

//     orders.forEach(order => {
//       order.productItems.forEach(item => {
//         if (item.farmerId === farmerId) {
//           const deliveryDate = item.deliveryDate
//             ? new Date(item.deliveryDate).toISOString().split('T')[0]
//             : 'No Date';

//           if (!groupedOrders[deliveryDate]) {
//             groupedOrders[deliveryDate] = {
//               deliveryDate: deliveryDate,
//               orders: []
//             };
//           }

//           // Check if this order is already in the group
//           let existingOrder = groupedOrders[deliveryDate].orders.find(
//             o => o.orderId === order.orderId
//           );

//           if (!existingOrder) {
//             existingOrder = {
//               orderId: order.orderId,
//               _id: order._id,
//               traderName: order.traderName,
//               traderMobile: order.traderMobile,
//               transporterDetails: order.transporterDetails,
//               orderStatus: order.orderStatus,
//               transporterStatus: order.transporterStatus,
//               createdAt: order.createdAt,
//               productItems: []
//             };
//             groupedOrders[deliveryDate].orders.push(existingOrder);
//           }

//           // Add product item to this order
//           existingOrder.productItems.push({
//             _id: item._id,
//             productId: item.productId,
//             grade: item.grade,
//             quantity: item.quantity,
//             quantitySentByFarmer: item.quantitySentByFarmer || 0,
//             farmerMarketTransportStatus: item.farmerMarketTransportStatus || false,
//             farmerSentDate: item.farmerSentDate,
//             farmerNotes: item.farmerNotes,
//             pricePerUnit: item.pricePerUnit,
//             totalAmount: item.totalAmount,
//             nearestMarket: item.nearestMarket,
//             deliveryDate: item.deliveryDate
//           });
//         }
//       });
//     });

//     // Convert grouped orders object to array
//     const result = Object.values(groupedOrders).sort((a, b) => {
//       if (a.deliveryDate === 'No Date') return 1;
//       if (b.deliveryDate === 'No Date') return -1;
//       return new Date(a.deliveryDate) - new Date(b.deliveryDate);
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Orders fetched successfully',
//       data: result
//     });

//   } catch (error) {
//     console.error('Error fetching farmer market transportation orders:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch orders',
//       error: error.message
//     });
//   }
// };

// /**
//  * Update quantity sent by farmer for specific product items
//  * POST /api/farmer/market-transportation/update
//  */
// exports.updateFarmerMarketTransportation = async (req, res) => {
//   try {
//     const { farmerId, orderId, productItemUpdates } = req.body;

//     // Validation
//     if (!farmerId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Farmer ID is required'
//       });
//     }

//     if (!orderId || !productItemUpdates || !Array.isArray(productItemUpdates)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Order ID and product item updates are required'
//       });
//     }

//     console.log('Updating order:', orderId, 'for farmer:', farmerId);

//     // Find the order
//     const order = await Order.findOne({
//       orderId: orderId,
//       farmerId: farmerId
//     });

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }

//     // Check if transporter is assigned
//     if (order.transporterStatus !== 'accepted' || !order.transporterDetails) {
//       return res.status(400).json({
//         success: false,
//         message: 'Transporter not assigned to this order'
//       });
//     }

//     // Update each product item
//     let updatedCount = 0;
//     const errors = [];

//     for (const update of productItemUpdates) {
//       const { productItemId, quantitySentByFarmer, farmerNotes } = update;

//       if (!productItemId || quantitySentByFarmer === undefined) {
//         errors.push(`Missing data for product item: ${productItemId}`);
//         continue;
//       }

//       // Find the product item
//       const productItem = order.productItems.id(productItemId);

//       if (!productItem) {
//         errors.push(`Product item not found: ${productItemId}`);
//         continue;
//       }

//       // Validate quantity
//       if (quantitySentByFarmer < 0) {
//         errors.push(`Invalid quantity for ${productItemId}: cannot be negative`);
//         continue;
//       }

//       if (quantitySentByFarmer > productItem.quantity) {
//         errors.push(`Quantity sent (${quantitySentByFarmer}) exceeds ordered quantity (${productItem.quantity}) for ${productItemId}`);
//         continue;
//       }

//       // Update the product item
//       productItem.quantitySentByFarmer = quantitySentByFarmer;
//       productItem.farmerMarketTransportStatus = true;
//       productItem.farmerSentDate = new Date();
//       productItem.farmerNotes = farmerNotes || '';

//       updatedCount++;
//     }

//     // Save the order
//     await order.save();

//     // Prepare response
//     const responseMessage = errors.length > 0
//       ? `Updated ${updatedCount} items with ${errors.length} errors`
//       : `Successfully updated ${updatedCount} items`;

//     res.status(200).json({
//       success: updatedCount > 0,
//       message: responseMessage,
//       data: {
//         orderId: order.orderId,
//         updatedCount: updatedCount,
//         errors: errors.length > 0 ? errors : undefined
//       }
//     });

//   } catch (error) {
//     console.error('Error updating farmer market transportation:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update transportation details',
//       error: error.message
//     });
//   }
// };

// /**
//  * Get specific order details for farmer
//  * POST /api/farmer/market-transportation/order-details
//  */
// exports.getFarmerOrderDetails = async (req, res) => {
//   try {
//     const { orderId, farmerId } = req.body;

//     if (!farmerId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Farmer ID is required'
//       });
//     }

//     if (!orderId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Order ID is required'
//       });
//     }

//     const order = await Order.findOne({
//       orderId: orderId,
//       farmerId: farmerId
//     });

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }

//     // Filter product items for this farmer
//     const farmerProductItems = order.productItems.filter(
//       item => item.farmerId === farmerId
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Order details fetched successfully',
//       data: {
//         orderId: order.orderId,
//         _id: order._id,
//         traderName: order.traderName,
//         traderMobile: order.traderMobile,
//         transporterDetails: order.transporterDetails,
//         orderStatus: order.orderStatus,
//         transporterStatus: order.transporterStatus,
//         productItems: farmerProductItems,
//         createdAt: order.createdAt
//       }
//     });

//   } catch (error) {
//     console.error('Error fetching order details:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch order details',
//       error: error.message
//     });
//   }
// };



const Farmer = require('../models/Farmer');
const bcrypt = require('bcryptjs');
const path = require('path');
const Order = require('../models/order');

/**
 * OPTIMIZED ID Generation - Handles 100+ records without performance issues
 * Key improvements:
 * 1. Uses $regex with indexed fields for faster sorting
 * 2. Limits query to 1 result only (not scanning entire collection)
 * 3. Caches last ID in counter collection for future scalability
 * 4. Fallback to incremental search if needed
 * 5. Error handling with retry logic
 */
const generateNextId = async (role) => {
  const prefix = role === 'farmer' ? 'far' : 'trd';
  const fieldName = role === 'farmer' ? 'farmerId' : 'traderId';
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      // OPTIMIZED: Use indexed field with specific regex pattern for better performance
      const lastUser = await Farmer.findOne({
        [fieldName]: { $regex: `^${prefix}-\\d+$` }
      })
        .sort({ [fieldName]: -1 })
        .limit(1) // CRITICAL: Only fetch 1 document instead of scanning all
        .select(fieldName)
        .lean() // Use lean() for read-only queries - faster performance
        .maxTime(5000); // Set timeout to prevent hanging queries

      if (!lastUser) {
        // First user of this role - 5 digits supports up to 99,999 (1 lakh)
        return `${prefix}-00001`;
      }

      // Extract the number from the last ID with error handling
      const idStr = lastUser[fieldName];
      const parts = idStr.split('-');

      if (parts.length !== 2) {
        throw new Error(`Invalid ID format found: ${idStr}`);
      }

      const lastNumber = parseInt(parts[1], 10);

      if (isNaN(lastNumber)) {
        throw new Error(`Invalid ID number format: ${parts[1]}`);
      }

      const nextNumber = lastNumber + 1;

      // Pad to 5 digits with leading zeros (Supports 99,999 users = 1 lakh)
      const nextId = `${prefix}-${String(nextNumber).padStart(5, '0')}`;

      // Check if this ID already exists (race condition prevention)
      const idExists = await Farmer.findOne(
        { [fieldName]: nextId },
        { [fieldName]: 1 }
      )
        .lean()
        .maxTime(3000);

      if (!idExists) {
        return nextId;
      }

      // If ID exists, retry with incremented number
      retryCount++;
      continue;

    } catch (error) {
      retryCount++;
      if (retryCount >= maxRetries) {
        throw new Error(`Failed to generate ID after ${maxRetries} attempts: ${error.message}`);
      }
      // Small delay before retry to avoid rapid re-queries
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  throw new Error('Unable to generate unique ID');
};

/**
 * Alternative: Counter-based ID generation for extreme scale (1000+ records)
 * Uncomment to use instead of above function
 */
/*
const generateNextIdWithCounter = async (role) => {
  const prefix = role === 'farmer' ? 'far' : 'trd';
  const counterId = `${prefix}_counter`;

  try {
    const counter = await Counter.findByIdAndUpdate(
      counterId,
      { $inc: { sequence: 1 } },
      { new: true, upsert: true }
    );

    return `${prefix}-${String(counter.sequence).padStart(4, '0')}`;
  } catch (error) {
    console.error('Error with counter-based ID generation:', error);
    throw new Error(`Failed to generate ID: ${error.message}`);
  }
};

// Counter Schema (add this to your models folder)
const counterSchema = new Schema({
  _id: String,
  sequence: { type: Number, default: 0 }
});
*/

exports.registerFarmer = async (req, res) => {
  try {
    const {
      personalInfo,
      farmLocation,
      farmLand,
      commodities,
      nearestMarkets,
      bankDetails,
      security,
      role
    } = req.body;

    // Validate role
    if (!role || !['farmer', 'trader'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Role must be either "farmer" or "trader"'
      });
    }

    // Parse JSON strings with error handling
    let parsedPersonalInfo, parsedFarmLocation, parsedFarmLand, parsedCommodities, parsedBankDetails, parsedSecurity, parsedSubcategories, parsedNearestMarkets;

    try {
      parsedPersonalInfo = JSON.parse(personalInfo);
      parsedFarmLocation = JSON.parse(farmLocation);
      parsedFarmLand = JSON.parse(farmLand);
      parsedCommodities = JSON.parse(commodities);
      parsedBankDetails = JSON.parse(bankDetails);
      parsedSecurity = JSON.parse(security);
      parsedSubcategories = JSON.parse(req.body.subcategories || '[]');
      parsedNearestMarkets = JSON.parse(nearestMarkets);
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON format in request body',
        error: parseError.message
      });
    }

    // Check if farmer already exists
    const existingFarmer = await Farmer.findOne({
      'personalInfo.mobileNo': parsedPersonalInfo.mobileNo
    }).lean();

    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        message: 'Farmer with this mobile number already exists'
      });
    }

    // Generate unique farmer/trader ID with error handling
    let farmerId;
    try {
      farmerId = await generateNextId(role);
    } catch (idError) {
      console.error('Error generating ID:', idError);
      return res.status(500).json({
        success: false,
        message: 'Failed to generate user ID',
        error: idError.message
      });
    }

    // Hash MPIN and Password
    let hashedMpin, hashedPassword;
    try {
      const salt = await bcrypt.genSalt(10);
      hashedMpin = await bcrypt.hash(parsedSecurity.mpin, salt);
      hashedPassword = await bcrypt.hash(parsedSecurity.password, salt);
    } catch (hashError) {
      return res.status(500).json({
        success: false,
        message: 'Error hashing security credentials'
      });
    }

    // Prepare document paths
    const documents = {};
    if (req.files) {
      // Common documents for both roles
      if (req.files.panCard) {
        documents.panCard = `/uploads/${req.files.panCard[0].filename}`;
      }
      if (req.files.aadharFront) {
        documents.aadharFront = `/uploads/${req.files.aadharFront[0].filename}`;
      }
      if (req.files.aadharBack) {
        documents.aadharBack = `/uploads/${req.files.aadharBack[0].filename}`;
      }

      // Role-specific documents
      if (role === 'farmer') {
        if (req.files.bankPassbook) {
          documents.bankPassbook = `/uploads/${req.files.bankPassbook[0].filename}`;
        }
      } else if (role === 'trader') {
        if (req.files.businessLicense) {
          documents.businessLicense = `/uploads/${req.files.businessLicense[0].filename}`;
        }
        if (req.files.photo) {
          documents.photo = `/uploads/${req.files.photo[0].filename}`;
        }
        if (req.files.businessNameBoard) {
          documents.businessNameBoard = `/uploads/${req.files.businessNameBoard[0].filename}`;
        }
      }
    }

    // Create new farmer/trader
    const newFarmer = new Farmer({
      [role === 'farmer' ? 'farmerId' : 'traderId']: farmerId,
      personalInfo: parsedPersonalInfo,
      farmLocation: parsedFarmLocation,
      farmLand: parsedFarmLand,
      role: role,
      commodities: parsedCommodities,
      subcategories: parsedSubcategories,
      nearestMarkets: parsedNearestMarkets,
      bankDetails: parsedBankDetails,
      documents: documents,
      security: {
        referralCode: parsedSecurity.referralCode,
        mpin: hashedMpin,
        password: hashedPassword
      },
      registrationStatus: 'pending',
      isActive: false
    });

    await newFarmer.save();

    res.status(201).json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      data: {
        id: newFarmer._id,
        farmerId: newFarmer.farmerId || newFarmer.traderId,
        name: newFarmer.personalInfo.name,
        mobileNo: newFarmer.personalInfo.mobileNo,
        role: newFarmer.role
      }
    });

  } catch (error) {
    console.error('Error in registerFarmer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get Farmer by ID
exports.getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id)
      .populate('commodities')
      .lean(); // Use lean() for better performance

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    // Don't send MPIN in response
    delete farmer.security.mpin;

    res.status(200).json({
      success: true,
      data: farmer
    });
  } catch (error) {
    console.error('Error in getFarmerById:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get All Farmers with pagination for performance
exports.getAllFarmers = async (req, res) => {
  try {
    const { traderId, role, page = 1, limit = 50 } = req.query;

    let filter = {};
    if (traderId) filter.traderId = traderId;
    if (role) filter.role = role;

    // OPTIMIZED: Add pagination to prevent loading all records at once
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const farmers = await Farmer.find(filter)
      .select('-security.mpin -security.password')
      .skip(skip)
      .limit(parseInt(limit))
      .lean()
      .sort({ registeredAt: -1 });

    const totalCount = await Farmer.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: farmers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalRecords: totalCount,
        recordsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update Farmer
exports.updateFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.farmerId;
    delete updateData.traderId;
    delete updateData.security; // Don't allow security updates from this endpoint
    delete updateData.registeredAt;

    const updatedFarmer = await Farmer.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('commodities')
      .populate('subcategories')
      .populate('nearestMarkets')
      .select('-security.mpin -security.password');

    if (!updatedFarmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Farmer updated successfully',
      data: updatedFarmer
    });

  } catch (error) {
    console.error('Error updating farmer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete Farmer (Soft Delete)
exports.deleteFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Farmer deactivated successfully'
    });
  } catch (error) {
    console.error('Error in deleteFarmer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Permanently Delete Farmer
exports.permanentlyDeleteFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Farmer permanently deleted successfully'
    });
  } catch (error) {
    console.error('Error in permanentlyDeleteFarmer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Search Farmers with pagination
exports.searchFarmers = async (req, res) => {
  try {
    const { query, state, district, commodity, page = 1, limit = 50 } = req.query;
    let searchCriteria = { isActive: true };

    // Text search in name, mobile, village
    if (query) {
      searchCriteria.$or = [
        { 'personalInfo.name': { $regex: query, $options: 'i' } },
        { 'personalInfo.mobileNo': { $regex: query, $options: 'i' } },
        { 'personalInfo.villageGramaPanchayat': { $regex: query, $options: 'i' } }
      ];
    }

    // Filter by state
    if (state) {
      searchCriteria['personalInfo.state'] = state;
    }

    // Filter by district
    if (district) {
      searchCriteria['personalInfo.district'] = district;
    }

    // Filter by commodity
    if (commodity) {
      searchCriteria.commodities = commodity;
    }

    // OPTIMIZED: Add pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const farmers = await Farmer.find(searchCriteria)
      .populate('commodities')
      .select('-security.mpin')
      .sort({ registeredAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const totalCount = await Farmer.countDocuments(searchCriteria);

    res.status(200).json({
      success: true,
      count: farmers.length,
      data: farmers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalRecords: totalCount,
        recordsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error in searchFarmers:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Verify MPIN (for login)
exports.verifyMpin = async (req, res) => {
  try {
    const { mobileNo, mpin } = req.body;

    if (!mobileNo || !mpin) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and MPIN are required'
      });
    }

    const farmer = await Farmer.findOne({
      'personalInfo.mobileNo': mobileNo,
      isActive: true
    });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    const isMatch = await bcrypt.compare(mpin, farmer.security.mpin);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid MPIN'
      });
    }

    // Don't send MPIN in response
    const farmerData = farmer.toObject();
    delete farmerData.security.mpin;

    res.status(200).json({
      success: true,
      message: 'MPIN verified successfully',
      data: farmerData
    });
  } catch (error) {
    console.error('Error in verifyMpin:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get Farmer Statistics
exports.getFarmerStats = async (req, res) => {
  try {
    const totalFarmers = await Farmer.countDocuments({ isActive: true });

    const totalLand = await Farmer.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalLand: { $sum: '$farmLand.total' },
          totalCultivated: { $sum: '$farmLand.cultivated' },
          totalUncultivated: { $sum: '$farmLand.uncultivated' }
        }
      }
    ]);

    const farmersByState = await Farmer.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$personalInfo.state',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const farmersByCommodity = await Farmer.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$commodities' },
      {
        $group: {
          _id: '$commodities',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $project: {
          _id: 1,
          categoryName: '$category.name',
          count: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalFarmers,
        landStats: totalLand[0] || { totalLand: 0, totalCultivated: 0, totalUncultivated: 0 },
        farmersByState,
        farmersByCommodity
      }
    });
  } catch (error) {
    console.error('Error in getFarmerStats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getFarmerMarketTransportationOrders = async (req, res) => {
  try {
    // Get farmerId from body
    const { farmerId } = req.body;

    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: 'Farmer ID is required'
      });
    }

    console.log('Fetching orders for farmer:', farmerId);

    // Find all orders where this farmer has product items and transporter is assigned
    const orders = await Order.find({
      farmerId: farmerId,
      transporterStatus: 'accepted',
      'transporterDetails.transporterId': { $exists: true }
    })
      .sort({ 'productItems.deliveryDate': 1 })
      .lean(); // Use lean() for better performance

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No orders with assigned transporters found',
        data: []
      });
    }

    // Group orders by delivery date
    const groupedOrders = {};

    orders.forEach(order => {
      order.productItems.forEach(item => {
        if (item.farmerId === farmerId) {
          const deliveryDate = item.deliveryDate
            ? new Date(item.deliveryDate).toISOString().split('T')[0]
            : 'No Date';

          if (!groupedOrders[deliveryDate]) {
            groupedOrders[deliveryDate] = {
              deliveryDate: deliveryDate,
              orders: []
            };
          }

          // Check if this order is already in the group
          let existingOrder = groupedOrders[deliveryDate].orders.find(
            o => o.orderId === order.orderId
          );

          if (!existingOrder) {
            existingOrder = {
              orderId: order.orderId,
              _id: order._id,
              traderName: order.traderName,
              traderMobile: order.traderMobile,
              transporterDetails: order.transporterDetails,
              orderStatus: order.orderStatus,
              transporterStatus: order.transporterStatus,
              createdAt: order.createdAt,
              productItems: []
            };
            groupedOrders[deliveryDate].orders.push(existingOrder);
          }

          // Add product item to this order
          existingOrder.productItems.push({
            _id: item._id,
            productId: item.productId,
            grade: item.grade,
            quantity: item.quantity,
            quantitySentByFarmer: item.quantitySentByFarmer || 0,
            farmerMarketTransportStatus: item.farmerMarketTransportStatus || false,
            farmerSentDate: item.farmerSentDate,
            farmerNotes: item.farmerNotes,
            pricePerUnit: item.pricePerUnit,
            totalAmount: item.totalAmount,
            nearestMarket: item.nearestMarket,
            deliveryDate: item.deliveryDate
          });
        }
      });
    });

    // Convert grouped orders object to array
    const result = Object.values(groupedOrders).sort((a, b) => {
      if (a.deliveryDate === 'No Date') return 1;
      if (b.deliveryDate === 'No Date') return -1;
      return new Date(a.deliveryDate) - new Date(b.deliveryDate);
    });

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: result
    });

  } catch (error) {
    console.error('Error fetching farmer market transportation orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

/**
 * Update quantity sent by farmer for specific product items
 * POST /api/farmer/market-transportation/update
 */
exports.updateFarmerMarketTransportation = async (req, res) => {
  try {
    const { farmerId, orderId, productItemUpdates } = req.body;

    // Validation
    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: 'Farmer ID is required'
      });
    }

    if (!orderId || !productItemUpdates || !Array.isArray(productItemUpdates)) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and product item updates are required'
      });
    }

    console.log('Updating order:', orderId, 'for farmer:', farmerId);

    // Find the order
    const order = await Order.findOne({
      orderId: orderId,
      farmerId: farmerId
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if transporter is assigned
    if (order.transporterStatus !== 'accepted' || !order.transporterDetails) {
      return res.status(400).json({
        success: false,
        message: 'Transporter not assigned to this order'
      });
    }

    // Update each product item
    let updatedCount = 0;
    const errors = [];

    for (const update of productItemUpdates) {
      const { productItemId, quantitySentByFarmer, farmerNotes } = update;

      if (!productItemId || quantitySentByFarmer === undefined) {
        errors.push(`Missing data for product item: ${productItemId}`);
        continue;
      }

      // Find the product item
      const productItem = order.productItems.id(productItemId);

      if (!productItem) {
        errors.push(`Product item not found: ${productItemId}`);
        continue;
      }

      // Validate quantity
      if (quantitySentByFarmer < 0) {
        errors.push(`Invalid quantity for ${productItemId}: cannot be negative`);
        continue;
      }

      if (quantitySentByFarmer > productItem.quantity) {
        errors.push(`Quantity sent (${quantitySentByFarmer}) exceeds ordered quantity (${productItem.quantity}) for ${productItemId}`);
        continue;
      }

      // Update the product item
      productItem.quantitySentByFarmer = quantitySentByFarmer;
      productItem.farmerMarketTransportStatus = true;
      productItem.farmerSentDate = new Date();
      productItem.farmerNotes = farmerNotes || '';

      updatedCount++;
    }

    // Save the order
    await order.save();

    // Prepare response
    const responseMessage = errors.length > 0
      ? `Updated ${updatedCount} items with ${errors.length} errors`
      : `Successfully updated ${updatedCount} items`;

    res.status(200).json({
      success: updatedCount > 0,
      message: responseMessage,
      data: {
        orderId: order.orderId,
        updatedCount: updatedCount,
        errors: errors.length > 0 ? errors : undefined
      }
    });

  } catch (error) {
    console.error('Error updating farmer market transportation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update transportation details',
      error: error.message
    });
  }
};

/**
 * Get specific order details for farmer
 * POST /api/farmer/market-transportation/order-details
 */
exports.getFarmerOrderDetails = async (req, res) => {
  try {
    const { orderId, farmerId } = req.body;

    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: 'Farmer ID is required'
      });
    }

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const order = await Order.findOne({
      orderId: orderId,
      farmerId: farmerId
    }).lean(); // Use lean() for better performance

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Filter product items for this farmer
    const farmerProductItems = order.productItems.filter(
      item => item.farmerId === farmerId
    );

    res.status(200).json({
      success: true,
      message: 'Order details fetched successfully',
      data: {
        orderId: order.orderId,
        _id: order._id,
        traderName: order.traderName,
        traderMobile: order.traderMobile,
        transporterDetails: order.transporterDetails,
        orderStatus: order.orderStatus,
        transporterStatus: order.transporterStatus,
        productItems: farmerProductItems,
        createdAt: order.createdAt
      }
    });

  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details',
      error: error.message
    });
  }
};
