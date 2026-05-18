import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';

const ResponsiveMasonry = dynamic(() => import('react-responsive-masonry').then(m => m.ResponsiveMasonry), { ssr: false });
const Masonry = dynamic(() => import('react-responsive-masonry').then(m => m.default), { ssr: false });
import PhotoCard from '../components/PhotoCard';
import styles from '../styles/Photos.module.css';
import { API_URL } from '../lib/api';

export default function Photos() {
  const [photoData, setPhotoData] = useState([]);
  const [fullPage, setFullPage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/photos/`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.result) return;
        setPhotoData(
          [...data.photos].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
        );
      });
  }, []);

  return (
    <>
      <div className={styles.page} style={{ filter: fullPage ? 'blur(8px)' : '' }}>
        <Header />
        {photoData.length > 0 ? (
          <div className={styles.photoContainer}>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 700: 2, 1050: 3, 1400: 4, 1750: 5 }}
              className={styles.photos}
            >
              <Masonry gutter="16px">
                {photoData.map((item) => (
                  <div
                    className={styles.photoItem}
                    key={item._id}
                    onClick={(e) => { e.stopPropagation(); setFullPage(item.imageName); }}
                  >
                    <PhotoCard
                      photo={item.imageName}
                      name={item.photoName}
                      auteur={item.auteur}
                      prix={item.prix}
                    />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        ) : (
          <div style={{ padding: '4rem', color: 'white', opacity: 0.2, display: 'flex', justifyContent: 'center' }}>
            Pas de photos pour le moment
          </div>
        )}
      </div>

      {fullPage && (
        <div className={styles.photoFullPage} onClick={() => setFullPage('')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fullPage} alt="Photo plein écran" />
        </div>
      )}
    </>
  );
}
