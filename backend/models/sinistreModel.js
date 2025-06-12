const pool = require('../config/db');

const Sinistre = {
  async create(client_id, description) {
    const [result] = await pool.query(
      'INSERT INTO sinistres (client_id, description) VALUES (?, ?)',
      [client_id, description]
    );
    return result.insertId;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM sinistres WHERE id = ?', [id]);
    return rows[0];
  },

  async findByClientId(client_id) {
    const [rows] = await pool.query('SELECT * FROM sinistres WHERE client_id = ?', [client_id]);
    return rows;
  },

  async updateStatut(id, statut, evolution) {
    await pool.query(
      'UPDATE sinistres SET statut = ?, evolution = ? WHERE id = ?',
      [statut, evolution, id]
    );
  },
};

module.exports = Sinistre;