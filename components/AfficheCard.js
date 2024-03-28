import React from "react"; 

// Style
import styles from "../styles/AfficheCard.module.css";

export default function AfficheCard(props) {
  return (
    <div className={styles.afficheCard}>
      <img src={props.affiche} className={styles.afficheImage} />
      <div className={styles.textOverlay}>
        <div className={styles.filmName}>{props.name}</div>
        <div className={styles.realName}>{props.real}</div>
      </div>
    </div>
  );
}
