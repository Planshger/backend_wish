const categoryService = require('../services/categoryService');

exports.getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};