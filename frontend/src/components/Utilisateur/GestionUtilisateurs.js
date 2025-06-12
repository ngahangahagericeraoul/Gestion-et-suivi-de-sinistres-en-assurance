import React, { useState } from 'react';
import axios from 'axios';

function GestionUtilisateurs() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [role, setRole] = useState('expert');
  const [message, setMessage] = useState('');
  const [userIdToDelete, setUserIdToDelete] = useState('');

  const token = localStorage.getItem('token');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/utilisateurs/creer',
        { nom, email, mot_de_passe: motDePasse, role },
        { headers: { Authorization: token } }
      );
      setMessage('Utilisateur créé avec succès');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`Erreur lors de la création: ${err.response.data.message}`);
      } else {
        setMessage(`Erreur lors de la création: ${err.message}`);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/api/utilisateurs/supprimer/${userIdToDelete}`,
        { headers: { Authorization: token } }
      );
      setMessage('Utilisateur supprimé avec succès');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`Erreur lors de la suppression: ${err.response.data.message}`);
      } else {
        setMessage(`Erreur lors de la suppression: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Créer un utilisateur</h2>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="expert">Expert</option>
          <option value="reparateur">Réparateur</option>
          <option value="client">Client</option>
        </select>
        <button type="submit">Créer</button>
      </form>

      <h2>Supprimer un utilisateur</h2>
      <form onSubmit={handleDelete}>
        <input type="number" placeholder="ID utilisateur à supprimer" value={userIdToDelete} onChange={e => setUserIdToDelete(e.target.value)} required />
        <button type="submit">Supprimer</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default GestionUtilisateurs;