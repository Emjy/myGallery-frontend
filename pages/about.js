import React from "react";

//Styles
import styles from "../styles/About.module.css";

// Components
import Header from "../components/Header";

export default function about() {

  const year = new Date().getFullYear() ;

  return (
    <div>
      <Header />

      <div className={styles.page}>
        <div className={styles.logoContainer}>
          <img src="logo.png" className={styles.logo}></img>
        </div>

        <div className={styles.desc}>
        <div className={styles.title}>
         { 'François Giraud'}
        
        </div>
        {year}

        <div className={styles.text}>
        © François Giraud détient tous les droits d'auteur sur ses œuvres, y compris les droits sur l'image. Toutes les images de ses œuvres sont protégées par la loi sur le droit d'auteur et sont la propriété exclusive de François Giraud. Aucune reproduction, diffusion, modification ou utilisation commerciale des images de ses œuvres n'est autorisée sans l'autorisation préalable et écrite de François Giraud. Toute violation des droits d'auteur de François Giraud sera poursuivie conformément à la loi en vigueur. Il est strictement interdit de copier, télécharger, distribuer ou utiliser les images de ses œuvres sans une autorisation expresse.
        </div>


        </div>



      </div>
    </div>
  );
}
