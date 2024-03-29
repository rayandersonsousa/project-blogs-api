const { authenticateToken, dataFromToken } = require('../utils/jwt');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const { message } = authenticateToken(authorization);

  if (message) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  const email = dataFromToken(authorization);

  req.email = email;

  return next();
};

module.exports = {
  validateToken,
};