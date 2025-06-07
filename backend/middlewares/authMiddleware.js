const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) throw new Error('Token not found');

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken.userId; // ✅ attach to req.userId

    next();
  } catch (error) {
    res.status(401).send({
      message: 'Invalid or expired token',
      success: false,
      error: error.message
    });
  }
};

module.exports = authMiddleware;
