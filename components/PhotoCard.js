import React from "react";

// Style
import styles from "../styles/PhotoCard.module.css";

export default function PhotoCard(props) {
  return (
    <div className={styles.photoCard}>
      <img src={props.photo} className={styles.photoImage} />
      <div className={styles.textOverlay}>
        <div className={styles.photoName}>{props.name}</div>
        <div className={styles.auteurName}>{props.auteur}</div>
        {/* <div className={styles.price}>{props.prix} €</div> */}
      </div>
    </div>
  );
}
