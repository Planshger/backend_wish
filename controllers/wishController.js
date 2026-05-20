const wishService = require('../services/wishService');

exports.getAll = async (req, res, next) => {
  try {
    const { categoryId, occasionId } = req.query;
    const wishes = await wishService.findByUser(req.userId, { categoryId, occasionId });
    res.json(wishes);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const wish = await wishService.findById(req.params.id, req.userId);
    if (!wish) {
      return res.status(404).json({ error: 'Wish not found' });
    }
    res.json(wish);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, price, link, occasionId, categoryId } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const wish = await wishService.create({
      title,
      price,
      link,
      userId: req.userId,
      occasionId,
      categoryId
    });
    res.status(201).json(wish);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, price, link, occasionId, categoryId } = req.body;

    const wish = await wishService.update(id, req.userId, {
      title,
      price,
      link,
      occasionId,
      categoryId
    });

    if (!wish) {
      return res.status(404).json({ error: 'Wish not found or access denied' });
    }
    res.json(wish);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await wishService.delete(id, req.userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Wish not found or access denied' });
    }
    res.json({ message: 'Wish deleted' });
  } catch (err) {
    next(err);
  }
};