const express = require("express");
const router = express.Router();

const {
  createMarket,
  getAllMarkets,
  getMarketById,
  getMarketsByPincode,
  searchMarketByName,
} = require("../controllers/marketcontroller");

/* CREATE */
router.post("/add-market", createMarket);

/* FETCH */
router.get("/all", getAllMarkets);                     // Admin
router.get("/:marketId", getMarketById);               // Single market
router.get("/pincode/:pincode", getMarketsByPincode);  // Farmer
router.get("/search/name", searchMarketByName);        // Search

module.exports = router;
