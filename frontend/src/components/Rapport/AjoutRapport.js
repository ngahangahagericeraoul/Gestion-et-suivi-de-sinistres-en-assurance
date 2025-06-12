import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function AjoutRapport({ type }) {
  const [sinistreId, setSinistreId] = useState('');
  const [rapport, setRapport] = useState('');
  const [message, setMessage] = useState('');
  const [gestionnaireEmail, setGestionnaireEmail] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = type === 'expertise'
        ? 'http://localhost:5000/api/rapports/expertise'
        : 'http://localhost:5000/api/rapports/reparation';
      const data = {
        sinistre_id: sinistreId,
        rapport,
        gestionnaire_email: gestionnaireEmail
      };
      if (type === 'expertise') data.expert_id = 3; // à adapter selon l'utilisateur connecté
      if (type === 'reparation') data.reparateur_id = 4; // à adapter selon l'utilisateur connecté

      await axios.post(url, data, { headers: { Authorization: token } });
      setMessage('Rapport ajouté avec succès');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`Erreur lors de l'ajout du rapport: ${err.response.data.message}`);
      } else {
        setMessage(`Erreur lors de l'ajout du rapport: ${err.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un rapport de {type}</h2>
      <input type="number" placeholder="ID du sinistre" value={sinistreId} onChange={e => setSinistreId(e.target.value)} required />
      <textarea placeholder="Rapport" value={rapport} onChange={e => setRapport(e.target.value)} required />
      <input type="email" placeholder="Email du gestionnaire" value={gestionnaireEmail} onChange={e => setGestionnaireEmail(e.target.value)} required />
      <button type="submit">Ajouter</button>
      {message && <div>{message}</div>}
    </form>
  );
}
AjoutRapport.propTypes = {
  type: PropTypes.string.isRequired
};

export default AjoutRapport;