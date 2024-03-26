import React, { useState, useEffect, useRef } from "react";

// Composants
import Header from "../components/Header";
import TableauCard from "../components/TableauCard";

// Style
import styles from "../styles/Tableaux.module.css";

export default function Tableaux() {
  const [tableauData, setTableauData] = useState([]);

  // Récupération des affiches
  useEffect(() => {
    fetch(`http://localhost:3000/tableaux/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Tri des affiches par date de création
          const sortedTableau = data.tableaux.sort((a, b) => {
            return new Date(b.creationDate) - new Date(a.creationDate); // Pour un tri décroissant, inversez pour un tri croissant
          });
          // Récupéreration des affiches
          setTableauData(sortedTableau);
        }
      });
  }, []);

  const tableaux = tableauData.map((item, index) => {
    return (
      <div className={styles.tableauItem}>
        <TableauCard
          tableau={item.imageName}
          name={item.tableauName}
          auteur={item.auteur}
          prix={item.prix}
        />
      </div>
    );
  });

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.tableaux}>
        {tableaux}
        </div>
    </div>
  );
}