import React from 'react'
import dayjs from 'dayjs'

// Style
import styles from "../styles/ExpoCard.module.css";

// MUI components
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

export default function ExpoCard(props) {

    // Formatter les dates
    const format = 'DD/MM/YYYY'; // Format de date désiré

    const startDate = dayjs(props.startDate).format(format);
    const endDate = dayjs(props.endDate).format(format);

    return (
        <div className={styles.expoCard}>
            <img src={props.expoImg} className={styles.expoImage} />


            <div className={styles.bottomCard}>

                <div className={styles.infos}>
                    <div className={styles.adresse}>
                        <LocationOnRoundedIcon />
                        {props.adresse}
                    </div>

                    <div className={styles.dates}>
                        <CalendarMonthRoundedIcon />
                        {`${startDate} - ${endDate}`}
                    </div>
                    <div className={styles.statut}>
                        <AccessTimeFilledRoundedIcon/>
                        {new Date() > new Date(props.endDate) ? 'Terminée' : 'En cours'}
                    </div>
                </div>

            </div>

            <div className={styles.nom}>
                {props.expoName}
                <div className={styles.auteur}>
                    {props.auteur}
                </div>
            </div>

        </div>
    )
}
