const pool = require('../config/db');

const RapportExpertise = {
  async create(sinistre_id, expert_id, rapport) {
    await pool.query(
      'INSERT INTO rapports_expertise (sinistre_id, expert_id, rapport) VALUES (?, ?, ?)',
      [sinistre_id, expert_id, rapport]
    );
  },
  async findBySinistreId(sinistre_id) {
    const [rows] = await pool.query(
      'SELECT * FROM rapports_expertise WHERE sinistre_id = ?',
      [sinistre_id]
    );
    return rows;
  },
};

module.exports = RapportExpertise;