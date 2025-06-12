// filepath: backend/routes/authRoutes.js
const express = require('express');
const { clientLogin, inscrireClient, changerMotDePasse } = require('../controllers/authController');
const router = express.Router();

router.post('/login', clientLogin);
router.post('/register', inscrireClient);
router.post('/changer-mot-de-passe', changerMotDePasse);

module.exports = router;