// filepath: backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const sinistreRoutes = require('./routes/sinistreRoutes'); // Importation des routes des sinistres
const rapportRoutes = require('./routes/rapportRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();
const app = express();

app.use(express.json()); // Pour analyser les requêtes JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sinistres', sinistreRoutes); // Intégration des routes des sinistres
app.use('/api/rapports', rapportRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});