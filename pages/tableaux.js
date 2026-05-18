import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import TableauCard from '../components/TableauCard';
import styles from '../styles/Tableaux.module.css';
import { API_URL } from '../lib/api';

export default function Tableaux() {
  const router = useRouter();
  const [tableauData, setTableauData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/tableaux/`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.result) return;
        setTableauData(
          [...data.tableaux].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
        );
      });
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.tableaux}>
        {tableauData.map((item) => (
          <div
            className={styles.tableauItem}
            key={item._id}
            onClick={() => router.push(`/tableauDetail?id=${item._id}`)}
          >
            <TableauCard
              tableau={item.imageName}
              name={item.tableauName}
              auteur={item.auteur}
              prix={item.prix}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
