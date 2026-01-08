// const axios = require("axios");
// const Market = require("../models/Market");
// function generateMarketId() {
//   const random = Math.floor(1000 + Math.random() * 9000);
//   return `MKT-${Date.now()}-${random}`;
// };


// exports.createMarket = async (req, res) => {
//   try {
//     const { marketName, pincode, exactAddress, landmark } = req.body;

//     const response = await axios.get(
//       `https://api.postalpincode.in/pincode/${pincode}`
//     );

//     if (response.data[0].Status !== "Success") {
//       return res.status(400).json({ message: "Invalid pincode" });
//     }

//     const po = response.data[0].PostOffice[0];

//     const market = new Market({
//       marketId: generateMarketId(),
//       marketName,
//       pincode,
//       postOffice: po.Name,
//       district: po.District,
//       state: po.State,
//       exactAddress,    // Admin entered
//       landmark,
//     });

//     await market.save();

//     res.status(201).json({
//       message: "Market added successfully",
//       data: market,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



const axios = require("axios");
const Market = require("../models/Market");

/* 🔹 Generate Market ID */
function generateMarketId() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MKT-${Date.now()}-${random}`;
}

/* ===============================
   CREATE MARKET
================================ */
exports.createMarket = async (req, res) => {
  try {
    const { marketName, pincode, exactAddress, landmark } = req.body;

    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    if (response.data[0].Status !== "Success") {
      return res.status(400).json({ message: "Invalid pincode" });
    }

    const po = response.data[0].PostOffice[0];

    const market = new Market({
      marketId: generateMarketId(),
      marketName,
      pincode,
      postOffice: po.Name,
      district: po.District,
      state: po.State,
      exactAddress,
      landmark,
    });

    await market.save();

    res.status(201).json({
      message: "Market added successfully",
      data: market,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   GET ALL MARKETS (ADMIN)
================================ */
exports.getAllMarkets = async (req, res) => {
  try {
    const markets = await Market.find().sort({ createdAt: -1 });
    res.json(markets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   GET MARKET BY ID
================================ */
exports.getMarketById = async (req, res) => {
  try {
    const market = await Market.findById(req.params.marketId);

    if (!market) {
      return res.status(404).json({ success: false, message: "Market not found" });
    }

    res.json({ success: true, data: market });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ===============================
   GET MARKETS BY PINCODE
   (Farmer nearest markets)
================================ */
exports.getMarketsByPincode = async (req, res) => {
  try {
    const markets = await Market.find({ pincode: req.params.pincode });

    if (markets.length === 0) {
      return res.status(404).json({ message: "No markets found" });
    }

    res.json(markets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   SEARCH MARKET BY NAME
================================ */
exports.searchMarketByName = async (req, res) => {
  try {
    const { name } = req.query;

    const markets = await Market.find({
      marketName: { $regex: name, $options: "i" },
    });

    res.json(markets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
