import React from "react";
import { useRouter } from "next/router";

// Style
import styles from "../styles/TableauDetail.module.css";

// Components
import Header from "../components/Header";

export default function tableauDetail(props) {
  const router = useRouter();

  const { id } = router.query; // `id` est le nom du paramètre dynamique dans l'URL


  return (
    <div>
      <Header />

      <div className={styles.page}>
        <img
          src="tableau7.png"
          className={styles.tableauVisual}
        ></img>

        <div className={styles.desc}>
          <div className={styles.name}> {"Tableau #1"}</div>
          {/* <div className={styles.auteur}> {"François Giraud"}</div> */}
          <div className={styles.prix}> {"1200 €"}</div>
        </div>
      </div>
    </div>
  );
}
