const express = require("express");
const router = express.Router();

const {
  saveCommission,
  getAllCommissions,
} = require("../controllers/commissioncontroller");

router.post("/save", saveCommission);
router.get("/all", getAllCommissions);

module.exports = router;
