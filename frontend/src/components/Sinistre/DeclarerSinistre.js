import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function DeclarerSinistre({ clientId }) {
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/sinistres/declarer',
        { client_id: clientId, description },
        { headers: { Authorization: token } }
      );
      setMessage(res.data.message);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`Erreur: ${err.response.data.message}`);
      } else {
        setMessage('Erreur lors de la déclaration');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Déclarer un sinistre</h2>
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <button type="submit">Déclarer</button>
      {message && <div>{message}</div>}
    </form>
  );
}
DeclarerSinistre.propTypes = {
  clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DeclarerSinistre;