import React, { useState, useEffect } from 'react'

// Style
import styles from "../styles/Expos.module.css";

// Components 
import Header from '../components/Header'
import ExpoCard from '../components/ExpoCard'

export default function expositions() {

  const [exposData, setExposData] = useState([]);

  useEffect(() => {
    fetch(`https://art-papa-backend.vercel.app/expositions/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          let sortedExpos;

          sortedExpos = data.expos.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

          setExposData(sortedExpos);
        }
      });
  }, []);


  return (
    <div>
      <Header />
      {exposData.map((item, index) => (
        <div className={styles.expos} >
          <ExpoCard expoImg={item.imageCouv} expoName={item.expoName} auteur={item.auteur} adresse={item.adresse} startDate={item.startDate} endDate={item.endDate} /> 
        </div>

      ))}

    </div>
  )
}
