import Image from 'next/image';
import styles from '../styles/PosterCard.module.css';

export default function PosterCard({ poster, name }) {
  return (
    <div className={styles.posterCard}>
      <Image
        src={poster}
        alt={name || 'Poster'}
        width={600}
        height={900}
        className={styles.posterImage}
        loading="lazy"
      />
      <div className={styles.textOverlay}>
        <div className={styles.posterName}>{name}</div>
      </div>
    </div>
  );
}
