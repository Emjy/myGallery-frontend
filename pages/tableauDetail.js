import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../components/Header';
import styles from '../styles/TableauDetail.module.css';
import { API_URL } from '../lib/api';

export default function TableauDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [tableau, setTableau] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/tableaux/${id}`)
      .then((r) => r.json())
      .then((data) => { if (data.result) setTableau(data.tableau); });
  }, [id]);

  if (!tableau) {
    return (
      <div className={styles.page}>
        <Header />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.layout}>
        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tableau.imageName}
              alt={tableau.tableauName || 'Tableau'}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.infoCol}>
          <Link href="/tableaux" className={styles.backBtn}>
            ← Retour aux tableaux
          </Link>
          <h1 className={styles.title}>{tableau.tableauName}</h1>
          {tableau.auteur && <p className={styles.auteur}>{tableau.auteur}</p>}
          {tableau.prix !== undefined && tableau.prix !== null && tableau.prix !== '' && (
            <p className={styles.prix}>{tableau.prix} €</p>
          )}
          {tableau.description && (
            <p className={styles.description}>« {tableau.description} »</p>
          )}
        </div>
      </div>
    </div>
  );
}
