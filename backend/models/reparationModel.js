const pool = require('../config/db');

const Reparation = {
  async create(sinistre_id, reparateur_id, rapport) {
    await pool.query(
      'INSERT INTO reparations (sinistre_id, reparateur_id, rapport, statut) VALUES (?, ?, ?, ?)',
      [sinistre_id, reparateur_id, rapport, 'termine']
    );
  },
  async findBySinistreId(sinistre_id) {
    const [rows] = await pool.query(
      'SELECT * FROM reparations WHERE sinistre_id = ?',
      [sinistre_id]
    );
    return rows;
  },
};

module.exports = Reparation;