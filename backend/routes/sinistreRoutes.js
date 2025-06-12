const express = require('express');
const { declarerSinistre, consulterSinistres, mettreAJourStatut } = require('../controllers/sinistreController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const router = express.Router();

// Client : déclarer un sinistre
router.post('/declarer', verifyToken, checkRole('client'), declarerSinistre);

// Client : consulter ses sinistres
router.get('/client/:client_id', verifyToken, checkRole('client'), consulterSinistres);

// Gestionnaire : mettre à jour le statut d'un sinistre
router.put('/mettre-a-jour', verifyToken, checkRole('gestionnaire'), mettreAJourStatut);

module.exports = router;