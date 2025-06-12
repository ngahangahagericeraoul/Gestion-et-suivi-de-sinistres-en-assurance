const express = require('express');
const { ajouterRapportExpertise, ajouterRapportReparation } = require('../controllers/rapportController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/expertise', verifyToken, checkRole('expert'), ajouterRapportExpertise);
router.post('/reparation', verifyToken, checkRole('reparateur'), ajouterRapportReparation);

module.exports = router;