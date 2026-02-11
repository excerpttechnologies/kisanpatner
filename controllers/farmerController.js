const Farmer = require('../models/Farmer');
const bcrypt = require('bcryptjs');
const path = require('path');
const Order = require('../models/order');
const mongoose = require('mongoose');
const Market = require('../models/Market'); // Add this import

const generateNextId = async (role) => {
  const prefix = role === 'farmer' ? 'far' : 'trd';
  const fieldName = role === 'farmer' ? 'farmerId' : 'traderId';

  const lastUser = await Farmer.findOne({
    [fieldName]: new RegExp(`^${prefix}-`)
  })
  .sort({ [fieldName]: -1 })
  .select(fieldName);

  if (!lastUser) {
    return `${prefix}-01`;
  }

  const lastNumber = parseInt(lastUser[fieldName].split('-')[1]);
  const nextNumber = lastNumber + 1;

  return `${prefix}-${String(nextNumber).padStart(2, '0')}`;
};

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

    if (!role || !['farmer', 'trader'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Role must be either "farmer" or "trader"'
      });
    }

    const parsedPersonalInfo = JSON.parse(personalInfo);
    const parsedFarmLocation = JSON.parse(farmLocation);
    const parsedFarmLand = JSON.parse(farmLand);
    const parsedCommodities = JSON.parse(commodities);
    const parsedBankDetails = JSON.parse(bankDetails);
    const parsedSecurity = JSON.parse(security);
    const parsedSubcategories = JSON.parse(req.body.subcategories || '[]');
    const parsedNearestMarkets = JSON.parse(nearestMarkets);

    const existingFarmer = await Farmer.findOne({
      'personalInfo.mobileNo': parsedPersonalInfo.mobileNo
    });

    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        message: 'Farmer with this mobile number already exists'
      });
    }

    const farmerId = await generateNextId(role);

    const salt = await bcrypt.genSalt(10);
    const hashedMpin = await bcrypt.hash(parsedSecurity.mpin, salt);
    const hashedPassword = await bcrypt.hash(parsedSecurity.password, salt);

    const documents = {};
    if (req.files) {
      if (req.files.panCard) {
        documents.panCard = `/uploads/${req.files.panCard[0].filename}`;
      }
      if (req.files.aadharFront) {
        documents.aadharFront = `/uploads/${req.files.aadharFront[0].filename}`;
      }
      if (req.files.aadharBack) {
        documents.aadharBack = `/uploads/${req.files.aadharBack[0].filename}`;
      }

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
        farmerId: newFarmer.farmerId,
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

exports.getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id).populate('commodities');

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    const farmerData = farmer.toObject();
    delete farmerData.security.mpin;

    res.status(200).json({
      success: true,
      data: farmerData
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

exports.getAllFarmers = async (req, res) => {
  try {
    const { traderId, role } = req.query;

    let filter = {};
    if (traderId) filter.traderId = traderId;
    if (role) filter.role = role;

    const farmers = await Farmer.find(filter)
      .select("-security.mpin -security.password");

    res.status(200).json({
      success: true,
      data: farmers
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    delete updateData._id;
    delete updateData.farmerId;
    delete updateData.security;
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

exports.searchFarmers = async (req, res) => {
  try {
    const { query, state, district, commodity } = req.query;
    let searchCriteria = { isActive: true };

    if (query) {
      searchCriteria.$or = [
        { 'personalInfo.name': { $regex: query, $options: 'i' } },
        { 'personalInfo.mobileNo': { $regex: query, $options: 'i' } },
        { 'personalInfo.villageGramaPanchayat': { $regex: query, $options: 'i' } }
      ];
    }

    if (state) {
      searchCriteria['personalInfo.state'] = state;
    }

    if (district) {
      searchCriteria['personalInfo.district'] = district;
    }

    if (commodity) {
      searchCriteria.commodities = commodity;
    }

    const farmers = await Farmer.find(searchCriteria)
      .populate('commodities')
      .select('-security.mpin')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: farmers.length,
      data: farmers
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
    const { farmerId } = req.body;

    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: 'Farmer ID is required'
      });
    }

    console.log('Fetching orders for farmer:', farmerId);

    const orders = await Order.find({
      farmerId: farmerId,
      transporterStatus: 'accepted',
      'transporterDetails.transporterId': { $exists: true }
    }).sort({ 'productItems.deliveryDate': 1 });

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No orders with assigned transporters found',
        data: []
      });
    }

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

exports.updateFarmerMarketTransportation = async (req, res) => {
  try {
    const { farmerId, orderId, productItemUpdates } = req.body;

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

    if (order.transporterStatus !== 'accepted' || !order.transporterDetails) {
      return res.status(400).json({
        success: false,
        message: 'Transporter not assigned to this order'
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
        errors.push(`Invalid quantity for ${productItemId}: cannot be negative`);
        continue;
      }

      if (quantitySentByFarmer > productItem.quantity) {
        errors.push(`Quantity sent (${quantitySentByFarmer}) exceeds ordered quantity (${productItem.quantity}) for ${productItemId}`);
        continue;
      }

      productItem.quantitySentByFarmer = quantitySentByFarmer;
      productItem.farmerMarketTransportStatus = true;
      productItem.farmerSentDate = new Date();
      productItem.farmerNotes = farmerNotes || '';

      updatedCount++;
    }

    await order.save();

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
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

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

// ==================== TRADER PROFILE FUNCTIONS ====================

exports.getTraderProfile = async (req, res) => {
  try {
    const { traderId } = req.params;

    console.log('🔍 Fetching trader profile for:', traderId);

    const trader = await Farmer.findOne({
      $or: [
        { traderId: traderId },
        { farmerId: traderId, role: 'trader' }
      ]
    })
    .populate('commodities')
    .populate('subcategories')
    .populate('nearestMarkets');

    if (!trader) {
      console.log('❌ Trader not found:', traderId);
      return res.status(404).json({
        success: false,
        message: 'Trader not found'
      });
    }

    const traderData = trader.toObject();
    delete traderData.security;
    delete traderData.__v;

    console.log('✅ Trader found:', trader.traderId || trader.farmerId);

    res.status(200).json({
      success: true,
      data: traderData
    });
  } catch (error) {
    console.error('Error in getTraderProfile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type = 'id' } = req.query;

    let query = {};

    if (type === 'trader') {
      query = {
        $or: [
          { traderId: userId },
          { farmerId: userId, role: 'trader' }
        ]
      };
    } else if (type === 'farmer') {
      query = {
        $or: [
          { farmerId: userId },
          { traderId: userId, role: 'farmer' }
        ]
      };
    } else {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        query._id = userId;
      } else {
        query = {
          $or: [
            { farmerId: userId },
            { traderId: userId }
          ]
        };
      }
    }

    const user = await Farmer.findOne(query)
      .populate('commodities')
      .populate('subcategories')
      .populate('nearestMarkets');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userData = user.toObject();
    delete userData.security;
    delete userData.__v;

    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await Farmer.findById(id)
        .populate('commodities')
        .populate('subcategories')
        .populate('nearestMarkets');

      if (user) {
        const userData = user.toObject();
        delete userData.security;
        delete userData.__v;

        return res.status(200).json({
          success: true,
          data: userData
        });
      }
    }

    const user = await Farmer.findOne({
      $or: [
        { farmerId: id },
        { traderId: id }
      ]
    })
    .populate('commodities')
    .populate('subcategories')
    .populate('nearestMarkets');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userData = user.toObject();
    delete userData.security;
    delete userData.__v;

    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    console.error('Error in getProfileById:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.updateTraderProfile = async (req, res) => {
  try {
    const { traderId } = req.params;
    const updateData = req.body;

    console.log('🔧 Updating trader profile for:', traderId);
    console.log('Update data keys:', Object.keys(updateData));
    
    // Log nearestMarkets for debugging
    if (updateData.nearestMarkets) {
      console.log('📌 nearestMarkets received:', typeof updateData.nearestMarkets);
      if (typeof updateData.nearestMarkets === 'string') {
        console.log('📌 nearestMarkets is a string, trying to parse...');
      }
    }

    const trader = await Farmer.findOne({
      $or: [
        { traderId: traderId },
        { farmerId: traderId }
      ]
    });

    if (!trader) {
      console.log('❌ Trader not found for update:', traderId);
      return res.status(404).json({
        success: false,
        message: 'Trader not found'
      });
    }

    console.log('✅ Found trader:', trader._id, 'Name:', trader.personalInfo?.name);

    // Create update object using $set for individual fields
    const updateObj = {};
    
    // Helper function to add nested updates
    const addNestedUpdates = (prefix, data) => {
      if (!data || typeof data !== 'object') return;
      
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
          updateObj[`${prefix}.${key}`] = data[key];
        }
      });
    };

    // Handle personalInfo updates
    if (updateData.personalInfo) {
      console.log('📝 Processing personalInfo updates');
      addNestedUpdates('personalInfo', updateData.personalInfo);
      delete updateData.personalInfo;
    }

    // Handle bankDetails updates
    if (updateData.bankDetails) {
      console.log('📝 Processing bankDetails updates');
      addNestedUpdates('bankDetails', updateData.bankDetails);
      delete updateData.bankDetails;
    }

    // Handle farmLocation updates
    if (updateData.farmLocation) {
      console.log('📝 Processing farmLocation updates');
      addNestedUpdates('farmLocation', updateData.farmLocation);
      delete updateData.farmLocation;
    }

    // Handle farmLand updates
    if (updateData.farmLand) {
      console.log('📝 Processing farmLand updates');
      addNestedUpdates('farmLand', updateData.farmLand);
      delete updateData.farmLand;
    }

    // Handle nearestMarkets specially
    if (updateData.nearestMarkets) {
      console.log('📝 Processing nearestMarkets updates');
      
      let marketsArray = updateData.nearestMarkets;
      
      // If it's a string, try to parse it as JSON
      if (typeof marketsArray === 'string') {
        try {
          console.log('📌 Parsing nearestMarkets string');
          marketsArray = JSON.parse(marketsArray);
          console.log('📌 Successfully parsed nearestMarkets');
        } catch (parseError) {
          console.log('❌ Failed to parse nearestMarkets as JSON:', parseError.message);
          // If parsing fails, it might be a single market object string
          try {
            // Try to clean up the string and parse
            const cleanedString = marketsArray.replace(/\n/g, '').replace(/\s+/g, ' ');
            marketsArray = JSON.parse(cleanedString);
            console.log('📌 Successfully parsed after cleaning');
          } catch (e) {
            console.log('❌ Still failed to parse, treating as string array');
          }
        }
      }
      
      if (Array.isArray(marketsArray)) {
        console.log('📌 nearestMarkets is an array, length:', marketsArray.length);
        
        if (marketsArray.length > 0) {
          const firstItem = marketsArray[0];
          console.log('📌 First item type:', typeof firstItem);
          console.log('📌 First item:', firstItem);
          
          // Check if it's market objects (has marketName) or ObjectIds
          if (typeof firstItem === 'object' && firstItem.marketName) {
            console.log('⚠️ Market objects detected, not ObjectIds');
            console.log('ℹ️ Market object structure:', Object.keys(firstItem));
            
            // Option 1: Try to find or create Market documents
            // This requires a Market model
            try {
              const marketIds = [];
              
              for (const marketObj of marketsArray) {
                if (!marketObj.marketName) continue;
                
                // Try to find existing market by name and location
                let market = await Market.findOne({
                  marketName: marketObj.marketName,
                  district: marketObj.district || '',
                  state: marketObj.state || ''
                });
                
                // If not found, create a new market
                if (!market) {
                  market = new Market({
                    marketName: marketObj.marketName,
                    place: marketObj.place || '',
                    district: marketObj.district || '',
                    state: marketObj.state || '',
                    pincode: marketObj.pincode || '',
                    isActive: true
                  });
                  await market.save();
                  console.log(`✅ Created new market: ${marketObj.marketName}`);
                }
                
                marketIds.push(market._id);
              }
              
              if (marketIds.length > 0) {
                updateObj.nearestMarkets = marketIds;
                console.log(`✅ Converted ${marketIds.length} market objects to Market IDs`);
              } else {
                console.log('⚠️ No valid market IDs generated, skipping nearestMarkets update');
              }
              
            } catch (marketError) {
              console.log('❌ Error processing markets:', marketError.message);
              // If Market model doesn't exist or fails, skip nearestMarkets
              console.log('⚠️ Skipping nearestMarkets update due to error');
            }
          } else {
            // Assume they're ObjectIds or strings that can be cast to ObjectId
            console.log('✅ Setting nearestMarkets as provided array');
            updateObj.nearestMarkets = marketsArray;
          }
        } else {
          // Empty array
          updateObj.nearestMarkets = [];
        }
      } else {
        console.log('⚠️ nearestMarkets is not an array, skipping');
      }
      
      delete updateData.nearestMarkets;
    }

    // Handle other direct field updates
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined && updateData[key] !== null) {
        // Skip fields that shouldn't be updated
        if (!['_id', 'security', 'registeredAt', 'farmerId', 'traderId', '__v'].includes(key)) {
          updateObj[key] = updateData[key];
        }
      }
    });

    console.log('📝 Final update object keys:', Object.keys(updateObj));

    // If no updates, return early
    if (Object.keys(updateObj).length === 0) {
      console.log('⚠️ No valid updates to apply');
      return res.status(400).json({
        success: false,
        message: 'No valid updates provided'
      });
    }

    const updatedTrader = await Farmer.findByIdAndUpdate(
      trader._id,
      { $set: updateObj },
      { new: true, runValidators: true }
    )
    .populate('commodities')
    .populate('subcategories')
    .populate('nearestMarkets')
    .select('-security.mpin -security.password');

    if (!updatedTrader) {
      return res.status(404).json({
        success: false,
        message: 'Update failed'
      });
    }

    const traderData = updatedTrader.toObject();
    delete traderData.security;
    delete traderData.__v;

    console.log('✅ Trader updated successfully');

    res.status(200).json({
      success: true,
      message: 'Trader profile updated successfully',
      data: traderData
    });
  } catch (error) {
    console.error('❌ Error in updateTraderProfile:', error);
    
    // More detailed error logging
    if (error.name === 'CastError') {
      console.error('🔴 CastError details:', {
        path: error.path,
        valueType: typeof error.value,
        value: error.value,
        message: error.message,
        reason: error.reason?.message
      });
    } else if (error.name === 'ValidationError') {
      console.error('🔴 ValidationError:', error.message);
      Object.keys(error.errors || {}).forEach(key => {
        console.error(`  ${key}:`, error.errors[key].message);
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update trader profile',
      error: error.message,
      errorType: error.name,
      ...(error.name === 'CastError' && {
        errorDetails: {
          path: error.path,
          value: error.value
        }
      })
    });
  }
};
