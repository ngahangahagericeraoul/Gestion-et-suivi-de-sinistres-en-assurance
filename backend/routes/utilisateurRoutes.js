const express = require('express');
const { creerUtilisateur, supprimerUtilisateur, supprimerCompteClient } = require('../controllers/utilisateurController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/creer', verifyToken, checkRole('gestionnaire'), creerUtilisateur);
router.delete('/supprimer/:id', verifyToken, checkRole('gestionnaire'), supprimerUtilisateur);
router.delete('/supprimer-compte-client', supprimerCompteClient);

module.exports = router;