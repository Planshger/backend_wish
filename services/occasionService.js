const pool = require('../config/db');

const occasionService = {
  getAll: async () => {
    const { rows } = await pool.query(
      'SELECT id, name FROM occasions ORDER BY id'
    );
    return rows;
  }
};

module.exports = occasionService;