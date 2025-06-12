import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ListeNotifications({ utilisateurId }) {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notifications/${utilisateurId}`,
          { headers: { Authorization: token } }
        );
        setNotifications(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des notifications:', err);
        setNotifications([]);
      }
    };
    fetchNotifications();
  }, [utilisateurId, token]);

  return (
    <div>
      <h2>Mes notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n.id}>
            {n.message} <span style={{color: n.lu ? 'green' : 'red'}}>{n.lu ? ' (lu)' : ' (non lu)'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
ListeNotifications.propTypes = {
  utilisateurId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
};

export default ListeNotifications;