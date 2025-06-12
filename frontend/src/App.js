import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import RegisterClient from './components/Auth/RegisterClient';
import ListeSinistres from './components/Sinistre/ListeSinistres';
import Navbar from './components/Layout/Navbar';
import GestionUtilisateurs from './components/Utilisateur/GestionUtilisateurs';
import AjoutRapport from './components/Rapport/AjoutRapport';
import ListeNotifications from './components/Notification/ListeNotifications';

function App() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login setUserId={setUserId} setRole={setRole} />} />
          <Route path="/register" element={<RegisterClient />} />
          <Route path="/mes-sinistres" element={role === 'client' ? <ListeSinistres clientId={userId} /> : <div>Accès refusé</div>} />
          <Route path="/utilisateurs" element={['gestionnaire', 'administrateur'].includes(role) ? <GestionUtilisateurs /> : <div>Accès refusé</div>} />
          <Route path="/ajout-rapport-expertise" element={role === 'expert' ? <AjoutRapport type="expertise" /> : <div>Accès refusé</div>} />
          <Route path="/ajout-rapport-reparation" element={role === 'reparateur' ? <AjoutRapport type="reparation" /> : <div>Accès refusé</div>} />
          <Route path="/notifications" element={<ListeNotifications utilisateurId={userId} />} />
        </Routes>
        <li><Link to="/register">Créer un compte</Link></li>
      </div>
    </BrowserRouter>
  );
}

export default App;
