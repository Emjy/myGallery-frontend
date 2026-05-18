import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import Header from '../components/Header';
import styles from '../styles/Upload.module.css';
import UploadAffiche from '../components/UploadAffiche';
import UploadPoster from '../components/UploadPoster';
import UploadTableau from '../components/UploadTableau';
import UploadPhoto from '../components/UploadPhoto';
import UploadExpo from '../components/UploadExpo';

const TYPE_MAP = { affiche: 10, poster: 15, tableau: 20, photo: 30, expo: 40 };
const LABELS = { 10: 'Affiche', 15: 'Poster', 20: 'Tableau', 30: 'Photo', 40: 'Expo' };

export default function Upload() {
  const token = useSelector((state) => state.user.value.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const [file, setFile] = useState('');

  useEffect(() => {
    if (!token) { router.push('/signIn'); return; }
    if (router.isReady && router.query.type) {
      const mapped = TYPE_MAP[router.query.type];
      if (mapped) setFile(mapped);
    }
  }, [token, router.isReady, router.query.type]);

  const handleLogOut = () => {
    dispatch(logout({ token: null, user: null }));
    router.push('/signIn');
  };

  if (!token) return null;

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.toolbar}>
        <select
          className={styles.typeSelect}
          value={file}
          onChange={(e) => setFile(Number(e.target.value))}
        >
          <option value="">— Choisir un type —</option>
          <option value={10}>Affiche</option>
          <option value={15}>Poster</option>
          <option value={20}>Tableau</option>
          <option value={30}>Photo</option>
          <option value={40}>Expo</option>
        </select>

        <button className={styles.logoutBtn} onClick={handleLogOut}>
          Déconnexion
        </button>
      </div>

      {file && (
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Ajouter — {LABELS[file]}</h2>
          {file === 10 && <UploadAffiche />}
          {file === 15 && <UploadPoster />}
          {file === 20 && <UploadTableau />}
          {file === 30 && <UploadPhoto />}
          {file === 40 && <UploadExpo />}
        </div>
      )}
    </div>
  );
}
