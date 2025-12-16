const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      // For now, allow without token for testing
      console.log('No token provided, proceeding without authentication');
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification failed, proceeding without authentication');
    next(); // Allow without auth for testing
  }
};