import React from "react";

// Style
import styles from "../styles/TableauCard.module.css";

export default function TableauCard(props) {
  return (
    <div className={styles.tableauCard}>
      <img src={props.tableau} className={styles.tableauImage} />
      <div className={styles.textOverlay}>
        <div className={styles.tableauName}>{props.name}</div>
        <div className={styles.auteurName}>{props.auteur}</div>
        <div className={styles.price}>{props.prix} €</div>
      </div>
    </div>
  );
}
