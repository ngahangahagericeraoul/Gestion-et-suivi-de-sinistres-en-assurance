const RapportExpertise = require('../models/rapportExpertiseModel');
const Reparation = require('../models/reparationModel');
const Notification = require('../models/notificationModel');
const { sendMail } = require('../services/mailService');

exports.ajouterRapportExpertise = async (req, res) => {
  try {
    const { sinistre_id, expert_id, rapport, gestionnaire_email } = req.body;
    await RapportExpertise.create(sinistre_id, expert_id, rapport);
    await Notification.create(expert_id, `Rapport d'expertise ajouté pour le sinistre ${sinistre_id}`);
    if (gestionnaire_email) {
      await sendMail(gestionnaire_email, "Nouveau rapport d'expertise", `Rapport ajouté pour le sinistre ${sinistre_id}`);
    }
    res.json({ message: 'Rapport d\'expertise ajouté' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du rapport' });
  }
};

exports.ajouterRapportReparation = async (req, res) => {
  try {
    const { sinistre_id, reparateur_id, rapport, gestionnaire_email } = req.body;
    await Reparation.create(sinistre_id, reparateur_id, rapport);
    await Notification.create(reparateur_id, `Rapport de réparation ajouté pour le sinistre ${sinistre_id}`);
    if (gestionnaire_email) {
      await sendMail(gestionnaire_email, "Nouveau rapport de réparation", `Rapport ajouté pour le sinistre ${sinistre_id}`);
    }
    res.json({ message: 'Rapport de réparation ajouté' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du rapport' });
  }
};