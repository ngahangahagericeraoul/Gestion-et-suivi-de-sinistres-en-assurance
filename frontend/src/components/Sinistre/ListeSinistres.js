import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ListeSinistres({ clientId }) {
  const [sinistres, setSinistres] = useState([]);

  useEffect(() => {
    const fetchSinistres = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:5000/api/sinistres/client/${clientId}`,
        { headers: { Authorization: token } }
      );
      setSinistres(res.data);
    };
    fetchSinistres();
  }, [clientId]);

  return (
    <div>
      <h2>Mes sinistres</h2>
      <ul>
        {sinistres.map(s => (
          <li key={s.id}>
            <b>{s.description}</b> - Statut : {s.statut} <br />
            Evolution : {s.evolution}
          </li>
        ))}
      </ul>
    </div>
  );
}
ListeSinistres.propTypes = {
  clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ListeSinistres;