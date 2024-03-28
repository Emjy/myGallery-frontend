import React, { useState, useEffect, useRef } from "react";

// Composants
import AfficheCard from "../components/AfficheCard";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar"; //modifs lien 
import MenuItem from "../components/MenuItem";

// Style
import styles from "../styles/Affiches.module.css";

export default function Affiches() {

  const [affichesData, setAffichesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };


  // Récupération des affiches
  useEffect(() => {
    fetch(`https://art-papa-backend.vercel.app/affiches/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Tri des affiches par date de création
          const sortedAffiches = data.affiches.sort((a, b) => {
            return new Date(b.creationDate) - new Date(a.creationDate); // Pour un tri décroissant, inversez pour un tri croissant
          });
          // Récupéreration des affiches
          setAffichesData(sortedAffiches);
        }
      });
  }, []);

  const filteredAffiches = affichesData.filter((item) => {
    return item.filmName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const affiches = filteredAffiches.map((item, index) => (
    <div className={styles.afficheItem} key={index}>
      <AfficheCard
        affiche={item.imageName}
        name={item.filmName}
        real={item.realName}
      />
    </div>
  ));

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.searchContainer}>
        <SearchBar onSearchChange={handleSearchChange} values={affichesData} label={'Rechercher une affiche'} search={'filmName'} />
      </div>

      <div className={styles.affiches}>{affiches}</div>
    </div>
  );
}
