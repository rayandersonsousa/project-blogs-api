const jwt = require('jsonwebtoken');

const JWT_SECRET_PASS = process.env.JWT_SECRET || 'inuyasha';

const generateToken = (payload) => {
  const jwtConfig = {
    expiresIn: '5m',
    algorithm: 'HS256',
  };

  return jwt.sign(payload.dataValues, JWT_SECRET_PASS, jwtConfig);
};

const authenticateToken = (token) => {
  try {
    const verification = jwt.verify(token, JWT_SECRET_PASS);
    return verification;
  } catch (err) {
    return { type: 401, message: 'Invalid Token' };
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};