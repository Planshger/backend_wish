const occasionService = require('../services/occasionService');

exports.getAll = async (req, res, next) => {
  try {
    const occasions = await occasionService.getAll();
    res.json(occasions);
  } catch (err) {
    next(err);
  }
};