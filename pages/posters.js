import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PosterCard from '../components/PosterCard';
import styles from '../styles/Posters.module.css';
import { API_URL } from '../lib/api';

export default function Posters() {
  const [postersData, setPostersData] = useState([]);
  const [fullPage, setFullPage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/posters/`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.result) return;
        setPostersData(
          [...data.posters].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
        );
      });
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.posters}>
        {postersData.map((item) => (
          <div
            className={styles.posterItem}
            key={item._id}
            onClick={(e) => { e.stopPropagation(); setFullPage(item.imageName); }}
          >
            <PosterCard poster={item.imageName} name={item.posterName} />
          </div>
        ))}
      </div>

      {fullPage && (
        <div className={styles.photoFullPage} onClick={() => setFullPage('')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fullPage} alt="Poster plein écran" />
        </div>
      )}
    </div>
  );
}
