const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Decode token
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {

    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = {
  verifyToken
};
