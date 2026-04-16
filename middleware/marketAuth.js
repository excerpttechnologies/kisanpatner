const jwt = require('jsonwebtoken');

// Verifies JWT, attaches req.userId + req.userRole
exports.protect = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ success: false, message: 'No token provided' });
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId   = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Allow only specific roles
exports.allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.userRole))
    return res.status(403).json({ success: false, message: 'Access denied' });
  next();
};
