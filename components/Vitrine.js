import React, { useState, useEffect } from "react";
import AfficheCard from "./AfficheCard";

// Style
import styles from "../styles/Vitrine.module.css";

export default function vitrine() {
  const [affichesData, setAffichesData] = useState([]);

  // Récupération des affiches
  useEffect(() => {
  fetch(`http://localhost:3000/affiches/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        // Récupéreration des affiches
        setAffichesData(data.affiches);
      }
    });
  }, []);

  const affiches = affichesData.map((item, index) => {
    return (
      <AfficheCard
        affiche={item.imageName}
        name={item.filmName}
        real={item.realName}
      />
    );
  });

  return (
    <>
      <div className={styles.affiches}>
        <div className={styles.title}>{"Affiches de films"}</div>
        <div className={styles.elements}>{affiches}</div>
      </div>

      <div className={styles.affiches}>
        <div className={styles.title}>{"Tableaux"}</div>
        <div className={styles.elements}>{}</div>
      </div>
    </>
  );
}
