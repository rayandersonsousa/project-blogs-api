const loginService = require('../services/login.service');

const validation = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await loginService.validation(email, password);
  
  if (type) {
    return res.status(400).json({ message });
  }

  return res.status(200).json({ token: message });
};

module.exports = {
  validation,
};