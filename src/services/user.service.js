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

const getAll = async () => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  return users;
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  if (!user) {
    return { type: 404, message: 'User does not exist' };
  }

  return { type: null, message: user };
};

module.exports = {
  addUser,
  getAll,
  getById,
};