// middleware/B2Bauth.js
const B2BUser = require("../models/B2BUser");
const jwt = require("jsonwebtoken");
const authenticateB2BUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Received token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    // Verify JWT token (implement your JWT verification logic)
    const decoded = await jwt.verify(token, process.env.JWT_SECRET); // Your token verification function
    // console.log("Decoded token:", decoded);

    const user = await B2BUser.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or inactive user" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authenticateB2BUser;
