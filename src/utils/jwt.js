const jwt = require('jsonwebtoken');

const JWT_SECRET_PASS = process.env.JWT_SECRET || 'inuyasha';

const generateToken = (userData) => {
  const jwtConfig = {
    expiresIn: '5m',
    algorithm: 'HS256',
  };

  const payload = {
    userData,
  };

  return jwt.sign(payload, JWT_SECRET_PASS, jwtConfig);
};

const authenticateToken = (token) => {
  try {
    const verification = jwt.verify(token, JWT_SECRET_PASS);
    return verification;
  } catch (err) {
    return { type: 401, message: 'Invalid Token' };
  }
};

const dataFromToken = (token) => {
  try {
    const result = jwt.verify(token, JWT_SECRET_PASS);
    const { email } = result.userData;
    console.log(email);
    return email;
  } catch (err) {
    return { type: 401, message: 'Invalid Token' };
  }
};

module.exports = {
  generateToken,
  authenticateToken,
  dataFromToken,
};