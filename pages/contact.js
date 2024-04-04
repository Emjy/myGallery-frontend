import React from "react";

// Style
import styles from "../styles/Contact.module.css";

// Components
import Header from "../components/Header";

// mui components
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

export default function contact() {
  return (
    <div>
      <Header />

      <div className={styles.page}>

        <div className={styles.logoContainer}>
          <img src="logo.png" className={styles.logo}></img>
        </div>
        
        <div className={styles.contacts}>
          {/* <div className={styles.contactItem}>
            <PhoneIphoneRoundedIcon className={styles.icon} />
            {"00"}
          </div> */}
          <div className={styles.contactItem}>
            <AlternateEmailRoundedIcon className={styles.icon} />
            {"giraudliard@gmail.com"}
          </div>
        </div>
      </div>
      
    </div>
  );
}
