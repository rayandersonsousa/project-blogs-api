const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const { validateRegister } = require('../validations/validateRegisterInputs');

const addUser = async (displayName, email, password, image) => {
  const hasFailed = validateRegister({ displayName, email, password });
  
  if (hasFailed.type) {
    return hasFailed;
  }

  const user = await User.findOne({
    where: { email },
  });

  if (user) {
    return { type: 409, message: 'User already registered' };
  }

  await User.create({ displayName, email, password, image });

  const token = generateToken(user);

  return { type: null, message: token };
};

module.exports = {
  addUser,
};