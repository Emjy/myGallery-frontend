import Image from 'next/image';
import styles from '../styles/PhotoCard.module.css';

export default function PhotoCard({ photo, name, auteur, prix }) {
  return (
    <div className={styles.photoCard}>
      <Image
        src={photo}
        alt={name || 'Photo'}
        width={800}
        height={600}
        className={styles.photoImage}
        loading="lazy"
        sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, (max-width: 1400px) 33vw, 25vw"
      />
      <div className={styles.textOverlay}>
        <div className={styles.photoName}>{name}</div>
        <div className={styles.auteurName}>{auteur}</div>
        <div className={styles.price}>{prix} €</div>
      </div>
    </div>
  );
}
