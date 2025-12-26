const Packaging = require("../models/QuantityType");

/* ==========================
   CREATE / UPDATE PACKAGING
========================== */
exports.savePackaging = async (req, res) => {
  try {
    let { packageType, measurements } = req.body;

    if (!packageType || !measurements || measurements.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // normalize package type (kg → KG)
    packageType = packageType.trim().toUpperCase();

    const existing = await Packaging.findOne({ packageType });

    if (existing) {
      existing.measurements = measurements;
      await existing.save();

      return res.json({
        message: "Packaging updated successfully",
        data: existing,
      });
    }

    const pack = new Packaging({ packageType, measurements });
    await pack.save();

    res.status(201).json({
      message: "Packaging created successfully",
      data: pack,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Package type already exists" });
    }
    res.status(500).json({ message: err.message });
  }
};

/* ==========================
   FETCH ALL PACKAGING
========================== */
exports.getAllPackaging = async (req, res) => {
  try {
    const data = await Packaging.find().sort({ packageType: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
