import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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

  if (!tableau) return <div><Header /></div>;

  return (
    <div>
      <Header />
      <div className={styles.page}>
        <div className={styles.tableau}>
          <Image
            src={tableau.imageName}
            alt={tableau.tableauName || 'Tableau'}
            width={800}
            height={1000}
            className={styles.tableauVisual}
            priority
          />
        </div>
        <div className={styles.desc}>
          <div className={styles.name}>{tableau.tableauName}</div>
          <div className={styles.auteur}>{tableau.auteur}</div>
          <div className={styles.prix}>{tableau.prix} €</div>
          <div className={styles.description}>{'«' + tableau.description + '»'}</div>
        </div>
      </div>
    </div>
  );
}
