const pool = require('../config/db');

const wishService = {
  // Получить все желания пользователя с фильтрацией
  findByUser: async (userId, { categoryId, occasionId } = {}) => {
    let query = `
      SELECT w.id, w.title, w.price, w.link, w.user_id,
             c.id as category_id, c.name as category_name,
             o.id as occasion_id, o.name as occasion_name
      FROM wishes w
      LEFT JOIN categories_wishes c ON w.wishes_cat_id = c.id
      LEFT JOIN occasions o ON w.occasions_id = o.id
      WHERE w.user_id = $1
    `;
    const params = [userId];
    if (categoryId) {
      params.push(categoryId);
      query += ` AND w.wishes_cat_id = $${params.length}`;
    }
    if (occasionId) {
      params.push(occasionId);
      query += ` AND w.occasions_id = $${params.length}`;
    }
    query += ' ORDER BY w.id DESC';
    const { rows } = await pool.query(query, params);
    return rows;
  },

  // Получить одно желание по id (с проверкой владельца)
  findById: async (id, userId) => {
    const { rows } = await pool.query(
      'SELECT * FROM wishes WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return rows[0];
  },

  // Создать желание
  create: async ({ title, price, link, userId, occasionId, categoryId }) => {
    const { rows } = await pool.query(
      `INSERT INTO wishes (title, price, link, user_id, occasions_id, wishes_cat_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, price, link, userId, occasionId, categoryId]
    );
    return rows[0];
  },

  // Обновить желание (только свои)
  update: async (id, userId, { title, price, link, occasionId, categoryId }) => {
    const { rows } = await pool.query(
      `UPDATE wishes
       SET title = COALESCE($1, title),
           price = COALESCE($2, price),
           link = COALESCE($3, link),
           occasions_id = COALESCE($4, occasions_id),
           wishes_cat_id = COALESCE($5, wishes_cat_id)
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [title, price, link, occasionId, categoryId, id, userId]
    );
    return rows[0];
  },

  // Удалить желание (только своё)
  delete: async (id, userId) => {
    const { rowCount } = await pool.query(
      'DELETE FROM wishes WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return rowCount > 0;
  }
};

module.exports = wishService;