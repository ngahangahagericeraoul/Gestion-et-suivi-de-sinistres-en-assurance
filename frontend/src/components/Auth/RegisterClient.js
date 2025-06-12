import React, { useState } from 'react';
import axios from 'axios';

function RegisterClient() {
  const [form, setForm] = useState({ nom: '', email: '', numero_police: '', mot_de_passe: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('Compte créé ! Vous pouvez vous connecter.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Erreur lors de la création');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un compte client</h2>
      <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="numero_police" placeholder="Numéro de police" value={form.numero_police} onChange={handleChange} required />
      <input name="mot_de_passe" type="password" placeholder="Mot de passe" value={form.mot_de_passe} onChange={handleChange} required />
      <button type="submit">Créer mon compte</button>
      {message && <div>{message}</div>}
    </form>
  );
}

export default RegisterClient;