import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import styles from '../styles/SignIn.module.css';
import { API_URL } from '../lib/api';

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleConnection = () => {
    fetch(`${API_URL}/users/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, user: data.user }));
          setUser('');
          setPassword('');
          router.push('/upload');
        }
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConnection();
  };

  return (
    <div className={styles.page}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Utilisateur"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="username"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="current-password"
        />
        <button className={styles.btn} onClick={handleConnection}>
          Connexion
        </button>
      </div>
    </div>
  );
}
