import Image from 'next/image';
import dayjs from 'dayjs';
import styles from '../styles/ExpoCard.module.css';

export default function ExpoCard({ expoImg, expoName, auteur, adresse, startDate, endDate, onDelete }) {
  const format = 'DD MMM YYYY';
  const start = dayjs(startDate).format(format);
  const end = dayjs(endDate).format(format);
  const isActive = new Date() <= new Date(endDate);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={expoImg}
          alt={expoName || 'Exposition'}
          fill
          className={styles.image}
          loading="lazy"
          sizes="40vw"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.expoName}>{expoName}</div>
        {auteur && <div className={styles.auteur}>{auteur}</div>}
        <div className={styles.meta}>
          {adresse && <span className={styles.metaLine}>{adresse}</span>}
          <span className={styles.metaLine}>{start} — {end}</span>
        </div>
        <span className={`${styles.badge} ${isActive ? styles.badgeActive : styles.badgeDone}`}>
          {isActive ? 'En cours' : 'Terminée'}
        </span>
      </div>

      {onDelete && (
        <button
          className={styles.deleteBtn}
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          aria-label="Supprimer"
        >
          ×
        </button>
      )}
    </div>
  );
}
