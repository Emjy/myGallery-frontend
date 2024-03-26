
import React, { useState } from "react";
import { useRouter } from "next/router";

// Style
import styles from "../styles/Header.module.css";

export default function MenuItem(props) {
  const router = useRouter();
  const path = router.pathname;

  const handleNavigation = (path) => {
    // Navigation et mise à jour de l'état se font ici
    router.push(`/${path}`);
  };

  return (
    <div
      className={styles.menuItem}
      onClick={() => handleNavigation(props.nom)}
      style={{
        fontWeight: path.slice(1) === props.nom ? "bold" : "normal",
        opacity: path.slice(1) === props.nom ? "1" : "0.5",
      }}
    >
      {props.nom.toUpperCase()}
    </div>
  );
}