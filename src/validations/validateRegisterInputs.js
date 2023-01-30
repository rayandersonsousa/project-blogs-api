const { newUser } = require('./schemas');

const validateRegister = (displayName, email, password) => {
  const { error } = newUser.validate(displayName, email, password);

  if (error) {
    return { type: 400, message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateRegister,
};