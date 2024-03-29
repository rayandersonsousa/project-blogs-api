const { Category } = require('../models');
const { validateCategory } = require('../validations/validateRegisterInputs');

const addCategory = async (name) => {
  const err = validateCategory(name);

  if (err.type) {
    return err;
  }
  
  const newCategory = await Category.create({ name });

  return { type: null, message: newCategory };
};

const getAll = async () => {
  const categories = await Category.findAll();

  return { categories };
};

module.exports = {
  addCategory,
  getAll,
};