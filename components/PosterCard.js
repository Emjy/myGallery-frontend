import React from "react"; 

// Style
import styles from "../styles/PosterCard.module.css";

export default function PosterCard(props) {
  return (
    <div className={styles.posterCard}>
      <img src={props.poster} className={styles.posterImage} />
      <div className={styles.textOverlay}>
        <div className={styles.posterName}>{props.name}</div>
      </div>
    </div>
  );
}
