const pool = require('../config/db');

const Notification = {
  async create(utilisateur_id, message) {
    await pool.query('INSERT INTO notifications (utilisateur_id, message) VALUES (?, ?)', [
      utilisateur_id,
      message,
    ]);
  },

  async findByUserId(utilisateur_id) {
    const [rows] = await pool.query('SELECT * FROM notifications WHERE utilisateur_id = ?', [
      utilisateur_id,
    ]);
    return rows;
  },
};

module.exports = Notification;