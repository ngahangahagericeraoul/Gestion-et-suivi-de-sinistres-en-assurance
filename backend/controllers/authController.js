// filepath: backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const Utilisateur = require('../models/utilisateurModel');

// Connexion pour les clients
exports.clientLogin = async (req, res) => {
  try {
    const { nom, numero_police } = req.body;
    const utilisateur = await Utilisateur.findByNomEtPolice(nom, numero_police);

    if (!utilisateur || utilisateur.role !== 'client') {
      return res.status(401).json({ error: 'Nom ou numéro de police incorrect' });
    }

    const token = jwt.sign({ id: utilisateur.id, role: utilisateur.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ message: 'Connexion réussie', token, userId: utilisateur.id, role: utilisateur.role });
  } catch (error) {
    console.error('Erreur lors de la connexion client:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

// Inscription pour les clients
exports.inscrireClient = async (req, res) => {
  try {
    const { nom, email, numero_police, mot_de_passe } = req.body;
    if (!nom || !email || !numero_police || !mot_de_passe) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }
    // Vérifier unicité du numéro de police
    const [rows] = await pool.query('SELECT * FROM utilisateurs WHERE numero_police = ?', [numero_police]);
    if (rows.length > 0) return res.status(400).json({ error: 'Numéro de police déjà utilisé' });
    // Vérifier unicité de l'email
    const [rows2] = await pool.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
    if (rows2.length > 0) return res.status(400).json({ error: 'Email déjà utilisé' });
    const hash = await bcrypt.hash(mot_de_passe, 10);
    await pool.query(
      'INSERT INTO utilisateurs (nom, email, numero_police, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
      [nom, email, numero_police, hash, 'client']
    );
    res.status(201).json({ message: 'Compte client créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { numero_police, mot_de_passe } = req.body;
    const [rows] = await pool.query('SELECT * FROM utilisateurs WHERE numero_police = ? AND role = "client"', [numero_police]);
    if (rows.length === 0) return res.status(400).json({ error: 'Numéro de police incorrect' });
    const utilisateur = rows[0];
    const match = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!match) return res.status(400).json({ error: 'Mot de passe incorrect' });
    const token = jwt.sign({ id: utilisateur.id, role: utilisateur.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ message: 'Connexion réussie', token, userId: utilisateur.id, role: utilisateur.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changerMotDePasse = async (req, res) => {
  try {
    const { client_id, ancien_mot_de_passe, nouveau_mot_de_passe } = req.body;
    const [rows] = await pool.query('SELECT * FROM utilisateurs WHERE id = ? AND role = "client"', [client_id]);
    if (rows.length === 0) return res.status(400).json({ error: 'Utilisateur non trouvé' });
    const utilisateur = rows[0];
    const match = await bcrypt.compare(ancien_mot_de_passe, utilisateur.mot_de_passe);
    if (!match) return res.status(400).json({ error: 'Ancien mot de passe incorrect' });
    const hash = await bcrypt.hash(nouveau_mot_de_passe, 10);
    await pool.query('UPDATE utilisateurs SET mot_de_passe = ? WHERE id = ?', [hash, client_id]);
    res.json({ message: 'Mot de passe modifié avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};