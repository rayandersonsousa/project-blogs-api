const userService = require('../services/user.service');

const addUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { type, message } = await userService.addUser(displayName, email, password, image);

  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(201).json({ token: message });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();

  return res.status(200).json(users);
};

module.exports = {
  addUser,
  getAll,
};