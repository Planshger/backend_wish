const pool = require('../config/db');

const userService = {
  findByUsername: async (username) => {
    const { rows } = await pool.query(
      'SELECT id, username, password FROM "user" WHERE username = $1',
      [username]
    );
    return rows[0];
  },

  create: async (username, hashedPassword) => {
    const { rows } = await pool.query(
      'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    return rows[0];
  }
};

module.exports = userService;