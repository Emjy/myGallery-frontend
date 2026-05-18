import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ExpoCard from '../components/ExpoCard';
import styles from '../styles/Expos.module.css';
import { API_URL } from '../lib/api';

export default function Expositions() {
  const [exposData, setExposData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/expositions/`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.result) return;
        setExposData(
          [...data.expos].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
        );
      });
  }, []);

  return (
    <div>
      <Header />
      {exposData.length > 0 ? (
        exposData.map((item) => (
          <div className={styles.expos} key={item._id}>
            <ExpoCard
              expoImg={item.imageCouv}
              expoName={item.expoName}
              auteur={item.auteur}
              adresse={item.adresse}
              startDate={item.startDate}
              endDate={item.endDate}
            />
          </div>
        ))
      ) : (
        <div style={{ padding: '4rem', color: 'white', opacity: 0.2, display: 'flex', justifyContent: 'center' }}>
          Pas d&apos;expositions pour le moment
        </div>
      )}
    </div>
  );
}
