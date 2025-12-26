const express = require("express");
const router = express.Router();

const {
  savePackaging,
  getAllPackaging,
} = require("../controllers/quantitytypecontroller");

router.post("/save", savePackaging);
router.get("/all", getAllPackaging);

module.exports = router;
