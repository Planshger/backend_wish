const pool = require('../config/db');

const categoryService = {
  getAll: async () => {
    const { rows } = await pool.query(
      'SELECT id, name FROM categories_wishes ORDER BY id'
    );
    return rows;
  }
};

module.exports = categoryService;