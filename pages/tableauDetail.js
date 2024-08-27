import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Style
import styles from "../styles/TableauDetail.module.css";

// Components
import Header from "../components/Header";

export default function tableauDetail() {

  const router = useRouter();
  const { id } = router.query; // Extraction de l'ID

  const [tableau, setTableau] = useState({});


  // Récupération des tableaux
  useEffect(() => {
    fetch(`https://art-papa-backend.vercel.app/tableaux/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Récupéreration d'un tableau
          setTableau(data.tableau);
        }
      });
  }, [id]);

  return (
    <div>
      <Header />

      <div className={styles.page}>

        <div className={styles.tableau}>
          <img
            src={tableau.imageName}
            className={styles.tableauVisual}
          />
        </div>
        
        <div className={styles.desc}>
          <div className={styles.name}> {tableau.tableauName}</div>
          <div className={styles.auteur}> {tableau.auteur}</div>
          <div className={styles.prix}> {tableau.prix + ' €'}</div>
          <div className={styles.description}> {'«' + tableau.description + '»' }</div>

        </div>
      </div>
    </div>
  );
}
