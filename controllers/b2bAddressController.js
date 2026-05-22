// // controllers/b2bAddressController.js
// const B2BAddress = require("../models/B2BAddress");

// // Add new address
// exports.addAddress = async (req, res) => {
//   try {
//     const b2bUserId = req.user.id;
//     const addressData = { ...req.body, b2bUserId };

//     // If this is the first address or set as default
//     const addressCount = await B2BAddress.countDocuments({ b2bUserId });
//     if (addressCount === 0) {
//       addressData.isDefault = true;
//     }

//     const address = await B2BAddress.create(addressData);

//     res.status(201).json({
//       success: true,
//       message: "Address added successfully",
//       data: address,
//     });
//   } catch (error) {
//     console.error("Add address error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get all addresses
// exports.getAddresses = async (req, res) => {
//   try {
//     const b2bUserId = req.user.id;
//     const addresses = await B2BAddress.find({ b2bUserId }).sort({
//       isDefault: -1,
//       createdAt: -1,
//     });

//     res.status(200).json({
//       success: true,
//       data: addresses,
//     });
//   } catch (error) {
//     console.error("Get addresses error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get single address
// exports.getAddress = async (req, res) => {
//   try {
//     const { addressId } = req.params;
//     const b2bUserId = req.user.id;

//     const address = await B2BAddress.findOne({ _id: addressId, b2bUserId });
//     if (!address) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Address not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: address,
//     });
//   } catch (error) {
//     console.error("Get address error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Update address
// exports.updateAddress = async (req, res) => {
//   try {
//     const { addressId } = req.params;
//     const b2bUserId = req.user.id;

//     const address = await B2BAddress.findOne({ _id: addressId, b2bUserId });
//     if (!address) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Address not found" });
//     }

//     // Handle default address update
//     if (req.body.isDefault && !address.isDefault) {
//       await B2BAddress.updateMany(
//         { b2bUserId, _id: { $ne: addressId } },
//         { isDefault: false },
//       );
//     }

//     Object.assign(address, req.body);
//     await address.save();

//     res.status(200).json({
//       success: true,
//       message: "Address updated successfully",
//       data: address,
//     });
//   } catch (error) {
//     console.error("Update address error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Delete address
// exports.deleteAddress = async (req, res) => {
//   try {
//     const { addressId } = req.params;
//     const b2bUserId = req.user.id;

//     const address = await B2BAddress.findOne({ _id: addressId, b2bUserId });
//     if (!address) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Address not found" });
//     }

//     // Check if trying to delete default address
//     if (address.isDefault) {
//       const otherAddress = await B2BAddress.findOne({
//         b2bUserId,
//         _id: { $ne: addressId },
//       });
//       if (otherAddress) {
//         otherAddress.isDefault = true;
//         await otherAddress.save();
//       }
//     }

//     await address.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Address deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete address error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Set default address
// exports.setDefaultAddress = async (req, res) => {
//   try {
//     const { addressId } = req.params;
//     const b2bUserId = req.user.id;

//     await B2BAddress.updateMany({ b2bUserId }, { isDefault: false });
//     await B2BAddress.updateOne(
//       { _id: addressId, b2bUserId },
//       { isDefault: true },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Default address set successfully",
//     });
//   } catch (error) {
//     console.error("Set default address error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };



























//updated by sagar


// controllers/b2bAddressController.js
const B2BAddress = require("../models/B2BAddress");

// Add new address
exports.addAddress = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    // req.body spreads all fields including: fullName, phoneNumber, addressLine1,
    // addressLine2, landmark, city (district name), state, taluk, pincode, country,
    // addressType, isDefault — so taluk is automatically included.
    const addressData = { ...req.body, b2bUserId };

    // If this is the first address, auto-set as default
    const addressCount = await B2BAddress.countDocuments({ b2bUserId });
    if (addressCount === 0) {
      addressData.isDefault = true;
    }

    const address = await B2BAddress.create(addressData);

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: address,
    });
  } catch (error) {
    console.error("Add address error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all addresses
exports.getAddresses = async (req, res) => {
  try {
    const b2bUserId = req.user.id;
    const addresses = await B2BAddress.find({ b2bUserId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error("Get addresses error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get single address
exports.getAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const b2bUserId = req.user.id;

    const address = await B2BAddress.findOne({ _id: addressId, b2bUserId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.error("Get address error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const b2bUserId = req.user.id;

    const address = await B2BAddress.findOne({ _id: addressId, b2bUserId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Handle default address update
    if (req.body.isDefault && !address.isDefault) {
      await B2BAddress.updateMany(
        { b2bUserId, _id: { $ne: addressId } },
        { isDefault: false },
      );
    }

    // Object.assign spreads all req.body fields onto address document,
    // including taluk if provided.
    Object.assign(address, req.body);
    await address.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    console.error("Update address error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const b2bUserId = req.user.id;

    const address = await B2BAddress.findOne({ _id: addressId, b2bUserId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // If deleting the default address, promote another address to default
    if (address.isDefault) {
      const otherAddress = await B2BAddress.findOne({
        b2bUserId,
        _id: { $ne: addressId },
      });
      if (otherAddress) {
        otherAddress.isDefault = true;
        await otherAddress.save();
      }
    }

    await address.deleteOne();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Set default address
exports.setDefaultAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const b2bUserId = req.user.id;

    await B2BAddress.updateMany({ b2bUserId }, { isDefault: false });
    await B2BAddress.updateOne(
      { _id: addressId, b2bUserId },
      { isDefault: true },
    );

    res.status(200).json({
      success: true,
      message: "Default address set successfully",
    });
  } catch (error) {
    console.error("Set default address error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};