// // const Farmer = require('../models/Farmer');
// // const bcrypt = require('bcryptjs');
// // const path = require('path');
// // const Order = require('../models/order');
// // const mongoose = require('mongoose');
// // const Market = require('../models/Market');

// // // ==================== HELPER FUNCTIONS ====================

// // const generateNextId = async (role) => {
// //   const prefix = role === 'farmer' ? 'far' : 'trd';
// //   const fieldName = role === 'farmer' ? 'farmerId' : 'traderId';

// //   const allUsers = await Farmer.find({
// //     [fieldName]: new RegExp(`^${prefix}-`)
// //   }).select(fieldName);

// //   if (!allUsers || allUsers.length === 0) {
// //     return `${prefix}-01`;
// //   }

// //   const maxNumber = allUsers.reduce((max, user) => {
// //     const num = parseInt(user[fieldName].split('-')[1]);
// //     return isNaN(num) ? max : Math.max(max, num);
// //   }, 0);

// //   const nextNumber = maxNumber + 1;

// //   if (nextNumber > 50000) {
// //     throw new Error('Maximum limit of 50000 reached');
// //   }

// //   return `${prefix}-${String(nextNumber).padStart(2, '0')}`;
// // };

// // /**
// //  * Find a farmer/user by either MongoDB _id or custom farmerId/traderId string
// //  */
// // const findUserById = async (id, populateFields = false) => {
// //   let query = Farmer;

// //   const buildQuery = (q) => {
// //     if (populateFields) {
// //       return q
// //         .populate('commodities')
// //         .populate('subcategories')
// //         .populate('nearestMarkets');
// //     }
// //     return q;
// //   };

// //   // Try ObjectId first
// //   if (mongoose.Types.ObjectId.isValid(id)) {
// //     const user = await buildQuery(Farmer.findById(id));
// //     if (user) return user;
// //   }

// //   // Fallback to custom farmerId / traderId
// //   return await buildQuery(
// //     Farmer.findOne({ $or: [{ farmerId: id }, { traderId: id }] })
// //   );
// // };

// // /**
// //  * Process nearestMarkets: handles ObjectId arrays, market object arrays, and JSON strings.
// //  * Returns an array of ObjectIds or empty array.
// //  */
// // const processNearestMarkets = async (markets) => {
// //   // Parse if string
// //   if (typeof markets === 'string') {
// //     try {
// //       markets = JSON.parse(markets);
// //     } catch (e) {
// //       try {
// //         markets = JSON.parse(markets.replace(/\n/g, '').replace(/\s+/g, ' '));
// //       } catch (e2) {
// //         console.log('⚠️ Failed to parse nearestMarkets string, skipping.');
// //         return null;
// //       }
// //     }
// //   }

// //   if (!Array.isArray(markets)) return null;

// //   if (markets.length === 0) return [];

// //   const firstItem = markets[0];

// //   // If items are market objects (have marketName field)
// //   if (typeof firstItem === 'object' && firstItem !== null && firstItem.marketName) {
// //     const marketIds = [];

// //     for (const m of markets) {
// //       // Skip empty market objects
// //       if (!m.marketName || m.marketName.trim() === '') continue;

// //       try {
// //         let market = await Market.findOne({
// //           marketName: m.marketName.trim(),
// //           district: m.district || ''
// //         });

// //         if (!market) {
// //           market = await new Market({
// //             marketName: m.marketName.trim(),
// //             place: m.place || '',
// //             district: m.district || '',
// //             state: m.state || '',
// //             pincode: m.pincode || '',
// //             isActive: true
// //           }).save();
// //           console.log(`✅ Created new market: ${m.marketName}`);
// //         }

// //         marketIds.push(market._id);
// //       } catch (e) {
// //         console.log(`⚠️ Skipping market "${m.marketName}" due to error:`, e.message);
// //       }
// //     }

// //     return marketIds; // Could be empty if all were blank
// //   }

// //   // Otherwise assume they're already ObjectId strings
// //   return markets.filter(m => mongoose.Types.ObjectId.isValid(m));
// // };

// // /**
// //  * Build a safe $set update object from flat/nested request body fields.
// //  * Handles nested objects using dot notation to avoid overwriting entire subdocs.
// //  */
// // const buildUpdateObj = (updateData, nestedKeys = ['personalInfo', 'bankDetails', 'farmLocation', 'farmLand']) => {
// //   const updateObj = {};

// //   const addNested = (prefix, data) => {
// //     if (!data || typeof data !== 'object' || Array.isArray(data)) return;
// //     Object.keys(data).forEach(key => {
// //       if (data[key] !== undefined && data[key] !== null) {
// //         updateObj[`${prefix}.${key}`] = data[key];
// //       }
// //     });
// //   };

// //   nestedKeys.forEach(key => {
// //     if (updateData[key]) {
// //       addNested(key, updateData[key]);
// //       delete updateData[key];
// //     }
// //   });

// //   return updateObj;
// // };

// // // ==================== FARMER CRUD ====================

// // exports.registerFarmer = async (req, res) => {
// //   try {
// //     const {
// //       personalInfo,
// //       farmLocation,
// //       farmLand,
// //       commodities,
// //       nearestMarkets,
// //       bankDetails,
// //       security,
// //       role
// //     } = req.body;

// //     if (!role || !['farmer', 'trader'].includes(role)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Invalid role. Role must be either "farmer" or "trader"'
// //       });
// //     }

// //     const parsedPersonalInfo = JSON.parse(personalInfo);
// //     const parsedFarmLocation = JSON.parse(farmLocation);
// //     const parsedFarmLand = JSON.parse(farmLand);
// //     const parsedCommodities = JSON.parse(commodities);
// //     const parsedBankDetails = JSON.parse(bankDetails);
// //     const parsedSecurity = JSON.parse(security);
// //     const parsedSubcategories = JSON.parse(req.body.subcategories || '[]');
// //     const parsedNearestMarkets = JSON.parse(nearestMarkets);

// //     const existingFarmer = await Farmer.findOne({
// //       'personalInfo.mobileNo': parsedPersonalInfo.mobileNo
// //     });

// //     if (existingFarmer) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Farmer with this mobile number already exists'
// //       });
// //     }

// //     const farmerId = await generateNextId(role);

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedMpin = await bcrypt.hash(parsedSecurity.mpin, salt);
// //     const hashedPassword = await bcrypt.hash(parsedSecurity.password, salt);

// //     const documents = {};
// //     if (req.files) {
// //       if (req.files.panCard)     documents.panCard     = `/uploads/${req.files.panCard[0].filename}`;
// //       if (req.files.aadharFront) documents.aadharFront = `/uploads/${req.files.aadharFront[0].filename}`;
// //       if (req.files.aadharBack)  documents.aadharBack  = `/uploads/${req.files.aadharBack[0].filename}`;

// //       if (role === 'farmer') {
// //         if (req.files.bankPassbook) documents.bankPassbook = `/uploads/${req.files.bankPassbook[0].filename}`;
// //       } else if (role === 'trader') {
// //         if (req.files.businessLicense)  documents.businessLicense  = `/uploads/${req.files.businessLicense[0].filename}`;
// //         if (req.files.photo)            documents.photo            = `/uploads/${req.files.photo[0].filename}`;
// //         if (req.files.businessNameBoard) documents.businessNameBoard = `/uploads/${req.files.businessNameBoard[0].filename}`;
// //       }
// //     }

// //     const newFarmer = new Farmer({
// //       [role === 'farmer' ? 'farmerId' : 'traderId']: farmerId,
// //       personalInfo: parsedPersonalInfo,
// //       farmLocation: parsedFarmLocation,
// //       farmLand: parsedFarmLand,
// //       role,
// //       commodities: parsedCommodities,
// //       subcategories: parsedSubcategories,
// //       nearestMarkets: parsedNearestMarkets,
// //       bankDetails: parsedBankDetails,
// //       documents,
// //       security: {
// //         referralCode: parsedSecurity.referralCode,
// //         mpin: hashedMpin,
// //         password: hashedPassword
// //       },
// //       registrationStatus: 'pending',
// //       isActive: false
// //     });

// //     await newFarmer.save();

// //     res.status(201).json({
// //       success: true,
// //       message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
// //       data: {
// //         id: newFarmer._id,
// //         farmerId: newFarmer.farmerId,
// //         name: newFarmer.personalInfo.name,
// //         mobileNo: newFarmer.personalInfo.mobileNo,
// //         role: newFarmer.role
// //       }
// //     });

// //   } catch (error) {
// //     console.error('Error in registerFarmer:', error);

// //     if (error.code === 11000) {
// //       return res.status(409).json({
// //         success: false,
// //         message: 'Registration conflict detected. Please try again.'
// //       });
// //     }

// //     res.status(500).json({
// //       success: false,
// //       message: error.message || 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // /**
// //  * GET /farmers/:id
// //  * Supports both MongoDB ObjectId and custom farmerId like "far-31"
// //  */
// // exports.getFarmerById = async (req, res) => {
// //   try {
// //     const farmer = await findUserById(req.params.id, true);

// //     if (!farmer) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Farmer not found'
// //       });
// //     }

// //     const farmerData = farmer.toObject();
// //     if (farmerData.security) delete farmerData.security.mpin;

// //     res.status(200).json({
// //       success: true,
// //       data: farmerData
// //     });
// //   } catch (error) {
// //     console.error('Error in getFarmerById:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.getAllFarmers = async (req, res) => {
// //   try {
// //     const { traderId, role } = req.query;

// //     const filter = {};
// //     if (traderId) filter.traderId = traderId;
// //     if (role) filter.role = role;

// //     const farmers = await Farmer.find(filter)
// //       .select('-security.mpin -security.password');

// //     res.status(200).json({
// //       success: true,
// //       data: farmers
// //     });
// //   } catch (error) {
// //     console.error('Error in getAllFarmers:', error);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // };

// // /**
// //  * PUT /farmers/:id
// //  * Supports both MongoDB ObjectId and custom farmerId like "far-31"
// //  * Handles nested fields safely and nearestMarkets conversion
// //  */
// // exports.updateFarmer = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const updateData = { ...req.body };

// //     // Find farmer by ObjectId or farmerId string
// //     const farmer = await findUserById(id);
// //     if (!farmer) {
// //       return res.status(404).json({ success: false, message: 'Farmer not found' });
// //     }

// //     // Build dot-notation update object for nested fields
// //     const updateObj = buildUpdateObj(updateData, ['personalInfo', 'bankDetails', 'farmLocation', 'farmLand']);

// //     // Handle nearestMarkets safely
// //     if (updateData.nearestMarkets !== undefined) {
// //       const marketIds = await processNearestMarkets(updateData.nearestMarkets);
// //       if (marketIds !== null) {
// //         updateObj.nearestMarkets = marketIds;
// //       }
// //       delete updateData.nearestMarkets;
// //     }

// //     // Handle file uploads (farmer-specific documents)
// //     if (req.files) {
// //       if (req.files.panCard)      updateObj['documents.panCard']      = `/uploads/${req.files.panCard[0].filename}`;
// //       if (req.files.aadharFront)  updateObj['documents.aadharFront']  = `/uploads/${req.files.aadharFront[0].filename}`;
// //       if (req.files.aadharBack)   updateObj['documents.aadharBack']   = `/uploads/${req.files.aadharBack[0].filename}`;
// //       if (req.files.bankPassbook) updateObj['documents.bankPassbook'] = `/uploads/${req.files.bankPassbook[0].filename}`;
// //     }

// //     // Block protected fields, add remaining safe fields
// //     const blocked = ['_id', 'farmerId', 'traderId', 'security', 'registeredAt', 'role', '__v'];
// //     Object.keys(updateData).forEach(key => {
// //       if (!blocked.includes(key) && updateData[key] != null) {
// //         updateObj[key] = updateData[key];
// //       }
// //     });

// //     if (!Object.keys(updateObj).length) {
// //       return res.status(400).json({ success: false, message: 'No valid updates provided' });
// //     }

// //     const updatedFarmer = await Farmer.findByIdAndUpdate(
// //       farmer._id,
// //       { $set: updateObj },
// //       { new: true, runValidators: true }
// //     )
// //     .populate('commodities')
// //     .populate('subcategories')
// //     .populate('nearestMarkets')
// //     .select('-security');

// //     if (!updatedFarmer) {
// //       return res.status(404).json({ success: false, message: 'Update failed' });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: 'Farmer updated successfully',
// //       data: updatedFarmer
// //     });

// //   } catch (error) {
// //     console.error('Error updating farmer:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.deleteFarmer = async (req, res) => {
// //   try {
// //     // Support both ObjectId and farmerId string
// //     const farmer = await findUserById(req.params.id);
// //     if (!farmer) {
// //       return res.status(404).json({ success: false, message: 'Farmer not found' });
// //     }

// //     await Farmer.findByIdAndUpdate(farmer._id, { isActive: false }, { new: true });

// //     res.status(200).json({
// //       success: true,
// //       message: 'Farmer deactivated successfully'
// //     });
// //   } catch (error) {
// //     console.error('Error in deleteFarmer:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.permanentlyDeleteFarmer = async (req, res) => {
// //   try {
// //     // Support both ObjectId and farmerId string
// //     const farmer = await findUserById(req.params.id);
// //     if (!farmer) {
// //       return res.status(404).json({ success: false, message: 'Farmer not found' });
// //     }

// //     await Farmer.findByIdAndDelete(farmer._id);

// //     res.status(200).json({
// //       success: true,
// //       message: 'Farmer permanently deleted successfully'
// //     });
// //   } catch (error) {
// //     console.error('Error in permanentlyDeleteFarmer:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.searchFarmers = async (req, res) => {
// //   try {
// //     const { query, state, district, commodity } = req.query;
// //     const searchCriteria = { isActive: true };

// //     if (query) {
// //       searchCriteria.$or = [
// //         { 'personalInfo.name': { $regex: query, $options: 'i' } },
// //         { 'personalInfo.mobileNo': { $regex: query, $options: 'i' } },
// //         { 'personalInfo.villageGramaPanchayat': { $regex: query, $options: 'i' } }
// //       ];
// //     }

// //     if (state)     searchCriteria['personalInfo.state']    = state;
// //     if (district)  searchCriteria['personalInfo.district'] = district;
// //     if (commodity) searchCriteria.commodities              = commodity;

// //     const farmers = await Farmer.find(searchCriteria)
// //       .populate('commodities')
// //       .select('-security.mpin')
// //       .sort({ registeredAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: farmers.length,
// //       data: farmers
// //     });
// //   } catch (error) {
// //     console.error('Error in searchFarmers:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.verifyMpin = async (req, res) => {
// //   try {
// //     const { mobileNo, mpin } = req.body;

// //     if (!mobileNo || !mpin) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Mobile number and MPIN are required'
// //       });
// //     }

// //     const farmer = await Farmer.findOne({
// //       'personalInfo.mobileNo': mobileNo,
// //       isActive: true
// //     });

// //     if (!farmer) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Farmer not found'
// //       });
// //     }

// //     const isMatch = await bcrypt.compare(mpin, farmer.security.mpin);

// //     if (!isMatch) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Invalid MPIN'
// //       });
// //     }

// //     const farmerData = farmer.toObject();
// //     delete farmerData.security.mpin;

// //     res.status(200).json({
// //       success: true,
// //       message: 'MPIN verified successfully',
// //       data: farmerData
// //     });
// //   } catch (error) {
// //     console.error('Error in verifyMpin:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.getFarmerStats = async (req, res) => {
// //   try {
// //     const totalFarmers = await Farmer.countDocuments({ isActive: true });

// //     const totalLand = await Farmer.aggregate([
// //       { $match: { isActive: true } },
// //       {
// //         $group: {
// //           _id: null,
// //           totalLand: { $sum: '$farmLand.total' },
// //           totalCultivated: { $sum: '$farmLand.cultivated' },
// //           totalUncultivated: { $sum: '$farmLand.uncultivated' }
// //         }
// //       }
// //     ]);

// //     const farmersByState = await Farmer.aggregate([
// //       { $match: { isActive: true } },
// //       { $group: { _id: '$personalInfo.state', count: { $sum: 1 } } },
// //       { $sort: { count: -1 } }
// //     ]);

// //     const farmersByCommodity = await Farmer.aggregate([
// //       { $match: { isActive: true } },
// //       { $unwind: '$commodities' },
// //       { $group: { _id: '$commodities', count: { $sum: 1 } } },
// //       { $sort: { count: -1 } },
// //       {
// //         $lookup: {
// //           from: 'categories',
// //           localField: '_id',
// //           foreignField: '_id',
// //           as: 'category'
// //         }
// //       },
// //       { $unwind: '$category' },
// //       { $project: { _id: 1, categoryName: '$category.name', count: 1 } }
// //     ]);

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         totalFarmers,
// //         landStats: totalLand[0] || { totalLand: 0, totalCultivated: 0, totalUncultivated: 0 },
// //         farmersByState,
// //         farmersByCommodity
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Error in getFarmerStats:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== FARMER MARKET TRANSPORTATION ====================

// // exports.getFarmerMarketTransportationOrders = async (req, res) => {
// //   try {
// //     const { farmerId } = req.body;

// //     if (!farmerId) {
// //       return res.status(400).json({ success: false, message: 'Farmer ID is required' });
// //     }

// //     const orders = await Order.find({
// //       farmerId,
// //       transporterStatus: 'accepted',
// //       'transporterDetails.transporterId': { $exists: true }
// //     }).sort({ 'productItems.deliveryDate': 1 });

// //     if (!orders || orders.length === 0) {
// //       return res.status(200).json({
// //         success: true,
// //         message: 'No orders with assigned transporters found',
// //         data: []
// //       });
// //     }

// //     const groupedOrders = {};

// //     orders.forEach(order => {
// //       order.productItems.forEach(item => {
// //         if (item.farmerId === farmerId) {
// //           const deliveryDate = item.deliveryDate
// //             ? new Date(item.deliveryDate).toISOString().split('T')[0]
// //             : 'No Date';

// //           if (!groupedOrders[deliveryDate]) {
// //             groupedOrders[deliveryDate] = { deliveryDate, orders: [] };
// //           }

// //           let existingOrder = groupedOrders[deliveryDate].orders.find(
// //             o => o.orderId === order.orderId
// //           );

// //           if (!existingOrder) {
// //             existingOrder = {
// //               orderId: order.orderId,
// //               _id: order._id,
// //               traderName: order.traderName,
// //               traderMobile: order.traderMobile,
// //               transporterDetails: order.transporterDetails,
// //               orderStatus: order.orderStatus,
// //               transporterStatus: order.transporterStatus,
// //               createdAt: order.createdAt,
// //               productItems: []
// //             };
// //             groupedOrders[deliveryDate].orders.push(existingOrder);
// //           }

// //           existingOrder.productItems.push({
// //             _id: item._id,
// //             productId: item.productId,
// //             grade: item.grade,
// //             quantity: item.quantity,
// //             quantitySentByFarmer: item.quantitySentByFarmer || 0,
// //             farmerMarketTransportStatus: item.farmerMarketTransportStatus || false,
// //             farmerSentDate: item.farmerSentDate,
// //             farmerNotes: item.farmerNotes,
// //             pricePerUnit: item.pricePerUnit,
// //             totalAmount: item.totalAmount,
// //             nearestMarket: item.nearestMarket,
// //             deliveryDate: item.deliveryDate
// //           });
// //         }
// //       });
// //     });

// //     const result = Object.values(groupedOrders).sort((a, b) => {
// //       if (a.deliveryDate === 'No Date') return 1;
// //       if (b.deliveryDate === 'No Date') return -1;
// //       return new Date(a.deliveryDate) - new Date(b.deliveryDate);
// //     });

// //     res.status(200).json({
// //       success: true,
// //       message: 'Orders fetched successfully',
// //       data: result
// //     });

// //   } catch (error) {
// //     console.error('Error fetching farmer market transportation orders:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch orders',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.updateFarmerMarketTransportation = async (req, res) => {
// //   try {
// //     const { farmerId, orderId, productItemUpdates } = req.body;

// //     if (!farmerId) {
// //       return res.status(400).json({ success: false, message: 'Farmer ID is required' });
// //     }

// //     if (!orderId || !productItemUpdates || !Array.isArray(productItemUpdates)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Order ID and product item updates are required'
// //       });
// //     }

// //     const order = await Order.findOne({ orderId, farmerId });

// //     if (!order) {
// //       return res.status(404).json({ success: false, message: 'Order not found' });
// //     }

// //     if (order.transporterStatus !== 'accepted' || !order.transporterDetails) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Transporter not assigned to this order'
// //       });
// //     }

// //     let updatedCount = 0;
// //     const errors = [];

// //     for (const update of productItemUpdates) {
// //       const { productItemId, quantitySentByFarmer, farmerNotes } = update;

// //       if (!productItemId || quantitySentByFarmer === undefined) {
// //         errors.push(`Missing data for product item: ${productItemId}`);
// //         continue;
// //       }

// //       const productItem = order.productItems.id(productItemId);

// //       if (!productItem) {
// //         errors.push(`Product item not found: ${productItemId}`);
// //         continue;
// //       }

// //       if (quantitySentByFarmer < 0) {
// //         errors.push(`Invalid quantity for ${productItemId}: cannot be negative`);
// //         continue;
// //       }

// //       if (quantitySentByFarmer > productItem.quantity) {
// //         errors.push(`Quantity sent (${quantitySentByFarmer}) exceeds ordered quantity (${productItem.quantity}) for ${productItemId}`);
// //         continue;
// //       }

// //       productItem.quantitySentByFarmer = quantitySentByFarmer;
// //       productItem.farmerMarketTransportStatus = true;
// //       productItem.farmerSentDate = new Date();
// //       productItem.farmerNotes = farmerNotes || '';

// //       updatedCount++;
// //     }

// //     await order.save();

// //     res.status(200).json({
// //       success: updatedCount > 0,
// //       message: errors.length > 0
// //         ? `Updated ${updatedCount} items with ${errors.length} errors`
// //         : `Successfully updated ${updatedCount} items`,
// //       data: {
// //         orderId: order.orderId,
// //         updatedCount,
// //         errors: errors.length > 0 ? errors : undefined
// //       }
// //     });

// //   } catch (error) {
// //     console.error('Error updating farmer market transportation:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update transportation details',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.getFarmerOrderDetails = async (req, res) => {
// //   try {
// //     const { orderId, farmerId } = req.body;

// //     if (!farmerId) return res.status(400).json({ success: false, message: 'Farmer ID is required' });
// //     if (!orderId)  return res.status(400).json({ success: false, message: 'Order ID is required' });

// //     const order = await Order.findOne({ orderId, farmerId });

// //     if (!order) {
// //       return res.status(404).json({ success: false, message: 'Order not found' });
// //     }

// //     const farmerProductItems = order.productItems.filter(item => item.farmerId === farmerId);

// //     res.status(200).json({
// //       success: true,
// //       message: 'Order details fetched successfully',
// //       data: {
// //         orderId: order.orderId,
// //         _id: order._id,
// //         traderName: order.traderName,
// //         traderMobile: order.traderMobile,
// //         transporterDetails: order.transporterDetails,
// //         orderStatus: order.orderStatus,
// //         transporterStatus: order.transporterStatus,
// //         productItems: farmerProductItems,
// //         createdAt: order.createdAt
// //       }
// //     });

// //   } catch (error) {
// //     console.error('Error fetching order details:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch order details',
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== TRADER PROFILE FUNCTIONS ====================

// // exports.getTraderProfile = async (req, res) => {
// //   try {
// //     const { traderId } = req.params;

// //     const trader = await Farmer.findOne({
// //       $or: [
// //         { traderId },
// //         { farmerId: traderId, role: 'trader' }
// //       ]
// //     })
// //     .populate('commodities')
// //     .populate('subcategories')
// //     .populate('nearestMarkets');

// //     if (!trader) {
// //       return res.status(404).json({ success: false, message: 'Trader not found' });
// //     }

// //     const traderData = trader.toObject();
// //     delete traderData.security;
// //     delete traderData.__v;

// //     res.status(200).json({ success: true, data: traderData });
// //   } catch (error) {
// //     console.error('Error in getTraderProfile:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.getUserProfile = async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const { type = 'id' } = req.query;

// //     let query = {};

// //     if (type === 'trader') {
// //       query = { $or: [{ traderId: userId }, { farmerId: userId, role: 'trader' }] };
// //     } else if (type === 'farmer') {
// //       query = { $or: [{ farmerId: userId }, { traderId: userId, role: 'farmer' }] };
// //     } else {
// //       query = mongoose.Types.ObjectId.isValid(userId)
// //         ? { _id: userId }
// //         : { $or: [{ farmerId: userId }, { traderId: userId }] };
// //     }

// //     const user = await Farmer.findOne(query)
// //       .populate('commodities')
// //       .populate('subcategories')
// //       .populate('nearestMarkets');

// //     if (!user) {
// //       return res.status(404).json({ success: false, message: 'User not found' });
// //     }

// //     const userData = user.toObject();
// //     delete userData.security;
// //     delete userData.__v;

// //     res.status(200).json({ success: true, data: userData });
// //   } catch (error) {
// //     console.error('Error in getUserProfile:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.getProfileById = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const user = await findUserById(id, true);

// //     if (!user) {
// //       return res.status(404).json({ success: false, message: 'User not found' });
// //     }

// //     const userData = user.toObject();
// //     delete userData.security;
// //     delete userData.__v;

// //     res.status(200).json({ success: true, data: userData });
// //   } catch (error) {
// //     console.error('Error in getProfileById:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // exports.updateTraderProfile = async (req, res) => {
// //   try {
// //     const { traderId } = req.params;
// //     const updateData = { ...req.body };

// //     const trader = await Farmer.findOne({
// //       $or: [{ traderId }, { farmerId: traderId }]
// //     });

// //     if (!trader) {
// //       return res.status(404).json({ success: false, message: 'Trader not found' });
// //     }

// //     // Build dot-notation update object for nested fields
// //     const updateObj = buildUpdateObj(updateData, ['personalInfo', 'bankDetails', 'farmLocation', 'farmLand']);

// //     // Handle nearestMarkets safely
// //     if (updateData.nearestMarkets !== undefined) {
// //       const marketIds = await processNearestMarkets(updateData.nearestMarkets);
// //       if (marketIds !== null) {
// //         updateObj.nearestMarkets = marketIds;
// //       }
// //       delete updateData.nearestMarkets;
// //     }

// //     // Handle file uploads (trader-specific documents)
// //     if (req.files) {
// //       if (req.files.panCard)          updateObj['documents.panCard']          = `/uploads/${req.files.panCard[0].filename}`;
// //       if (req.files.aadharFront)      updateObj['documents.aadharFront']      = `/uploads/${req.files.aadharFront[0].filename}`;
// //       if (req.files.aadharBack)       updateObj['documents.aadharBack']       = `/uploads/${req.files.aadharBack[0].filename}`;
// //       if (req.files.businessLicense)  updateObj['documents.businessLicense']  = `/uploads/${req.files.businessLicense[0].filename}`;
// //       if (req.files.photo)            updateObj['documents.photo']            = `/uploads/${req.files.photo[0].filename}`;
// //       if (req.files.businessNameBoard) updateObj['documents.businessNameBoard'] = `/uploads/${req.files.businessNameBoard[0].filename}`;
// //     }

// //     // Block protected fields, add remaining safe fields
// //     const blocked = ['_id', 'security', 'registeredAt', 'farmerId', 'traderId', 'role', '__v'];
// //     Object.keys(updateData).forEach(key => {
// //       if (!blocked.includes(key) && updateData[key] != null) {
// //         updateObj[key] = updateData[key];
// //       }
// //     });

// //     if (!Object.keys(updateObj).length) {
// //       return res.status(400).json({ success: false, message: 'No valid updates provided' });
// //     }

// //     const updatedTrader = await Farmer.findByIdAndUpdate(
// //       trader._id,
// //       { $set: updateObj },
// //       { new: true, runValidators: true }
// //     )
// //     .populate('commodities')
// //     .populate('subcategories')
// //     .populate('nearestMarkets')
// //     .select('-security');

// //     if (!updatedTrader) {
// //       return res.status(404).json({ success: false, message: 'Update failed' });
// //     }

// //     const traderData = updatedTrader.toObject();
// //     delete traderData.security;
// //     delete traderData.__v;

// //     res.status(200).json({
// //       success: true,
// //       message: 'Trader profile updated successfully',
// //       data: traderData
// //     });
// //   } catch (error) {
// //     console.error('❌ Error in updateTraderProfile:', error);

// //     if (error.name === 'CastError') {
// //       console.error('🔴 CastError details:', {
// //         path: error.path,
// //         value: error.value,
// //         message: error.message
// //       });
// //     }

// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update trader profile',
// //       error: error.message,
// //       errorType: error.name,
// //       ...(error.name === 'CastError' && {
// //         errorDetails: { path: error.path, value: error.value }
// //       })
// //     });
// //   }
// // };















// //updated by sagar
// // backend/controllers/farmerController.js

// const Farmer = require('../models/Farmer');
// const bcrypt = require('bcryptjs');
// const path = require('path');
// const Order = require('../models/order');
// const mongoose = require('mongoose');
// const Market = require('../models/Market');

// // ==================== HELPER FUNCTIONS ====================

// const generateNextId = async (role) => {
//   const prefix = role === 'farmer' ? 'far' : 'trd';
//   const fieldName = role === 'farmer' ? 'farmerId' : 'traderId';

//   const allUsers = await Farmer.find({
//     [fieldName]: new RegExp(`^${prefix}-`)
//   }).select(fieldName);

//   if (!allUsers || allUsers.length === 0) {
//     return `${prefix}-01`;
//   }

//   const maxNumber = allUsers.reduce((max, user) => {
//     const num = parseInt(user[fieldName].split('-')[1]);
//     return isNaN(num) ? max : Math.max(max, num);
//   }, 0);

//   const nextNumber = maxNumber + 1;

//   if (nextNumber > 50000) {
//     throw new Error('Maximum limit of 50000 reached');
//   }

//   return `${prefix}-${String(nextNumber).padStart(2, '0')}`;
// };

// /**
//  * Process nearestMarkets: handles ObjectId arrays, market object arrays, and JSON strings.
//  * Returns an array of ObjectIds or empty array.
//  */
// const processNearestMarkets = async (markets) => {
//   if (typeof markets === 'string') {
//     try {
//       markets = JSON.parse(markets);
//     } catch (e) {
//       console.log('⚠️ Failed to parse nearestMarkets string, skipping.');
//       return [];
//     }
//   }

//   if (!Array.isArray(markets)) return [];

//   if (markets.length === 0) return [];

//   const firstItem = markets[0];

//   if (typeof firstItem === 'object' && firstItem !== null && firstItem.marketName) {
//     const marketIds = [];

//     for (const m of markets) {
//       if (!m.marketName || m.marketName.trim() === '') continue;

//       try {
//         let market = await Market.findOne({
//           marketName: m.marketName.trim(),
//           district: m.district || ''
//         });

//         if (!market) {
//           market = await new Market({
//             marketName: m.marketName.trim(),
//             place: m.place || '',
//             district: m.district || '',
//             state: m.state || '',
//             pincode: m.pincode || '',
//             isActive: true
//           }).save();
//           console.log(`✅ Created new market: ${m.marketName}`);
//         }

//         marketIds.push(market._id);
//       } catch (e) {
//         console.log(`⚠️ Skipping market "${m.marketName}" due to error:`, e.message);
//       }
//     }

//     return marketIds;
//   }

//   return markets.filter(m => mongoose.Types.ObjectId.isValid(m));
// };

// const processFiles = (files) => {
//   if (!files || files.length === 0) return [];
//   return files.map(file => ({
//     url: `/uploads/${file.filename}`,
//     originalName: file.originalname,
//     size: file.size,
//     mimeType: file.mimetype,
//     uploadedAt: new Date()
//   }));
// };

// // ==================== FARMER REGISTRATION ====================



// exports.registerFarmer = async (req, res) => {
//   try {
//     const {
//       personalInfo,
//       farmLocation,
//       farmLand,
//       commodities,
//       subcategories,
//       nearestMarkets,
//       bankDetails,
//       security,
//       role,
//       companyName,
//       companyType,
//       agreements
//     } = req.body;

//     // Validate role
//     if (!role || !['farmer', 'trader'].includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid role. Role must be "farmer" or "trader"'
//       });
//     }

//     // Parse JSON fields
//     let parsedPersonalInfo, parsedFarmLocation, parsedFarmLand, parsedCommodities, 
//         parsedSubcategories, parsedNearestMarkets, parsedBankDetails, parsedSecurity;

//     try {
//       parsedPersonalInfo = typeof personalInfo === 'string' ? JSON.parse(personalInfo) : personalInfo;
//     } catch (e) {
//       return res.status(400).json({ success: false, message: 'Invalid personalInfo format' });
//     }

//     try {
//       parsedFarmLocation = typeof farmLocation === 'string' ? JSON.parse(farmLocation) : farmLocation || { latitude: '', longitude: '' };
//     } catch (e) {
//       parsedFarmLocation = { latitude: '', longitude: '' };
//     }

//     try {
//       parsedFarmLand = typeof farmLand === 'string' ? JSON.parse(farmLand) : farmLand || { total: '', cultivated: '', uncultivated: '' };
//     } catch (e) {
//       parsedFarmLand = { total: '', cultivated: '', uncultivated: '' };
//     }

//     try {
//       parsedCommodities = typeof commodities === 'string' ? JSON.parse(commodities) : commodities || [];
//     } catch (e) {
//       parsedCommodities = [];
//     }

//     try {
//       parsedSubcategories = typeof subcategories === 'string' ? JSON.parse(subcategories) : subcategories || [];
//     } catch (e) {
//       parsedSubcategories = [];
//     }

//     try {
//       parsedNearestMarkets = typeof nearestMarkets === 'string' ? JSON.parse(nearestMarkets) : nearestMarkets || [];
//     } catch (e) {
//       parsedNearestMarkets = [];
//     }

//     try {
//       parsedBankDetails = typeof bankDetails === 'string' ? JSON.parse(bankDetails) : bankDetails || {
//         accountHolderName: '', accountNumber: '', ifscCode: '', branch: '', bankName: '', upiId: ''
//       };
//     } catch (e) {
//       parsedBankDetails = { accountHolderName: '', accountNumber: '', ifscCode: '', branch: '', bankName: '', upiId: '' };
//     }

//     try {
//       parsedSecurity = typeof security === 'string' ? JSON.parse(security) : security;
//     } catch (e) {
//       return res.status(400).json({ success: false, message: 'Invalid security format' });
//     }

//     // Validate required fields
//     if (!parsedPersonalInfo.name || !parsedPersonalInfo.mobileNo) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name and mobile number are required'
//       });
//     }

//     // Check for existing user
//     const existingUser = await Farmer.findOne({
//       'personalInfo.mobileNo': parsedPersonalInfo.mobileNo
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'User with this mobile number already exists'
//       });
//     }

//     // Generate ID based on role
//     const userId = await generateNextId(role);
//     const idField = role === 'farmer' ? 'farmerId' : 'traderId';

//     // Hash passwords
//     const salt = await bcrypt.genSalt(10);
//     const hashedMpin = await bcrypt.hash(parsedSecurity.mpin, salt);
//     const hashedPassword = await bcrypt.hash(parsedSecurity.password, salt);

//     // Process nearest markets
//     const processedMarketIds = await processNearestMarkets(parsedNearestMarkets);

//     // Handle documents uploads
//     const documents = {};

//     if (req.files) {
//       if (req.files.panCard) documents.panCard = processFiles(req.files.panCard);
//       if (req.files.aadharFront) documents.aadharFront = processFiles(req.files.aadharFront);
//       if (req.files.aadharBack) documents.aadharBack = processFiles(req.files.aadharBack);

//       if (role === 'farmer') {
//         if (req.files.bankPassbook) documents.bankPassbook = processFiles(req.files.bankPassbook);
//       } else if (role === 'trader') {
//         if (req.files.businessLicense) documents.businessLicense = processFiles(req.files.businessLicense);
//         if (req.files.photo) documents.photo = processFiles(req.files.photo);
//         if (req.files.businessNameBoard) documents.businessNameBoard = processFiles(req.files.businessNameBoard);
//         if (req.files.bankPassbook) documents.bankPassbook = processFiles(req.files.bankPassbook);
//       }
//     }

//     // Build the farmer object
//     const farmerData = {
//       [idField]: userId,
//       personalInfo: {
//         name: parsedPersonalInfo.name,
//         mobileNo: parsedPersonalInfo.mobileNo,
//         email: parsedPersonalInfo.email || '',
//         address: parsedPersonalInfo.address || '',
//         villageGramaPanchayat: parsedPersonalInfo.villageGramaPanchayat || '',
//         pincode: parsedPersonalInfo.pincode || '',
//         state: parsedPersonalInfo.state || '',
//         district: parsedPersonalInfo.district || '',
//         taluk: parsedPersonalInfo.taluk || '',
//         post: parsedPersonalInfo.post || ''
//       },
//       farmLocation: {
//         latitude: parsedFarmLocation.latitude || '',
//         longitude: parsedFarmLocation.longitude || ''
//       },
//       farmLand: {
//         total: parsedFarmLand.total || 0,
//         cultivated: parsedFarmLand.cultivated || 0,
//         uncultivated: parsedFarmLand.uncultivated || 0
//       },
//       role,
//       commodities: parsedCommodities,
//       subcategories: parsedSubcategories,
//       nearestMarkets: processedMarketIds,
//       bankDetails: {
//         accountHolderName: parsedBankDetails.accountHolderName || '',
//         accountNumber: parsedBankDetails.accountNumber || '',
//         ifscCode: parsedBankDetails.ifscCode || '',
//         branch: parsedBankDetails.branch || '',
//         bankName: parsedBankDetails.bankName || '',
//         upiId: parsedBankDetails.upiId || ''
//       },
//       documents,
//       security: {
//         referralCode: parsedSecurity.referralCode || '',
//         mpin: hashedMpin,
//         password: hashedPassword
//       },
//       registrationStatus: 'pending',
//       isActive: false,
//       registeredAt: new Date()
//     };

//     // Add trader-specific fields
//     if (role === 'trader') {
//       farmerData.companyName = companyName || '';
//       farmerData.companyType = companyType || '';
//       if (agreements) {
//         try {
//           farmerData.agreements = typeof agreements === 'string' ? JSON.parse(agreements) : agreements;
//         } catch (e) {
//           farmerData.agreements = {};
//         }
//       }
//     }

//     const newFarmer = new Farmer(farmerData);
//     await newFarmer.save();

//     // Prepare response data
//     const responseData = {
//       id: newFarmer._id,
//       name: newFarmer.personalInfo.name,
//       mobileNo: newFarmer.personalInfo.mobileNo,
//       role: newFarmer.role
//     };

//     if (role === 'farmer') responseData.farmerId = newFarmer.farmerId;
//     if (role === 'trader') responseData.traderId = newFarmer.traderId;

//     res.status(201).json({
//       success: true,
//       message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
//       data: responseData
//     });

//   } catch (error) {
//     console.error('Error in registerFarmer:', error);

//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: 'Registration conflict detected. Please try again.'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: error.message || 'Internal server error'
//     });
//   }
// };
// /**
//  * GET /farmers/:id
//  * Supports both MongoDB ObjectId and custom farmerId like "far-31"
//  */
// exports.getFarmerById = async (req, res) => {
//   try {
//     const farmer = await findUserById(req.params.id, true);

//     if (!farmer) {
//       return res.status(404).json({
//         success: false,
//         message: 'Farmer not found'
//       });
//     }

//     const farmerData = farmer.toObject();
//     if (farmerData.security) delete farmerData.security.mpin;

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

// exports.getAllFarmers = async (req, res) => {
//   try {
//     const { traderId, role } = req.query;

//     const filter = {};
//     if (traderId) filter.traderId = traderId;
//     if (role) filter.role = role;

//     const farmers = await Farmer.find(filter)
//       .select('-security.mpin -security.password');

//     res.status(200).json({
//       success: true,
//       data: farmers
//     });
//   } catch (error) {
//     console.error('Error in getAllFarmers:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// /**
//  * PUT /farmers/:id
//  * Supports both MongoDB ObjectId and custom farmerId like "far-31"
//  * Handles nested fields safely and nearestMarkets conversion
//  */
// exports.updateFarmer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = { ...req.body };

//     // Find farmer by ObjectId or farmerId string
//     const farmer = await findUserById(id);
//     if (!farmer) {
//       return res.status(404).json({ success: false, message: 'Farmer not found' });
//     }

//     // Build dot-notation update object for nested fields
//     const updateObj = buildUpdateObj(updateData, ['personalInfo', 'bankDetails', 'farmLocation', 'farmLand']);

//     // Handle nearestMarkets safely
//     if (updateData.nearestMarkets !== undefined) {
//       const marketIds = await processNearestMarkets(updateData.nearestMarkets);
//       if (marketIds !== null) {
//         updateObj.nearestMarkets = marketIds;
//       }
//       delete updateData.nearestMarkets;
//     }

//     // Handle file uploads (farmer-specific documents)
//     if (req.files) {
//       if (req.files.panCard)      updateObj['documents.panCard']      = `/uploads/${req.files.panCard[0].filename}`;
//       if (req.files.aadharFront)  updateObj['documents.aadharFront']  = `/uploads/${req.files.aadharFront[0].filename}`;
//       if (req.files.aadharBack)   updateObj['documents.aadharBack']   = `/uploads/${req.files.aadharBack[0].filename}`;
//       if (req.files.bankPassbook) updateObj['documents.bankPassbook'] = `/uploads/${req.files.bankPassbook[0].filename}`;
//     }

//     // Block protected fields, add remaining safe fields
//     const blocked = ['_id', 'farmerId', 'traderId', 'security', 'registeredAt', 'role', '__v'];
//     Object.keys(updateData).forEach(key => {
//       if (!blocked.includes(key) && updateData[key] != null) {
//         updateObj[key] = updateData[key];
//       }
//     });

//     if (!Object.keys(updateObj).length) {
//       return res.status(400).json({ success: false, message: 'No valid updates provided' });
//     }

//     const updatedFarmer = await Farmer.findByIdAndUpdate(
//       farmer._id,
//       { $set: updateObj },
//       { new: true, runValidators: true }
//     )
//     .populate('commodities')
//     .populate('subcategories')
//     .populate('nearestMarkets')
//     .select('-security');

//     if (!updatedFarmer) {
//       return res.status(404).json({ success: false, message: 'Update failed' });
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

// exports.deleteFarmer = async (req, res) => {
//   try {
//     // Support both ObjectId and farmerId string
//     const farmer = await findUserById(req.params.id);
//     if (!farmer) {
//       return res.status(404).json({ success: false, message: 'Farmer not found' });
//     }

//     await Farmer.findByIdAndUpdate(farmer._id, { isActive: false }, { new: true });

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

// exports.permanentlyDeleteFarmer = async (req, res) => {
//   try {
//     // Support both ObjectId and farmerId string
//     const farmer = await findUserById(req.params.id);
//     if (!farmer) {
//       return res.status(404).json({ success: false, message: 'Farmer not found' });
//     }

//     await Farmer.findByIdAndDelete(farmer._id);

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

// exports.searchFarmers = async (req, res) => {
//   try {
//     const { query, state, district, commodity } = req.query;
//     const searchCriteria = { isActive: true };

//     if (query) {
//       searchCriteria.$or = [
//         { 'personalInfo.name': { $regex: query, $options: 'i' } },
//         { 'personalInfo.mobileNo': { $regex: query, $options: 'i' } },
//         { 'personalInfo.villageGramaPanchayat': { $regex: query, $options: 'i' } }
//       ];
//     }

//     if (state)     searchCriteria['personalInfo.state']    = state;
//     if (district)  searchCriteria['personalInfo.district'] = district;
//     if (commodity) searchCriteria.commodities              = commodity;

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
//       { $group: { _id: '$personalInfo.state', count: { $sum: 1 } } },
//       { $sort: { count: -1 } }
//     ]);

//     const farmersByCommodity = await Farmer.aggregate([
//       { $match: { isActive: true } },
//       { $unwind: '$commodities' },
//       { $group: { _id: '$commodities', count: { $sum: 1 } } },
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
//       { $project: { _id: 1, categoryName: '$category.name', count: 1 } }
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

// // ==================== FARMER MARKET TRANSPORTATION ====================

// exports.getFarmerMarketTransportationOrders = async (req, res) => {
//   try {
//     const { farmerId } = req.body;

//     if (!farmerId) {
//       return res.status(400).json({ success: false, message: 'Farmer ID is required' });
//     }

//     const orders = await Order.find({
//       farmerId,
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

//     const groupedOrders = {};

//     orders.forEach(order => {
//       order.productItems.forEach(item => {
//         if (item.farmerId === farmerId) {
//           const deliveryDate = item.deliveryDate
//             ? new Date(item.deliveryDate).toISOString().split('T')[0]
//             : 'No Date';

//           if (!groupedOrders[deliveryDate]) {
//             groupedOrders[deliveryDate] = { deliveryDate, orders: [] };
//           }

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

// exports.updateFarmerMarketTransportation = async (req, res) => {
//   try {
//     const { farmerId, orderId, productItemUpdates } = req.body;

//     if (!farmerId) {
//       return res.status(400).json({ success: false, message: 'Farmer ID is required' });
//     }

//     if (!orderId || !productItemUpdates || !Array.isArray(productItemUpdates)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Order ID and product item updates are required'
//       });
//     }

//     const order = await Order.findOne({ orderId, farmerId });

//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     if (order.transporterStatus !== 'accepted' || !order.transporterDetails) {
//       return res.status(400).json({
//         success: false,
//         message: 'Transporter not assigned to this order'
//       });
//     }

//     let updatedCount = 0;
//     const errors = [];

//     for (const update of productItemUpdates) {
//       const { productItemId, quantitySentByFarmer, farmerNotes } = update;

//       if (!productItemId || quantitySentByFarmer === undefined) {
//         errors.push(`Missing data for product item: ${productItemId}`);
//         continue;
//       }

//       const productItem = order.productItems.id(productItemId);

//       if (!productItem) {
//         errors.push(`Product item not found: ${productItemId}`);
//         continue;
//       }

//       if (quantitySentByFarmer < 0) {
//         errors.push(`Invalid quantity for ${productItemId}: cannot be negative`);
//         continue;
//       }

//       if (quantitySentByFarmer > productItem.quantity) {
//         errors.push(`Quantity sent (${quantitySentByFarmer}) exceeds ordered quantity (${productItem.quantity}) for ${productItemId}`);
//         continue;
//       }

//       productItem.quantitySentByFarmer = quantitySentByFarmer;
//       productItem.farmerMarketTransportStatus = true;
//       productItem.farmerSentDate = new Date();
//       productItem.farmerNotes = farmerNotes || '';

//       updatedCount++;
//     }

//     await order.save();

//     res.status(200).json({
//       success: updatedCount > 0,
//       message: errors.length > 0
//         ? `Updated ${updatedCount} items with ${errors.length} errors`
//         : `Successfully updated ${updatedCount} items`,
//       data: {
//         orderId: order.orderId,
//         updatedCount,
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

// exports.getFarmerOrderDetails = async (req, res) => {
//   try {
//     const { orderId, farmerId } = req.body;

//     if (!farmerId) return res.status(400).json({ success: false, message: 'Farmer ID is required' });
//     if (!orderId)  return res.status(400).json({ success: false, message: 'Order ID is required' });

//     const order = await Order.findOne({ orderId, farmerId });

//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     const farmerProductItems = order.productItems.filter(item => item.farmerId === farmerId);

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

// // ==================== TRADER PROFILE FUNCTIONS ====================

// exports.getTraderProfile = async (req, res) => {
//   try {
//     const { traderId } = req.params;

//     const trader = await Farmer.findOne({
//       $or: [
//         { traderId },
//         { farmerId: traderId, role: 'trader' }
//       ]
//     })
//     .populate('commodities')
//     .populate('subcategories')
//     .populate('nearestMarkets');

//     if (!trader) {
//       return res.status(404).json({ success: false, message: 'Trader not found' });
//     }

//     const traderData = trader.toObject();
//     delete traderData.security;
//     delete traderData.__v;

//     res.status(200).json({ success: true, data: traderData });
//   } catch (error) {
//     console.error('Error in getTraderProfile:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// exports.getUserProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { type = 'id' } = req.query;

//     let query = {};

//     if (type === 'trader') {
//       query = { $or: [{ traderId: userId }, { farmerId: userId, role: 'trader' }] };
//     } else if (type === 'farmer') {
//       query = { $or: [{ farmerId: userId }, { traderId: userId, role: 'farmer' }] };
//     } else {
//       query = mongoose.Types.ObjectId.isValid(userId)
//         ? { _id: userId }
//         : { $or: [{ farmerId: userId }, { traderId: userId }] };
//     }

//     const user = await Farmer.findOne(query)
//       .populate('commodities')
//       .populate('subcategories')
//       .populate('nearestMarkets');

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const userData = user.toObject();
//     delete userData.security;
//     delete userData.__v;

//     res.status(200).json({ success: true, data: userData });
//   } catch (error) {
//     console.error('Error in getUserProfile:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// exports.getProfileById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await findUserById(id, true);

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const userData = user.toObject();
//     delete userData.security;
//     delete userData.__v;

//     res.status(200).json({ success: true, data: userData });
//   } catch (error) {
//     console.error('Error in getProfileById:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// exports.updateTraderProfile = async (req, res) => {
//   try {
//     const { traderId } = req.params;
//     const updateData = { ...req.body };

//     const trader = await Farmer.findOne({
//       $or: [{ traderId }, { farmerId: traderId }]
//     });

//     if (!trader) {
//       return res.status(404).json({ success: false, message: 'Trader not found' });
//     }

//     // Build dot-notation update object for nested fields
//     const updateObj = buildUpdateObj(updateData, ['personalInfo', 'bankDetails', 'farmLocation', 'farmLand']);

//     // Handle nearestMarkets safely
//     if (updateData.nearestMarkets !== undefined) {
//       const marketIds = await processNearestMarkets(updateData.nearestMarkets);
//       if (marketIds !== null) {
//         updateObj.nearestMarkets = marketIds;
//       }
//       delete updateData.nearestMarkets;
//     }

//     // Handle file uploads (trader-specific documents)
//     if (req.files) {
//       if (req.files.panCard)          updateObj['documents.panCard']          = `/uploads/${req.files.panCard[0].filename}`;
//       if (req.files.aadharFront)      updateObj['documents.aadharFront']      = `/uploads/${req.files.aadharFront[0].filename}`;
//       if (req.files.aadharBack)       updateObj['documents.aadharBack']       = `/uploads/${req.files.aadharBack[0].filename}`;
//       if (req.files.businessLicense)  updateObj['documents.businessLicense']  = `/uploads/${req.files.businessLicense[0].filename}`;
//       if (req.files.photo)            updateObj['documents.photo']            = `/uploads/${req.files.photo[0].filename}`;
//       if (req.files.businessNameBoard) updateObj['documents.businessNameBoard'] = `/uploads/${req.files.businessNameBoard[0].filename}`;
//     }

//     // Block protected fields, add remaining safe fields
//     const blocked = ['_id', 'security', 'registeredAt', 'farmerId', 'traderId', 'role', '__v'];
//     Object.keys(updateData).forEach(key => {
//       if (!blocked.includes(key) && updateData[key] != null) {
//         updateObj[key] = updateData[key];
//       }
//     });

//     if (!Object.keys(updateObj).length) {
//       return res.status(400).json({ success: false, message: 'No valid updates provided' });
//     }

//     const updatedTrader = await Farmer.findByIdAndUpdate(
//       trader._id,
//       { $set: updateObj },
//       { new: true, runValidators: true }
//     )
//     .populate('commodities')
//     .populate('subcategories')
//     .populate('nearestMarkets')
//     .select('-security');

//     if (!updatedTrader) {
//       return res.status(404).json({ success: false, message: 'Update failed' });
//     }

//     const traderData = updatedTrader.toObject();
//     delete traderData.security;
//     delete traderData.__v;

//     res.status(200).json({
//       success: true,
//       message: 'Trader profile updated successfully',
//       data: traderData
//     });
//   } catch (error) {
//     console.error('❌ Error in updateTraderProfile:', error);

//     if (error.name === 'CastError') {
//       console.error('🔴 CastError details:', {
//         path: error.path,
//         value: error.value,
//         message: error.message
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Failed to update trader profile',
//       error: error.message,
//       errorType: error.name,
//       ...(error.name === 'CastError' && {
//         errorDetails: { path: error.path, value: error.value }
//       })
//     });
//   }
// };











//22-6-26
const Farmer = require("../models/Farmer");
const bcrypt = require("bcryptjs");
const path = require("path");
const Order = require("../models/order");
const mongoose = require("mongoose");
const Market = require("../models/Market");

// ==================== HELPER FUNCTIONS ====================

const generateNextId = async (role) => {
  const prefix = role === "farmer" ? "far" : "trd";
  const fieldName = role === "farmer" ? "farmerId" : "traderId";

  const allUsers = await Farmer.find({
    [fieldName]: new RegExp(`^${prefix}-`),
  }).select(fieldName);

  if (!allUsers || allUsers.length === 0) {
    return `${prefix}-01`;
  }

  const maxNumber = allUsers.reduce((max, user) => {
    const num = parseInt(user[fieldName].split("-")[1]);
    return isNaN(num) ? max : Math.max(max, num);
  }, 0);

  const nextNumber = maxNumber + 1;

  if (nextNumber > 50000) {
    throw new Error("Maximum limit of 50000 reached");
  }

  return `${prefix}-${String(nextNumber).padStart(2, "0")}`;
};

/**
 * Process nearestMarkets: handles ObjectId arrays, market object arrays, and JSON strings.
 * Returns an array of ObjectIds or empty array.
 */
const processNearestMarkets = async (markets) => {
  if (typeof markets === "string") {
    try {
      markets = JSON.parse(markets);
    } catch (e) {
      console.log("⚠️ Failed to parse nearestMarkets string, skipping.");
      return [];
    }
  }

  if (!Array.isArray(markets)) return [];

  if (markets.length === 0) return [];

  const firstItem = markets[0];

  if (
    typeof firstItem === "object" &&
    firstItem !== null &&
    firstItem.marketName
  ) {
    const marketIds = [];

    for (const m of markets) {
      if (!m.marketName || m.marketName.trim() === "") continue;

      try {
        let market = await Market.findOne({
          marketName: m.marketName.trim(),
          district: m.district || "",
        });

        if (!market) {
          market = await new Market({
            marketName: m.marketName.trim(),
            place: m.place || "",
            district: m.district || "",
            state: m.state || "",
            pincode: m.pincode || "",
            isActive: true,
          }).save();
          console.log(`✅ Created new market: ${m.marketName}`);
        }

        marketIds.push(market._id);
      } catch (e) {
        console.log(
          `⚠️ Skipping market "${m.marketName}" due to error:`,
          e.message,
        );
      }
    }

    return marketIds;
  }

  return markets.filter((m) => mongoose.Types.ObjectId.isValid(m));
};

const processFiles = (files) => {
  if (!files || files.length === 0) return [];
  return files.map((file) => ({
    url: `/uploads/${file.filename}`,
    originalName: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    uploadedAt: new Date(),
  }));
};

// ==================== FARMER REGISTRATION ====================

exports.registerFarmer = async (req, res) => {
  try {
    const {
      personalInfo,
      farmLocation,
      farmLand,
      commodities,
      subcategories,
      nearestMarkets,
      bankDetails,
      security,
      role,
      companyName,
      companyType,
      agreements,
    } = req.body;

    // Validate role
    if (!role || !["farmer", "trader"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Role must be "farmer" or "trader"',
      });
    }

    // Parse JSON fields
    let parsedPersonalInfo,
      parsedFarmLocation,
      parsedFarmLand,
      parsedCommodities,
      parsedSubcategories,
      parsedNearestMarkets,
      parsedBankDetails,
      parsedSecurity;

    try {
      parsedPersonalInfo =
        typeof personalInfo === "string"
          ? JSON.parse(personalInfo)
          : personalInfo;
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid personalInfo format" });
    }

    try {
      parsedFarmLocation =
        typeof farmLocation === "string"
          ? JSON.parse(farmLocation)
          : farmLocation || { latitude: "", longitude: "" };
    } catch (e) {
      parsedFarmLocation = { latitude: "", longitude: "" };
    }

    try {
      parsedFarmLand =
        typeof farmLand === "string"
          ? JSON.parse(farmLand)
          : farmLand || { total: "", cultivated: "", uncultivated: "" };
    } catch (e) {
      parsedFarmLand = { total: "", cultivated: "", uncultivated: "" };
    }

    try {
      parsedCommodities =
        typeof commodities === "string"
          ? JSON.parse(commodities)
          : commodities || [];
    } catch (e) {
      parsedCommodities = [];
    }

    try {
      parsedSubcategories =
        typeof subcategories === "string"
          ? JSON.parse(subcategories)
          : subcategories || [];
    } catch (e) {
      parsedSubcategories = [];
    }

    try {
      parsedNearestMarkets =
        typeof nearestMarkets === "string"
          ? JSON.parse(nearestMarkets)
          : nearestMarkets || [];
    } catch (e) {
      parsedNearestMarkets = [];
    }

    try {
      parsedBankDetails =
        typeof bankDetails === "string"
          ? JSON.parse(bankDetails)
          : bankDetails || {
              accountHolderName: "",
              accountNumber: "",
              ifscCode: "",
              branch: "",
              bankName: "",
              upiId: "",
            };
    } catch (e) {
      parsedBankDetails = {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        branch: "",
        bankName: "",
        upiId: "",
      };
    }

    try {
      parsedSecurity =
        typeof security === "string" ? JSON.parse(security) : security;
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid security format" });
    }

    // Validate required fields
    if (!parsedPersonalInfo.name || !parsedPersonalInfo.mobileNo) {
      return res.status(400).json({
        success: false,
        message: "Name and mobile number are required",
      });
    }

    // Check for existing user
    const existingUser = await Farmer.findOne({
      "personalInfo.mobileNo": parsedPersonalInfo.mobileNo,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this mobile number already exists",
      });
    }

    // Generate ID based on role
    const userId = await generateNextId(role);
    const idField = role === "farmer" ? "farmerId" : "traderId";

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedMpin = await bcrypt.hash(parsedSecurity.mpin, salt);
    const hashedPassword = await bcrypt.hash(parsedSecurity.password, salt);

    // Process nearest markets
    const processedMarketIds =
      await processNearestMarkets(parsedNearestMarkets);

    // Handle documents uploads
    const documents = {};

    if (req.files) {
      if (req.files.panCard)
        documents.panCard = processFiles(req.files.panCard);
      if (req.files.aadharFront)
        documents.aadharFront = processFiles(req.files.aadharFront);
      if (req.files.aadharBack)
        documents.aadharBack = processFiles(req.files.aadharBack);

      if (role === "farmer") {
        if (req.files.bankPassbook)
          documents.bankPassbook = processFiles(req.files.bankPassbook);
      } else if (role === "trader") {
        if (req.files.businessLicense)
          documents.businessLicense = processFiles(req.files.businessLicense);
        if (req.files.photo) documents.photo = processFiles(req.files.photo);
        if (req.files.businessNameBoard)
          documents.businessNameBoard = processFiles(
            req.files.businessNameBoard,
          );
        if (req.files.bankPassbook)
          documents.bankPassbook = processFiles(req.files.bankPassbook);
      }
    }

    // Build the farmer object
    const farmerData = {
      [idField]: userId,
      personalInfo: {
        name: parsedPersonalInfo.name,
        mobileNo: parsedPersonalInfo.mobileNo,
        email: parsedPersonalInfo.email || "",
        address: parsedPersonalInfo.address || "",
        villageGramaPanchayat: parsedPersonalInfo.villageGramaPanchayat || "",
        pincode: parsedPersonalInfo.pincode || "",
        state: parsedPersonalInfo.state || "",
        district: parsedPersonalInfo.district || "",
        taluk: parsedPersonalInfo.taluk || "",
        post: parsedPersonalInfo.post || "",
      },
      farmLocation: {
        latitude: parsedFarmLocation.latitude || "",
        longitude: parsedFarmLocation.longitude || "",
      },
      farmLand: {
        total: parsedFarmLand.total || 0,
        cultivated: parsedFarmLand.cultivated || 0,
        uncultivated: parsedFarmLand.uncultivated || 0,
      },
      role,
      commodities: parsedCommodities,
      subcategories: parsedSubcategories,
      nearestMarkets: processedMarketIds,
      bankDetails: {
        accountHolderName: parsedBankDetails.accountHolderName || "",
        accountNumber: parsedBankDetails.accountNumber || "",
        ifscCode: parsedBankDetails.ifscCode || "",
        branch: parsedBankDetails.branch || "",
        bankName: parsedBankDetails.bankName || "",
        upiId: parsedBankDetails.upiId || "",
      },
      documents,
      security: {
        referralCode: parsedSecurity.referralCode || "",
        mpin: hashedMpin,
        password: hashedPassword,
      },
      registrationStatus: "pending",
      isActive: false,
      registeredAt: new Date(),
    };

    // Add trader-specific fields
    if (role === "trader") {
      farmerData.companyName = companyName || "";
      farmerData.companyType = companyType || "";
      if (agreements) {
        try {
          farmerData.agreements =
            typeof agreements === "string"
              ? JSON.parse(agreements)
              : agreements;
        } catch (e) {
          farmerData.agreements = {};
        }
      }
    }

    const newFarmer = new Farmer(farmerData);
    await newFarmer.save();

    // Prepare response data
    const responseData = {
      id: newFarmer._id,
      name: newFarmer.personalInfo.name,
      mobileNo: newFarmer.personalInfo.mobileNo,
      role: newFarmer.role,
    };

    if (role === "farmer") responseData.farmerId = newFarmer.farmerId;
    if (role === "trader") responseData.traderId = newFarmer.traderId;

    res.status(201).json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      data: responseData,
    });
  } catch (error) {
    console.error("Error in registerFarmer:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Registration conflict detected. Please try again.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

/**
 * GET /farmers/:id
 * Supports both MongoDB ObjectId and custom farmerId like "far-31"
 */
exports.getAllFarmers = async (req, res) => {
  try {
    const { traderId, role } = req.query;

    const filter = {};
    if (traderId) filter.traderId = traderId;
    if (role) filter.role = role;

    const farmers = await Farmer.find(filter).select(
      "-security.mpin -security.password",
    );

    res.status(200).json({
      success: true,
      data: farmers,
    });
  } catch (error) {
    console.error("Error in getAllFarmers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== FIND USER BY ID ====================
const findUserById = async (id, populateFields = false) => {
  const buildQuery = (q) => {
    if (populateFields) {
      return q
        .populate("commodities")
        .populate("subcategories")
        .populate("nearestMarkets");
    }
    return q;
  };

  // Try ObjectId first
  if (mongoose.Types.ObjectId.isValid(id)) {
    const user = await buildQuery(Farmer.findById(id));
    if (user) return user;
  }

  // Fallback to custom farmerId or traderId
  return await buildQuery(
    Farmer.findOne({ $or: [{ farmerId: id }, { traderId: id }] }),
  );
};

// Alias for findUserById
const findById = findUserById;

const buildUpdateObj = (
  updateData,
  nestedKeys = ["personalInfo", "bankDetails", "farmLocation", "farmLand"],
) => {
  const updateObj = {};

  const addNested = (prefix, data) => {
    if (!data || typeof data !== "object" || Array.isArray(data)) return;
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
        updateObj[`${prefix}.${key}`] = data[key];
      }
    });
  };

  nestedKeys.forEach((key) => {
    if (updateData[key]) {
      addNested(key, updateData[key]);
      delete updateData[key];
    }
  });

  return updateObj;
};

// ==================== UPDATE FARMER - FIXED (APPEND INSTEAD OF REPLACE) ====================
// exports.updateFarmer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = { ...req.body };

//     console.log("📝 Update data received:", Object.keys(updateData));
//     console.log(
//       "📎 Files received:",
//       req.files ? Object.keys(req.files) : "None",
//     );

//     // Find farmer using findUserById
//     const farmer = await findUserById(id);
//     if (!farmer) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Farmer not found" });
//     }

//     // Parse string fields that should be arrays
//     if (updateData.commodities && typeof updateData.commodities === "string") {
//       try {
//         updateData.commodities = JSON.parse(updateData.commodities);
//       } catch (e) {
//         console.log("Failed to parse commodities, using empty array");
//         updateData.commodities = [];
//       }
//     }

//     if (
//       updateData.subcategories &&
//       typeof updateData.subcategories === "string"
//     ) {
//       try {
//         updateData.subcategories = JSON.parse(updateData.subcategories);
//       } catch (e) {
//         console.log("Failed to parse subcategories, using empty array");
//         updateData.subcategories = [];
//       }
//     }

//     if (
//       updateData.nearestMarkets &&
//       typeof updateData.nearestMarkets === "string"
//     ) {
//       try {
//         updateData.nearestMarkets = JSON.parse(updateData.nearestMarkets);
//       } catch (e) {
//         console.log("Failed to parse nearestMarkets, using empty array");
//         updateData.nearestMarkets = [];
//       }
//     }

//     ["personalInfo", "bankDetails", "farmLocation", "farmLand"].forEach(
//       (field) => {
//         if (updateData[field] && typeof updateData[field] === "string") {
//           try {
//             updateData[field] = JSON.parse(updateData[field]);
//           } catch (e) {
//             console.log(`Failed to parse ${field}`);
//             updateData[field] = {};
//           }
//         }
//       },
//     );

//     // Build dot-notation update object for nested fields
//     const updateObj = buildUpdateObj(updateData, [
//       "personalInfo",
//       "bankDetails",
//       "farmLocation",
//       "farmLand",
//     ]);

//     // Handle nearestMarkets
//     if (updateData.nearestMarkets !== undefined) {
//       const marketIds = await processNearestMarkets(updateData.nearestMarkets);
//       if (marketIds !== null && marketIds.length >= 0) {
//         updateObj.nearestMarkets = marketIds;
//       }
//       delete updateData.nearestMarkets;
//     }

//     // Handle commodities - ensure it's an array
//     if (updateData.commodities !== undefined) {
//       updateObj.commodities = Array.isArray(updateData.commodities)
//         ? updateData.commodities
//         : [];
//       delete updateData.commodities;
//     }

//     // Handle subcategories - ensure it's an array
//     if (updateData.subcategories !== undefined) {
//       updateObj.subcategories = Array.isArray(updateData.subcategories)
//         ? updateData.subcategories
//         : [];
//       delete updateData.subcategories;
//     }

//     // ==================== FIXED: APPEND FILES INSTEAD OF REPLACE ====================
//     if (req.files) {
//       const role = farmer.role;
//       console.log("📎 Processing file uploads for role:", role);

//       // Helper function to APPEND files to existing array
//       const appendFiles = (fieldName, targetField) => {
//         if (req.files[fieldName] && req.files[fieldName].length > 0) {
//           const processedFiles = processFiles(req.files[fieldName]);

//           // Get current files from the farmer object
//           const currentFiles = farmer.documents[fieldName] || [];

//           // APPEND new files to existing ones
//           const updatedFiles = [...currentFiles, ...processedFiles];

//           updateObj[targetField] = updatedFiles;
//           console.log(
//             `📎 Appended ${processedFiles.length} file(s) to ${fieldName}. Total: ${updatedFiles.length} files`,
//           );
//         }
//       };

//       // Append all file types
//       appendFiles("panCard", "documents.panCard");
//       appendFiles("aadharFront", "documents.aadharFront");
//       appendFiles("aadharBack", "documents.aadharBack");

//       if (role === "farmer") {
//         appendFiles("bankPassbook", "documents.bankPassbook");
//       } else if (role === "trader") {
//         appendFiles("businessLicense", "documents.businessLicense");
//         appendFiles("photo", "documents.photo");
//         appendFiles("businessNameBoard", "documents.businessNameBoard");
//         appendFiles("bankPassbook", "documents.bankPassbook");
//       }
//     }

//     // Block protected fields
//     const blocked = [
//       "_id",
//       "farmerId",
//       "traderId",
//       "security",
//       "registeredAt",
//       "role",
//       "__v",
//     ];

//     // Add remaining safe fields
//     Object.keys(updateData).forEach((key) => {
//       if (
//         !blocked.includes(key) &&
//         updateData[key] != null &&
//         updateData[key] !== ""
//       ) {
//         updateObj[key] = updateData[key];
//       }
//     });

//     // Handle agreements separately (for trader)
//     if (updateData.agreements && typeof updateData.agreements === "object") {
//       Object.keys(updateData.agreements).forEach((key) => {
//         updateObj[`agreements.${key}`] = updateData.agreements[key];
//       });
//       delete updateData.agreements;
//     }

//     // Handle company fields separately (for trader)
//     if (updateData.companyName !== undefined) {
//       updateObj.companyName = updateData.companyName;
//       delete updateData.companyName;
//     }
//     if (updateData.companyType !== undefined) {
//       updateObj.companyType = updateData.companyType;
//       delete updateData.companyType;
//     }

//     if (!Object.keys(updateObj).length) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No valid updates provided" });
//     }

//     console.log("📝 Final update object:", JSON.stringify(updateObj, null, 2));

//     const updatedFarmer = await Farmer.findByIdAndUpdate(
//       farmer._id,
//       { $set: updateObj },
//       { new: true, runValidators: true },
//     )
//       .populate("commodities")
//       .populate("subcategories")
//       .populate("nearestMarkets")
//       .select("-security.mpin -security.password");

//     if (!updatedFarmer) {
//       return res.status(404).json({ success: false, message: "Update failed" });
//     }

//     res.status(200).json({
//       success: true,
//       message: `${farmer.role.charAt(0).toUpperCase() + farmer.role.slice(1)} updated successfully`,
//       data: updatedFarmer,
//     });
//   } catch (error) {
//     console.error("❌ Error updating farmer:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };






exports.updateFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    console.log("📝 Update data received:", Object.keys(updateData));
    console.log(
      "📎 Files received:",
      req.files ? Object.keys(req.files) : "None",
    );

    // Find farmer using findUserById
    const farmer = await findUserById(id);
    if (!farmer) {
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });
    }

    // Parse string fields that should be arrays
    if (updateData.commodities && typeof updateData.commodities === "string") {
      try {
        updateData.commodities = JSON.parse(updateData.commodities);
      } catch (e) {
        console.log("Failed to parse commodities, using empty array");
        updateData.commodities = [];
      }
    }

    if (
      updateData.subcategories &&
      typeof updateData.subcategories === "string"
    ) {
      try {
        updateData.subcategories = JSON.parse(updateData.subcategories);
      } catch (e) {
        console.log("Failed to parse subcategories, using empty array");
        updateData.subcategories = [];
      }
    }

    if (
      updateData.nearestMarkets &&
      typeof updateData.nearestMarkets === "string"
    ) {
      try {
        updateData.nearestMarkets = JSON.parse(updateData.nearestMarkets);
      } catch (e) {
        console.log("Failed to parse nearestMarkets, using empty array");
        updateData.nearestMarkets = [];
      }
    }

    ["personalInfo", "bankDetails", "farmLocation", "farmLand"].forEach(
      (field) => {
        if (updateData[field] && typeof updateData[field] === "string") {
          try {
            updateData[field] = JSON.parse(updateData[field]);
          } catch (e) {
            console.log(`Failed to parse ${field}`);
            updateData[field] = {};
          }
        }
      },
    );

    // Build dot-notation update object for nested fields
    const updateObj = buildUpdateObj(updateData, [
      "personalInfo",
      "bankDetails",
      "farmLocation",
      "farmLand",
    ]);

    // Handle nearestMarkets
    if (updateData.nearestMarkets !== undefined) {
      const marketIds = await processNearestMarkets(updateData.nearestMarkets);
      if (marketIds !== null && marketIds.length >= 0) {
        updateObj.nearestMarkets = marketIds;
      }
      delete updateData.nearestMarkets;
    }

    // Handle commodities - ensure it's an array
    if (updateData.commodities !== undefined) {
      updateObj.commodities = Array.isArray(updateData.commodities)
        ? updateData.commodities
        : [];
      delete updateData.commodities;
    }

    // Handle subcategories - ensure it's an array
    if (updateData.subcategories !== undefined) {
      updateObj.subcategories = Array.isArray(updateData.subcategories)
        ? updateData.subcategories
        : [];
      delete updateData.subcategories;
    }

    
    {
      const role = farmer.role;
      console.log("📎 Processing file uploads/removals for role:", role);

      const fileFieldId = (f) => (f && f._id ? String(f._id) : f && f.url);

      const buildFinalFiles = (fieldName, targetField) => {
        const currentFiles = farmer.documents?.[fieldName] || [];

        const existingRaw = updateData[`${fieldName}_existing`];
        const removedRaw = updateData[`${fieldName}_removed`];

        let keepList = currentFiles;
        let touched = false;

        // Narrow down to only the files the client says should remain
        if (existingRaw !== undefined) {
          touched = true;
          try {
            const existingParsed =
              typeof existingRaw === "string"
                ? JSON.parse(existingRaw)
                : existingRaw;

            const keepIds = new Set(
              (existingParsed || [])
                .map((f) => f._id || f.url)
                .filter(Boolean)
                .map(String),
            );

            keepList = currentFiles.filter((f) =>
              keepIds.has(String(fileFieldId(f))),
            );
          } catch (e) {
            console.log(`Failed to parse ${fieldName}_existing`, e);
          }
        }

        // Explicitly strip anything the client says was removed, as a
        // belt-and-suspenders safety net on top of the _existing filter
        if (removedRaw !== undefined) {
          touched = true;
          try {
            const removedParsed =
              typeof removedRaw === "string"
                ? JSON.parse(removedRaw)
                : removedRaw;

            const removeIds = new Set(
              (removedParsed || []).filter(Boolean).map(String),
            );

            keepList = keepList.filter(
              (f) => !removeIds.has(String(fileFieldId(f))),
            );
          } catch (e) {
            console.log(`Failed to parse ${fieldName}_removed`, e);
          }
        }

        // Append newly uploaded files on top of the (possibly filtered) keep list
        let newFiles = [];
        if (
          req.files &&
          req.files[fieldName] &&
          req.files[fieldName].length > 0
        ) {
          newFiles = processFiles(req.files[fieldName]);
          touched = true;
        }

        if (touched) {
          const finalFiles = [...keepList, ...newFiles];
          updateObj[targetField] = finalFiles;
          console.log(
            `📎 ${fieldName}: kept ${keepList.length}, added ${newFiles.length}, total ${finalFiles.length}`,
          );
        }
      };

      buildFinalFiles("panCard", "documents.panCard");
      buildFinalFiles("aadharFront", "documents.aadharFront");
      buildFinalFiles("aadharBack", "documents.aadharBack");

      if (role === "farmer") {
        buildFinalFiles("bankPassbook", "documents.bankPassbook");
      } else if (role === "trader") {
        buildFinalFiles("businessLicense", "documents.businessLicense");
        buildFinalFiles("photo", "documents.photo");
        buildFinalFiles("businessNameBoard", "documents.businessNameBoard");
        buildFinalFiles("bankPassbook", "documents.bankPassbook");
      }
    }

    // Block protected fields — also blocks the raw _existing/_removed
    // helper fields so they never leak into the document as stray
    // top-level keys.
    const blocked = [
      "_id",
      "farmerId",
      "traderId",
      "security",
      "registeredAt",
      "role",
      "__v",
      "panCard_existing",
      "panCard_removed",
      "aadharFront_existing",
      "aadharFront_removed",
      "aadharBack_existing",
      "aadharBack_removed",
      "bankPassbook_existing",
      "bankPassbook_removed",
      "businessLicense_existing",
      "businessLicense_removed",
      "photo_existing",
      "photo_removed",
      "businessNameBoard_existing",
      "businessNameBoard_removed",
    ];

    // Add remaining safe fields
    Object.keys(updateData).forEach((key) => {
      if (
        !blocked.includes(key) &&
        updateData[key] != null &&
        updateData[key] !== ""
      ) {
        updateObj[key] = updateData[key];
      }
    });

    // Handle agreements separately (for trader)
    if (updateData.agreements && typeof updateData.agreements === "object") {
      Object.keys(updateData.agreements).forEach((key) => {
        updateObj[`agreements.${key}`] = updateData.agreements[key];
      });
      delete updateData.agreements;
    }

    // Handle company fields separately (for trader)
    if (updateData.companyName !== undefined) {
      updateObj.companyName = updateData.companyName;
      delete updateData.companyName;
    }
    if (updateData.companyType !== undefined) {
      updateObj.companyType = updateData.companyType;
      delete updateData.companyType;
    }

    if (!Object.keys(updateObj).length) {
      return res
        .status(400)
        .json({ success: false, message: "No valid updates provided" });
    }

console.log("========== UPDATE OBJECT SIZE ==========");

for (const key of Object.keys(updateObj)) {
  const value = updateObj[key];

  let size = 0;

  try {
    size = JSON.stringify(value).length;
  } catch {
    size = 0;
  }

  console.log(`${key} -> ${size} chars`);
}
    const updatedFarmer = await Farmer.findByIdAndUpdate(
      farmer._id,
      { $set: updateObj },
      { new: true, runValidators: true },
    )
      .populate("commodities")
      .populate("subcategories")
      .populate("nearestMarkets")
      .select("-security.mpin -security.password");

    if (!updatedFarmer) {
      return res.status(404).json({ success: false, message: "Update failed" });
    }

    res.status(200).json({
      success: true,
      message: `${farmer.role.charAt(0).toUpperCase() + farmer.role.slice(1)} updated successfully`,
      data: updatedFarmer,
    });
  } catch (error) {
    console.error("❌ Error updating farmer:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// ==================== GET FARMER BY ID ====================
exports.getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    const farmerData = farmer.toObject();

    // Remove sensitive data
    if (farmerData.security) {
      delete farmerData.security.mpin;
      delete farmerData.security.password;
    }

    res.status(200).json({
      success: true,
      data: farmerData,
    });
  } catch (error) {
    console.error("Error in getFarmerById:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ==================== DELETE FARMER ====================
exports.deleteFarmer = async (req, res) => {
  try {
    // Support both ObjectId and farmerId string
    const farmer = await findUserById(req.params.id);
    if (!farmer) {
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });
    }

    await Farmer.findByIdAndUpdate(
      farmer._id,
      { isActive: false },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Farmer deactivated successfully",
    });
  } catch (error) {
    console.error("Error in deleteFarmer:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.permanentlyDeleteFarmer = async (req, res) => {
  try {
    // Support both ObjectId and farmerId string
    const farmer = await findUserById(req.params.id);
    if (!farmer) {
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });
    }

    await Farmer.findByIdAndDelete(farmer._id);

    res.status(200).json({
      success: true,
      message: "Farmer permanently deleted successfully",
    });
  } catch (error) {
    console.error("Error in permanentlyDeleteFarmer:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ==================== SEARCH FARMERS ====================
exports.searchFarmers = async (req, res) => {
  try {
    const { query, state, district, commodity } = req.query;
    const searchCriteria = { isActive: true };

    if (query) {
      searchCriteria.$or = [
        { "personalInfo.name": { $regex: query, $options: "i" } },
        { "personalInfo.mobileNo": { $regex: query, $options: "i" } },
        {
          "personalInfo.villageGramaPanchayat": {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }

    if (state) searchCriteria["personalInfo.state"] = state;
    if (district) searchCriteria["personalInfo.district"] = district;
    if (commodity) searchCriteria.commodities = commodity;

    const farmers = await Farmer.find(searchCriteria)
      .populate("commodities")
      .select("-security.mpin")
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: farmers.length,
      data: farmers,
    });
  } catch (error) {
    console.error("Error in searchFarmers:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ==================== VERIFY MPIN ====================
exports.verifyMpin = async (req, res) => {
  try {
    const { mobileNo, mpin } = req.body;

    if (!mobileNo || !mpin) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and MPIN are required",
      });
    }

    const farmer = await Farmer.findOne({
      "personalInfo.mobileNo": mobileNo,
      isActive: true,
    });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    const isMatch = await bcrypt.compare(mpin, farmer.security.mpin);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid MPIN",
      });
    }

    const farmerData = farmer.toObject();
    delete farmerData.security.mpin;

    res.status(200).json({
      success: true,
      message: "MPIN verified successfully",
      data: farmerData,
    });
  } catch (error) {
    console.error("Error in verifyMpin:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ==================== GET FARMER STATS ====================
exports.getFarmerStats = async (req, res) => {
  try {
    const totalFarmers = await Farmer.countDocuments({ isActive: true });

    const totalLand = await Farmer.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalLand: { $sum: "$farmLand.total" },
          totalCultivated: { $sum: "$farmLand.cultivated" },
          totalUncultivated: { $sum: "$farmLand.uncultivated" },
        },
      },
    ]);

    const farmersByState = await Farmer.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$personalInfo.state", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const farmersByCommodity = await Farmer.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$commodities" },
      { $group: { _id: "$commodities", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      { $project: { _id: 1, categoryName: "$category.name", count: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalFarmers,
        landStats: totalLand[0] || {
          totalLand: 0,
          totalCultivated: 0,
          totalUncultivated: 0,
        },
        farmersByState,
        farmersByCommodity,
      },
    });
  } catch (error) {
    console.error("Error in getFarmerStats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ==================== FARMER MARKET TRANSPORTATION ====================

exports.getFarmerMarketTransportationOrders = async (req, res) => {
  try {
    const { farmerId } = req.body;

    if (!farmerId) {
      return res
        .status(400)
        .json({ success: false, message: "Farmer ID is required" });
    }

    const orders = await Order.find({
      farmerId,
      transporterStatus: "accepted",
      "transporterDetails.transporterId": { $exists: true },
    }).sort({ "productItems.deliveryDate": 1 });

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders with assigned transporters found",
        data: [],
      });
    }

    const groupedOrders = {};

    orders.forEach((order) => {
      order.productItems.forEach((item) => {
        if (item.farmerId === farmerId) {
          const deliveryDate = item.deliveryDate
            ? new Date(item.deliveryDate).toISOString().split("T")[0]
            : "No Date";

          if (!groupedOrders[deliveryDate]) {
            groupedOrders[deliveryDate] = { deliveryDate, orders: [] };
          }

          let existingOrder = groupedOrders[deliveryDate].orders.find(
            (o) => o.orderId === order.orderId,
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
              productItems: [],
            };
            groupedOrders[deliveryDate].orders.push(existingOrder);
          }

          existingOrder.productItems.push({
            _id: item._id,
            productId: item.productId,
            grade: item.grade,
            quantity: item.quantity,
            quantitySentByFarmer: item.quantitySentByFarmer || 0,
            farmerMarketTransportStatus:
              item.farmerMarketTransportStatus || false,
            farmerSentDate: item.farmerSentDate,
            farmerNotes: item.farmerNotes,
            pricePerUnit: item.pricePerUnit,
            totalAmount: item.totalAmount,
            nearestMarket: item.nearestMarket,
            deliveryDate: item.deliveryDate,
          });
        }
      });
    });

    const result = Object.values(groupedOrders).sort((a, b) => {
      if (a.deliveryDate === "No Date") return 1;
      if (b.deliveryDate === "No Date") return -1;
      return new Date(a.deliveryDate) - new Date(b.deliveryDate);
    });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching farmer market transportation orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

exports.updateFarmerMarketTransportation = async (req, res) => {
  try {
    const { farmerId, orderId, productItemUpdates } = req.body;

    if (!farmerId) {
      return res
        .status(400)
        .json({ success: false, message: "Farmer ID is required" });
    }

    if (!orderId || !productItemUpdates || !Array.isArray(productItemUpdates)) {
      return res.status(400).json({
        success: false,
        message: "Order ID and product item updates are required",
      });
    }

    const order = await Order.findOne({ orderId, farmerId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.transporterStatus !== "accepted" || !order.transporterDetails) {
      return res.status(400).json({
        success: false,
        message: "Transporter not assigned to this order",
      });
    }

    let updatedCount = 0;
    const errors = [];

    for (const update of productItemUpdates) {
      const { productItemId, quantitySentByFarmer, farmerNotes } = update;

      if (!productItemId || quantitySentByFarmer === undefined) {
        errors.push(`Missing data for product item: ${productItemId}`);
        continue;
      }

      const productItem = order.productItems.id(productItemId);

      if (!productItem) {
        errors.push(`Product item not found: ${productItemId}`);
        continue;
      }

      if (quantitySentByFarmer < 0) {
        errors.push(
          `Invalid quantity for ${productItemId}: cannot be negative`,
        );
        continue;
      }

      if (quantitySentByFarmer > productItem.quantity) {
        errors.push(
          `Quantity sent (${quantitySentByFarmer}) exceeds ordered quantity (${productItem.quantity}) for ${productItemId}`,
        );
        continue;
      }

      productItem.quantitySentByFarmer = quantitySentByFarmer;
      productItem.farmerMarketTransportStatus = true;
      productItem.farmerSentDate = new Date();
      productItem.farmerNotes = farmerNotes || "";

      updatedCount++;
    }

    await order.save();

    res.status(200).json({
      success: updatedCount > 0,
      message:
        errors.length > 0
          ? `Updated ${updatedCount} items with ${errors.length} errors`
          : `Successfully updated ${updatedCount} items`,
      data: {
        orderId: order.orderId,
        updatedCount,
        errors: errors.length > 0 ? errors : undefined,
      },
    });
  } catch (error) {
    console.error("Error updating farmer market transportation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update transportation details",
      error: error.message,
    });
  }
};

exports.getFarmerOrderDetails = async (req, res) => {
  try {
    const { orderId, farmerId } = req.body;

    if (!farmerId)
      return res
        .status(400)
        .json({ success: false, message: "Farmer ID is required" });
    if (!orderId)
      return res
        .status(400)
        .json({ success: false, message: "Order ID is required" });

    const order = await Order.findOne({ orderId, farmerId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const farmerProductItems = order.productItems.filter(
      (item) => item.farmerId === farmerId,
    );

    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: {
        orderId: order.orderId,
        _id: order._id,
        traderName: order.traderName,
        traderMobile: order.traderMobile,
        transporterDetails: order.transporterDetails,
        orderStatus: order.orderStatus,
        transporterStatus: order.transporterStatus,
        productItems: farmerProductItems,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};

// ==================== TRADER PROFILE FUNCTIONS ====================

exports.getTraderProfile = async (req, res) => {
  try {
    const { traderId } = req.params;

    const trader = await Farmer.findOne({
      $or: [{ traderId }, { farmerId: traderId, role: "trader" }],
    })
      .populate("commodities")
      .populate("subcategories")
      .populate("nearestMarkets");

    if (!trader) {
      return res
        .status(404)
        .json({ success: false, message: "Trader not found" });
    }

    const traderData = trader.toObject();
    delete traderData.security;
    delete traderData.__v;

    res.status(200).json({ success: true, data: traderData });
  } catch (error) {
    console.error("Error in getTraderProfile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type = "id" } = req.query;

    let query = {};

    if (type === "trader") {
      query = {
        $or: [{ traderId: userId }, { farmerId: userId, role: "trader" }],
      };
    } else if (type === "farmer") {
      query = {
        $or: [{ farmerId: userId }, { traderId: userId, role: "farmer" }],
      };
    } else {
      query = mongoose.Types.ObjectId.isValid(userId)
        ? { _id: userId }
        : { $or: [{ farmerId: userId }, { traderId: userId }] };
    }

    const user = await Farmer.findOne(query)
      .populate("commodities")
      .populate("subcategories")
      .populate("nearestMarkets");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userData = user.toObject();
    delete userData.security;
    delete userData.__v;

    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await findUserById(id, true);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userData = user.toObject();
    delete userData.security;
    delete userData.__v;

    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error("Error in getProfileById:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ==================== UPDATE TRADER PROFILE - FIXED (APPEND INSTEAD OF REPLACE) ====================
exports.updateTraderProfile = async (req, res) => {
  try {
    const { traderId } = req.params;
    const updateData = { ...req.body };

    const trader = await Farmer.findOne({
      $or: [{ traderId }, { farmerId: traderId }],
    });

    if (!trader) {
      return res
        .status(404)
        .json({ success: false, message: "Trader not found" });
    }

    // Build dot-notation update object for nested fields
    const updateObj = buildUpdateObj(updateData, [
      "personalInfo",
      "bankDetails",
      "farmLocation",
      "farmLand",
    ]);

    // Handle nearestMarkets safely
    if (updateData.nearestMarkets !== undefined) {
      const marketIds = await processNearestMarkets(updateData.nearestMarkets);
      if (marketIds !== null) {
        updateObj.nearestMarkets = marketIds;
      }
      delete updateData.nearestMarkets;
    }

    // ==================== FIXED: APPEND FILES INSTEAD OF REPLACE ====================
    if (req.files) {
      // Helper function to APPEND files
      const appendFiles = (fieldName, targetField) => {
        if (req.files[fieldName] && req.files[fieldName].length > 0) {
          const processedFiles = processFiles(req.files[fieldName]);
          const currentFiles = trader.documents[fieldName] || [];
          const updatedFiles = [...currentFiles, ...processedFiles];
          updateObj[targetField] = updatedFiles;
          console.log(
            `📎 Appended ${processedFiles.length} file(s) to ${fieldName}. Total: ${updatedFiles.length} files`,
          );
        }
      };

      appendFiles("panCard", "documents.panCard");
      appendFiles("aadharFront", "documents.aadharFront");
      appendFiles("aadharBack", "documents.aadharBack");
      appendFiles("businessLicense", "documents.businessLicense");
      appendFiles("photo", "documents.photo");
      appendFiles("businessNameBoard", "documents.businessNameBoard");
      appendFiles("bankPassbook", "documents.bankPassbook");
    }

    // Block protected fields, add remaining safe fields
    const blocked = [
      "_id",
      "security",
      "registeredAt",
      "farmerId",
      "traderId",
      "role",
      "__v",
    ];
    Object.keys(updateData).forEach((key) => {
      if (!blocked.includes(key) && updateData[key] != null) {
        updateObj[key] = updateData[key];
      }
    });

    if (!Object.keys(updateObj).length) {
      return res
        .status(400)
        .json({ success: false, message: "No valid updates provided" });
    }

    const updatedTrader = await Farmer.findByIdAndUpdate(
      trader._id,
      { $set: updateObj },
      { new: true, runValidators: true },
    )
      .populate("commodities")
      .populate("subcategories")
      .populate("nearestMarkets")
      .select("-security");

    if (!updatedTrader) {
      return res.status(404).json({ success: false, message: "Update failed" });
    }

    const traderData = updatedTrader.toObject();
    delete traderData.security;
    delete traderData.__v;

    res.status(200).json({
      success: true,
      message: "Trader profile updated successfully",
      data: traderData,
    });
  } catch (error) {
    console.error("❌ Error in updateTraderProfile:", error);

    if (error.name === "CastError") {
      console.error("🔴 CastError details:", {
        path: error.path,
        value: error.value,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update trader profile",
      error: error.message,
      errorType: error.name,
      ...(error.name === "CastError" && {
        errorDetails: { path: error.path, value: error.value },
      }),
    });
  }
};
