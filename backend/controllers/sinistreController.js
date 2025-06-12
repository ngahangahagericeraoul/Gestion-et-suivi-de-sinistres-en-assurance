const Sinistre = require('../models/sinistreModel');
const Notification = require('../models/notificationModel');

exports.declarerSinistre = async (req, res) => {
  try {
    const { client_id, description } = req.body;
    const sinistreId = await Sinistre.create(client_id, description);

    // Envoyer une notification au client
    await Notification.create(client_id, `Votre sinistre a été déclaré avec succès. ID : ${sinistreId}`);

    res.status(201).json({ message: 'Sinistre déclaré avec succès', sinistreId });
  } catch (error) {
    console.error('Erreur lors de la déclaration du sinistre:', error);
    res.status(500).json({ error: error.message }); // temporairement pour debug
  }
};

exports.consulterSinistres = async (req, res) => {
  try {
    const { client_id } = req.params;
    const sinistres = await Sinistre.findByClientId(client_id);
    res.json(sinistres);
  } catch (error) {
    console.error('Erreur lors de la récupération des sinistres:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des sinistres' });
  }
};

exports.mettreAJourStatut = async (req, res) => {
  try {
    const { sinistre_id, statut, evolution } = req.body;
    await Sinistre.updateStatut(sinistre_id, statut, evolution);

    // Envoyer une notification au client
    const sinistre = await Sinistre.findById(sinistre_id);
    await Notification.create(
      sinistre.client_id,
      `Le statut de votre sinistre (ID : ${sinistre_id}) a été mis à jour : ${statut}`
    );

    res.json({ message: 'Statut du sinistre mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut du sinistre:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut du sinistre' });
  }
};