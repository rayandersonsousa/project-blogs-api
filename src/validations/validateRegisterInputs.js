const { newUser, newCategory } = require('./schemas');

const validateRegister = (displayName, email, password) => {
  const { error } = newUser.validate(displayName, email, password);

  if (error) {
    return { type: 400, message: error.message };
  }

  return { type: null, message: '' };
};

const validateCategory = (category) => {
  const { error } = newCategory.validate(category);

  if (error) {
    return { type: 400, message: '"name" is required' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateRegister,
  validateCategory,
};