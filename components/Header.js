import React, { useState } from "react";
import { useRouter } from "next/router";

// Style
import styles from "../styles/Header.module.css";

// Components 
import MenuItem from "./MenuItem";
  
export default function Header() {

  const router = useRouter();
  const path = router.pathname.slice(1);

  const handleNavigation = (path) => {
     router.push(`/${path}`);
  };


  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerItem} onClick={() => handleNavigation("affiches")}>
          <img src="logo.png" className={styles.logo} alt="Logo"></img>
        </div>
        <div className={styles.headerLinks}>
          <div className={styles.headerItem} onClick={() => handleNavigation("about")}>À PROPOS</div>
          <div className={styles.headerItem} onClick={() => handleNavigation("contact")}>CONTACT</div>
        </div>
      </div>


      {path !== "about"  && path !== "contact" && <div className={styles.menu}>
        <MenuItem nom={"affiches"} />
        |
        <MenuItem nom={"tableaux"} />
        |
        <MenuItem nom={"photos"} />
        |
        <MenuItem nom={"expositions"} />
      </div>}

    </>
  );
}
