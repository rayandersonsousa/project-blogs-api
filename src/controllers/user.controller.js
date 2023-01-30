const userService = require('../services/user.service');

const addUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { type, message } = await userService.addUser(displayName, email, password, image);

  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(201).json({ token: message });
};

module.exports = {
  addUser,
};