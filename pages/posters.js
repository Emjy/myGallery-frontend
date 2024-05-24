import React, { useState, useEffect } from "react";

// Composants
import Header from "../components/Header";
import PosterCard from "../components/PosterCard";

// Style
import styles from "../styles/Posters.module.css";


export default function posters() {

    const [postersData, setPostersData] = useState([]);
    const [fullPage, setFullPage] = useState('');


    const handleCloseFullPage = () => {
        setFullPage('');
    };

    useEffect(() => {
        fetch(`https://art-papa-backend.vercel.app/posters/`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    let sortedPosters;
                    sortedPosters = data.posters.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                    setPostersData(sortedPosters);
                }
            });
    }, []); // Inclure sortMethod dans le tableau de dépendances

    console.log(postersData)

    return (
        <div className={styles.page}>
            <Header />


            <div className={styles.posters}>
                {postersData.map((item, index) => (
                    <div className={styles.posterItem} key={index} onClick={(e) => {
                        e.stopPropagation();
                        setFullPage(item.imageName);
                    }} >
                        <PosterCard
                            poster={item.imageName}
                            name={item.posterName}
                        />
                    </div>
                ))}
            </div>

            {fullPage && <div className={styles.photoFullPage} onClick={() => handleCloseFullPage()}>
                <img src={fullPage} />
            </div>}


        </div>
    )
}
