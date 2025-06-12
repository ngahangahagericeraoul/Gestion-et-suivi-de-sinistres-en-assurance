// filepath: backend/models/utilisateurModel.js
const pool = require('../config/db');

const Utilisateur = {
  async findByNomEtPolice(nom, numero_police) {
    const [rows] = await pool.query(
      'SELECT * FROM utilisateurs WHERE nom = ? AND numero_police = ?',
      [nom, numero_police]
    );
    return rows[0];
  },
};

module.exports = Utilisateur;