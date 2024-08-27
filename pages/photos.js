import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

// Composants
import Header from "../components/Header";
import PhotoCard from "../components/PhotoCard";

// Style
import styles from "../styles/Photos.module.css";

export default function Photos() {

  const router = useRouter();

  const [photoData, setPhotoData] = useState([]);
  const [fullPage, setFullPage] = useState('');


  // Récupération des photos
  useEffect(() => {
    fetch(`https://françoisgiraud.fr/photos/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Tri des affiches par date de création
          const sortedPhoto = data.photos.sort((a, b) => {
            return new Date(b.creationDate) - new Date(a.creationDate); // Pour un tri décroissant, inversez pour un tri croissant
          });
          // Récupéreration des affiches
          setPhotoData(sortedPhoto);
        }
      });
  }, []);

  const handleCloseFullPage = () => {
    setFullPage(''); // Efface l'URL de l'image, ce qui ferme la surimpression
  };

  const photos = photoData.map((item, index) => {

    return (
      <div className={styles.photoItem} key={index} onClick={(e) => {
        e.stopPropagation(); // Empêche l'événement de clic de se propager
        setFullPage(item.imageName);
      }} >
        <PhotoCard
          photo={item.imageName}
          name={item.photoName}
          auteur={item.auteur}
          prix={item.prix}

        />
      </div>
    );
  });

  return (

    <>
      <div className={styles.page} style={{ filter: fullPage ? 'blur(8px)' : '' }}>
        <Header />

        {photos.length > 0 &&
          <div className={styles.photoContainer} >
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 700: 2, 1050: 3, 1400: 4, 1750: 5 }}
              className={styles.photos}>
              <Masonry gutter="16px">{photos}</Masonry>
            </ResponsiveMasonry>
          </div>}
        {photos.length === 0 &&
          <div style={{ padding: '4rem', color: 'white', opacity: '0.2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {'Pas de photos pour le moment'}
          </div>}
      </div>

      {fullPage && <div className={styles.photoFullPage} onClick={() => handleCloseFullPage()}>
        <img src={fullPage} />
      </div>}
    </>

  );
}
