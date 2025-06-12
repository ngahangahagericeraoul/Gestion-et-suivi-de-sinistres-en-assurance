const pool = require('../config/db');
const bcrypt = require('bcrypt');
const Notification = require('../models/notificationModel');
const { sendMail } = require('../services/mailService');

exports.creerUtilisateur = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;
    const hash = await bcrypt.hash(mot_de_passe, 10);
    await pool.query(
      'INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)',
      [nom, email, hash, role]
    );
    await Notification.create(1, `Compte ${role} créé pour ${nom}`); // 1 = gestionnaire
    await sendMail(email, "Création de compte", `Votre compte ${role} a été créé.`);
    res.json({ message: 'Utilisateur créé' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};

exports.supprimerUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM utilisateurs WHERE id = ?', [id]);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.supprimerCompteClient = async (req, res) => {
  try {
    const { client_id } = req.body;
    await pool.query('DELETE FROM utilisateurs WHERE id = ? AND role = "client"', [client_id]);
    res.json({ message: 'Compte supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};