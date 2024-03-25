import React from "react";

// Style
import styles from "../styles/AfficheCard.module.css";

export default function AfficheCard(props) {
  return (
    <div className={styles.afficheCard}>
      <img src={props.affiche} className={styles.afficheImage} />
      <div>{props.name}</div>
      <div>{props.real}</div>
    </div>
  );
}
