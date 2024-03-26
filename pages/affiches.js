import React, { useState, useEffect, useRef } from "react";

// Composants
import AfficheCard from "../components/AfficheCard";
import Header from "../components/Header";

// Style
import styles from "../styles/Affiches.module.css";

export default function Affiches() {
  const [affichesData, setAffichesData] = useState([]);

  // Récupération des affiches
  useEffect(() => {
    fetch(`http://localhost:3000/affiches/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Tri des affiches par date de création
          const sortedAffiches = data.affiches.sort((a, b) => {
            return new Date(b.creationDate) - new Date(a.creationDate); // Pour un tri décroissant, inversez pour un tri croissant
          });
          // Récupéreration des affiches
          setAffichesData(sortedAffiches);
        }
      });
  }, []);

  const affiches = affichesData.map((item, index) => {
    return (
      <div className={styles.afficheItem} key={index}>
        <AfficheCard
          affiche={item.imageName}
          name={item.filmName}
          real={item.realName}
        />
      </div>
    );
  });

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.affiches}>{affiches}</div>
    </div>
  );
}
