import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUserId, setRole }) {
  const [nom, setNom] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [numeroPolice, setNumeroPolice] = useState('');
  const [role, setRoleLocal] = useState('client');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = { nom, mot_de_passe: motDePasse, role };
      if (role === 'client') data.numero_police = numeroPolice;
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      setUserId(res.data.userId);
      setRole(res.data.role);

      // Redirection selon le rôle
      if (res.data.role === 'client') navigate('/mes-sinistres');
      else if (res.data.role === 'gestionnaire' || res.data.role === 'administrateur') navigate('/utilisateurs');
      else if (res.data.role === 'expert') navigate('/ajout-rapport-expertise');
      else if (res.data.role === 'reparateur') navigate('/ajout-rapport-reparation');
    } catch (err) {
      setError('Identifiants incorrects');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Connexion</h2>
      <select value={role} onChange={e => setRoleLocal(e.target.value)}>
        <option value="client">Client</option>
        <option value="gestionnaire">Gestionnaire</option>
        <option value="administrateur">Administrateur</option>
        <option value="expert">Expert</option>
        <option value="reparateur">Réparateur</option>
      </select>
      <input type="text" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} required />
      {role === 'client' && (
        <input type="text" placeholder="Numéro de police" value={numeroPolice} onChange={e => setNumeroPolice(e.target.value)} required />
      )}
      <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} required />
      <button type="submit">Se connecter</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;