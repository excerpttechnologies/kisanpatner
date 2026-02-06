const Commission = require("../models/commission");

/* ==========================
   CREATE / UPDATE COMMISSION
========================== */
exports.saveCommission = async (req, res) => {
  try {
    let { role, commissionPercentage } = req.body;

    if (!role || commissionPercentage === undefined) {
      return res.status(400).json({ message: "Invalid data" });
    }

    role = role.trim().toUpperCase();

    const existing = await Commission.findOne({ role });

    if (existing) {
      existing.commissionPercentage = commissionPercentage;
      await existing.save();

      return res.json({
        message: "Commission updated successfully",
        data: existing,
      });
    }

    const commission = new Commission({
      role,
      commissionPercentage,
    });

    await commission.save();

    res.status(201).json({
      message: "Commission added successfully",
      data: commission,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Commission role already exists" });
    }

    res.status(500).json({ message: err.message });
  }
};

/* ==========================
   GET ALL COMMISSIONS
========================== */
exports.getAllCommissions = async (req, res) => {
  try {
    const data = await Commission.find().sort({ role: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};