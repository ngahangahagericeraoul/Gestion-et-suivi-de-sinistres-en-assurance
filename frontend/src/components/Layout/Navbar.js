import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ role }) {
  return (
    <nav className="navbar">
      <span className="logo">Gestion Sinistres</span>
      <ul>
        <li><Link to="/">Connexion</Link></li>
        <li><Link to="/register">Créer un compte</Link></li>
        {role === 'client' && <li><Link to="/mes-sinistres">Mes sinistres</Link></li>}
        {['gestionnaire', 'administrateur'].includes(role) && <li><Link to="/utilisateurs">Utilisateurs</Link></li>}
        {role === 'expert' && <li><Link to="/ajout-rapport-expertise">Rapport Expertise</Link></li>}
        {role === 'reparateur' && <li><Link to="/ajout-rapport-reparation">Rapport Réparation</Link></li>}
        {role && <li><Link to="/notifications">Notifications</Link></li>}
      </ul>
    </nav>
  );
}

export default Navbar;