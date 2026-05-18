import Image from 'next/image';
import dayjs from 'dayjs';
import styles from '../styles/ExpoCard.module.css';

import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

export default function ExpoCard({ expoImg, expoName, auteur, adresse, startDate, endDate }) {
  const format = 'DD/MM/YYYY';
  const start = dayjs(startDate).format(format);
  const end = dayjs(endDate).format(format);

  return (
    <div className={styles.expoCard}>
      <Image
        src={expoImg}
        alt={expoName || 'Exposition'}
        width={800}
        height={500}
        className={styles.expoImage}
        loading="lazy"
      />

      <div className={styles.bottomCard}>
        <div className={styles.infos}>
          <div className={styles.adresse}>
            <LocationOnRoundedIcon />
            {adresse}
          </div>
          <div className={styles.dates}>
            <CalendarMonthRoundedIcon />
            {`${start} - ${end}`}
          </div>
          <div className={styles.statut}>
            <AccessTimeFilledRoundedIcon />
            {new Date() > new Date(endDate) ? 'Terminée' : 'En cours'}
          </div>
        </div>
      </div>

      <div className={styles.nom}>
        {expoName}
        <div className={styles.auteur}>{auteur}</div>
      </div>
    </div>
  );
}
