const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Read the JWT from the cookies instead of the Authorization header
  const token = req.cookies && req.cookies.jwt;
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded; // Attach the decoded payload (e.g., user _id, email) to req.user
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware; 