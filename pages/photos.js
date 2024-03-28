import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";


// Composants
import Header from "../components/Header";
import PhotoCard from "../components/PhotoCard";

// Style
import styles from "../styles/Photos.module.css";

export default function Photos() {

  const router = useRouter();

  const [photoData, setPhotoData] = useState([]);

  // Récupération des photos
  useEffect(() => {
    fetch(`https://art-papa-backend.vercel.app/photos/`)
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

  const photos = photoData.map((item, index) => {

    return (
      <div className={styles.photoItem} key={index} >
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
    <div className={styles.page}>
      <Header />

      <div className={styles.photos}>
        {photos}
        </div>
    </div>
  );
}
