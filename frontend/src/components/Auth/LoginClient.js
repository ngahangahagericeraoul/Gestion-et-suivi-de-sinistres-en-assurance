import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function LoginClient({ onLogin, setClientId }) {
  const [nom, setNom] = useState('');
  const [numero_police, setNumeroPolice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { nom, numero_police });
      localStorage.setItem('token', res.data.token);
      setClientId(res.data.userId); // récupère l'id du client si le backend le retourne
      onLogin('client');
    } catch (err) {
      console.error('Login error:', err);
      setError('Identifiants incorrects');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Connexion Client</h2>
      <input type="text" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} required />
      <input type="text" placeholder="Numéro de police" value={numero_police} onChange={e => setNumeroPolice(e.target.value)} required />
      <button type="submit">Se connecter</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
LoginClient.propTypes = {
  onLogin: PropTypes.func.isRequired,
  setClientId: PropTypes.func.isRequired,
};

export default LoginClient;