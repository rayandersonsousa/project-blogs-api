const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

const validation = async (email, password) => {
  if (!email || !password) {
    return { type: 400, message: 'Some required fields are missing' };
  }

  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) {
    return { type: 400, message: 'Invalid fields' };
  }

  const token = generateToken(user);

  return { type: null, message: token };
};

module.exports = {
  validation,
};